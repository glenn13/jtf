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
    files: ["**/*.ts", "**/*.tsx"], // Apply these rules to TypeScript files
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "react/prop-types": "off",
      "no-console": "off",
      "@typescript-eslint/no-unused-vars": "off",
      // Add other rules you want to disable here
    },
  },
//   {
//     files: ["src/**/*.ts", "src/**/*.tsx"], // Apply these rules to specific directories or patterns
//     rules: {
//       "@typescript-eslint/no-unused-vars": "off",
//     },
//   },
];

export default eslintConfig;