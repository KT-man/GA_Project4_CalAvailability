const withTM = require("next-transpile-modules")([
  "@fullcalendar/common",
  "@fullcalendar/daygrid",
  "@fullcalendar/interaction",
  "@fullcalendar/react",
  "@fullcalendar/timegrid",
]);

module.exports = withTM({
  reactStrictMode: true,
});

// module.exports = {
//   async rewrites() {
//     return [
//       {
//         source: "/events/:slug",
//         destination: "http://localhost:5001/events/:slug",
//       },
//       {
//         source: "/calendars/:slug",
//         destination: "http://localhost:5001/calendars/:slug",
//       },
//     ];
//   },
// };
