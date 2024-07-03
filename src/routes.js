module.exports = [
  {
    method: "GET",
    url: "/",
    handler: (req, reply) => {
      return reply.sendFile("index.html");
    },
  },
  // 추가 라우트를 여기에 정의할 수 있습니다.
];
