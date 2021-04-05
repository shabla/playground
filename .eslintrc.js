module.exports = {
    parser: "@typescript-eslint/parser",
    extends: ["plugin:@typescript-eslint/recommended", "plugin:react/recommended"],
    plugins: ["@typescript-eslint"],
    rules: {
        indent: ["warn", 4],
        quotes: ["warn", "double"],
        semi: ["warn", "always"],
        "@typescript-eslint/no-empty-interface": ["warn"],
        "react/prop-types": ["off"]
    },
};
