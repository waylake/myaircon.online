const { RateLimiterMemory } = require("rate-limiter-flexible");
const config = require("./config");

const rateLimiter = new RateLimiterMemory({
  points: 15, // 초당 x회 limit
  duration: 1,
});

let temp = config.TEMP_MIN;

module.exports = (app, socket) => {
  socket.emit("init", temp);

  socket.on("disconnect", () => {});

  socket.on("plus", async (arg) => {
    try {
      await rateLimiter.consume(
        socket.handshake.headers["x-real-ip"] || socket.handshake.address,
      );
      if (temp < config.TEMP_MAX) {
        temp++;
      }
      app.io.emit("tempChange", {
        temp: temp,
        username: arg.substring(0, 9),
      });
    } catch (err) {
      socket.emit("blocked", "너무 잦은 요청");
    }
  });

  socket.on("minus", async (arg) => {
    try {
      await rateLimiter.consume(
        socket.handshake.headers["x-real-ip"] || socket.handshake.address,
      );
      if (temp > config.TEMP_MIN) {
        temp--;
      }
      app.io.emit("tempChange", {
        temp: temp,
        username: arg.substring(0, 9),
      });
    } catch (err) {
      socket.emit("blocked", "너무 잦은 요청");
    }
  });
};
