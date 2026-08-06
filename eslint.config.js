import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-config-prettier";

export default [
    js.configs.recommended,

    {
        files: ["**/*.js"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.browser,
            },
        },

        rules: {
            // Possible bugs
            "no-unused-vars": ["warn", {
                argsIgnorePattern: "^_",
                varsIgnorePattern: "^_",
            }],
            "no-console": "off",
            "no-debugger": "warn",

            // Style
            "prefer-const": "error",
            "no-var": "error",
            "object-shorthand": "error",

            // Imports
            "import/order": ["warn", {
                alphabetize: {
                    order: "asc",
                    caseInsensitive: true,
                },
                "newlines-between": "always",
            }],
        },
    },

    prettier,
];