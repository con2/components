import { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@con2/components"],
  sassOptions: {
    silenceDeprecations: [
      "import",
      "if-function",
      "legacy-js-api",
      "global-builtin",
      "color-functions",
    ],
  },
};

export default nextConfig;
