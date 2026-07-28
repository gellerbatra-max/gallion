import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  rewrites() {
    return [
      // The CMS is a static page in public/admin. Next serves public files at
      // their exact path, so /admin on its own would 404 — map it to the file.
      { source: "/admin", destination: "/admin/index.html" },
    ];
  },
  redirects() {
    return [
      // The June rebuild retired these routes in favour of sections embedded
      // in About and Philosophy. Not permanent yet — the information
      // architecture is young enough that it could move again.
      { source: "/ventures", destination: "/philosophy", permanent: false },
      { source: "/portfolio", destination: "/about#directions", permanent: false },
      { source: "/insights", destination: "/", permanent: false },
      { source: "/insights/:slug", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
