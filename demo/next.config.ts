import path from "path";
import { NextConfig } from "next";

// Set to "/components" in CI when deploying to https://con2.github.io/components -
// left empty for local dev/build, where the app is served from "/".
const basePath = process.env.NEXT_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  transpilePackages: ["@con2/components"],
  // `@con2/components` is a `file:..` dependency: its own dependencies
  // (motion, @js-temporal/polyfill, @uiw/react-md-editor, etc.) live in
  // the parent directory's node_modules, not duplicated into this one.
  // Turbopack already infers this correctly (it picks the parent
  // directory as the root because of the two lockfiles), but wants it
  // pinned explicitly rather than inferred.
  turbopack: {
    root: path.resolve(process.cwd(), ".."),
  },
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
