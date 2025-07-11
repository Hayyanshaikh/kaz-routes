import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@next/next/no-img-element": "off",
      "react/jsx-key": "off",
      "react/react-in-jsx-scope": "off",
      // // sab kuch disable karne ke liye:
      "no-unused-vars": "off",
      "no-console": "off",
      "no-empty": "off",
    },
  },
];

export default eslintConfig;
