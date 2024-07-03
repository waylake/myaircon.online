const fastify = require("fastify");
const path = require("path");
const config = require("./config");
const socketHandlers = require("./socketHandlers");
const routes = require("./routes");

const app = fastify();

const setupApp = async () => {
  app.register(require("fastify-socket.io"), {});
  app.register(require("@fastify/static"), {
    root: path.join(__dirname, "..", "public"),
  });
};

const setupRoutes = () => {
  routes.forEach((route) => app.route(route));
};

const setupSocketHandlers = () => {
  app.ready((err) => {
    if (err) throw err;
    console.log(`Server running at http://localhost:${config.PORT}`);
    app.io.on("connect", (socket) => socketHandlers(app, socket));
  });
};

const startServer = async () => {
  try {
    await setupApp();
    setupRoutes();
    setupSocketHandlers();
    await app.listen({ port: config.PORT, host: "0.0.0.0" });
  } catch (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
};

startServer();

module.exports = app;
