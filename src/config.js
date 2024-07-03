module.exports = {
  PORT: process.env.PORT || 8080,
  RATE_LIMIT: {
    points: 20,
    duration: 1,
  },
  TEMP_MIN: 18,
  TEMP_MAX: 30,
};
