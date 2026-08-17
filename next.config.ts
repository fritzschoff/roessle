import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // „Über uns“ ist als eigene Seite entfallen — der Text steht auf der Startseite.
      { source: "/ueber-uns", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
