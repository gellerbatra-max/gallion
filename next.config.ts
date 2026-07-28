import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  rewrites() {
    return [
      // The CMS is a static page in public/admin. Next serves public files at
      // their exact path, so /admin on its own would 404 — map it to the file.
      { source: "/admin", destination: "/admin/index.html" },
    ];
  },
};

export default nextConfig;
