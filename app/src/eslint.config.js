
import { defineConfig } from "eslint/config";

export default defineConfig([
    {
        "settings": {
            "react": {
            "version": "detect"
            }
        },
        env: {
            browser: true,
            es2022: true,
            node: true,
            },
        parserOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
        },
        plugins: ['import', 'node', 'promise'],
        extends: [
            'eslint:recommended',
            'plugin:import/recommended',
            'plugin:node/recommended',
            'plugin:promise/recommended'
        ],
        rules: {
          // Estilo do StandardJS
            'semi': ['error', 'never'],
            'quotes': ['error', 'single'],
            'comma-dangle': ['error', 'never'],
            'space-before-function-paren': ['error', 'always'],
            'no-multiple-empty-lines': ['error', { max: 1 }],
            'no-console': 'off',
            'object-curly-spacing': ['error', 'always'],
            'arrow-spacing': ['error', { before: true, after: true }],
            'indent': ['error', 2],
            'no-var': 'error',
            'prefer-const': 'error'
        }
    }
])
