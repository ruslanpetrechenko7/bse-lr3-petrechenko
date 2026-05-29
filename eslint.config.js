import js from "@eslint/js";
export default [
  js.configs.recommended,
  { languageOptions: { globals: { module: "writable", require: "readonly", process: "readonly" } } }
];
