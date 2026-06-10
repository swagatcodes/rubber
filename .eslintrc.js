module.exports = {
  extends: ["next/core-web-vitals"],
  rules: {
    "react-hooks/exhaustive-deps": "warn",
    "react-hooks/rules-of-hooks": "error",
    "no-unused-vars": "off",
    "@next/next/no-img-element": "off",
  },
};
