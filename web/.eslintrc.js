module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 12,
    sourceType: "module",
    project: "./tsconfig.json"
  },
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "eslint:recommended",
    "airbnb",
    "airbnb-typescript",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime"
  ],
  plugins: ["react", "@typescript-eslint"],
  rules: {
    indent: ["warn", 2],
    quotes: ["warn", "double"],
    semi: ["warn", "always"],
    "@typescript-eslint/no-empty-interface": ["warn"],
    "react/prop-types": "off",
    "@typescript-eslint/camelcase": "off",
    "react/jsx-one-expression-per-line": "off",
    "react/require-default-props": "off",
    "react/no-array-index-key": "off",
    "consistent-return": "off",
    "jsx-a11y/label-has-associated-control": "off",
    "no-shadow": "off",
    "no-param-reassign": "off",
    "import/prefer-default-export": "off",
    "react/jsx-props-no-spreading": "off",
    "max-len": "off",
    "jsx-a11y/label-has-for": "off",
    "no-use-before-define": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "arrow-body-style": "off",
    "linebreak-style": "off", // ... fix this later
    "react/button-has-type": "off",
    "react/jsx-curly-spacing": ["warn", {
      when: "never",
      children: { when: "never" }
    }],
    "no-multiple-empty-lines": ["warn", { max: 1, maxEOF: 0 }],
    "react/jsx-filename-extension": ["warn", { "extensions": [".ts", ".tsx"] }],
    "react/jsx-indent": ["warn", 2],
    "@typescript-eslint/no-use-before-define": "error",
    "react/jsx-filename-extension": ["warn", { extensions: [".tsx"] }],
    "import/extensions": ["error", "ignorePackages", {
      ts: "never",
      tsx: "never"
    }],
  },
};
