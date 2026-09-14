const eslint = require("@eslint/js");
const globals = require("globals");
const tseslint = require("typescript-eslint");

module.exports = tseslint.config(
    {
        ignores: ["dist/**", "node_modules/**", "coverage/**"]
    },
    {
        files: ["**/*.js"],
        ...eslint.configs.recommended,
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: "commonjs",
            globals: globals.node
        },
        rules: {
            "no-console": "off"
        }
    },
    {
        files: ["src/**/*.ts", "test/**/*.ts"],
        extends: tseslint.configs.recommendedTypeChecked,
        languageOptions: {
            ecmaVersion: 2021,
            parserOptions: {
                projectService: true,
                tsconfigRootDir: __dirname
            },
            globals: globals.es2021
        },
        rules: {
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-namespace": "off",
            "no-console": "off"
        }
    },
    {
        files: ["src/**/*.ts"],
        languageOptions: {
            globals: {
                Game: "readonly",
                Memory: "readonly",
                _: "readonly"
            }
        }
    },
    {
        files: ["test/**/*.ts"],
        rules: {
            "@typescript-eslint/only-throw-error": "off"
        }
    },
    {
        files: ["**/*.d.ts"],
        rules: {
            "@typescript-eslint/no-empty-object-type": "off"
        }
    }
);
