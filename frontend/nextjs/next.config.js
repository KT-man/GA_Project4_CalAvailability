//rewrites not working? Can only have 1 module exports unless find where withTM is imported

const rewrites = {
  async rewrites() {
    return [
      {
        source: "/events/:slug",
        destination: "http://localhost:5001/events/:slug",
      },
      {
        source: "/calendars/:slug",
        destination: "http://localhost:5001/calendars/:slug",
      },
    ];
  },
};

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
