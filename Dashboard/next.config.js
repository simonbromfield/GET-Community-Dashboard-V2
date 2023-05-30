module.exports = {
  reactStrictMode: true,
  redirects() {
    return [
      process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "1"
        ? { source: "/((?!maintenance).*)", destination: "/maintenance.html", permanent: false }
        : null,
    ].filter(Boolean);
  }
};
