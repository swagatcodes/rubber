import type { Config } from "eslint";

const config: Config = {
  extends: ["next/core-web-vitals"],
  rules: {
    "react-hooks/exhaustive-deps": "warn",
    "@next/next/no-img-element": "off",
  },
};

export default config;
