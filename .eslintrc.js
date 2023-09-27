module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
    'standard'
  ],
  overrides: [
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser'
  },
  plugins: [
    'vue',
    '@typescript-eslint'
  ],
  rules: {
    // 去掉函数()前面的空格
    'space-before-function-paren': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 关闭禁用ts中使用any类型的告警提示
    '@typescript-eslint/no-explicit-any': ['off'],
    // 关闭驼峰命名规则
    'vue/multi-word-component-names': 0,
    // 'vue/max-attributes-per-line': [
    //   2,
    //   {
    //     singleline: 10,
    //     multiline: {
    //       max: 1,
    //       allowFirstLine: false
    //     }
    //   }
    // ],
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 10
      },
      multiline: {
        max: 1
      }
    }],
    'vue/require-default-prop': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/no-v-html': 'off',
    'vue/attributes-order': 1,
    'prefer-promise-reject-errors': 'off',
    'accessor-pairs': 2,
    'arrow-spacing': [2, {
      before: true,
      after: true
    }],
    'block-spacing': [2, 'always'],
    'brace-style': [2, '1tbs', {
      allowSingleLine: true
    }],
    camelcase: [0, {
      properties: 'always'
    }],
    'comma-dangle': [2, 'never'],
    'comma-spacing': [2, {
      before: false,
      after: true
    }],
    'comma-style': [2, 'last'],
    'constructor-super': 2,
    curly: [2, 'multi-line'],
    'dot-location': [2, 'property'],
    'eol-last': 2,
    eqeqeq: ['error', 'always', {
      null: 'ignore'
    }],
    'generator-star-spacing': [2, {
      before: true,
      after: true
    }],
    'handle-callback-err': [2, '^(err|error)$'],
    indent: [2, 2, {
      SwitchCase: 1
    }],
    'jsx-quotes': [2, 'prefer-single'],
    'key-spacing': [2, {
      beforeColon: false,
      afterColon: true
    }],
    'keyword-spacing': [2, {
      before: true,
      after: true
    }],
    'new-cap': [2, {
      newIsCap: true,
      capIsNew: false
    }],
    'new-parens': 2,
    'no-array-constructor': 0,
    'no-caller': 2,
    'no-class-assign': 2,
    'no-cond-assign': 2,
    'no-const-assign': 2,
    'no-control-regex': 0,
    'no-delete-var': 2,
    'no-dupe-args': 2,
    'no-dupe-class-members': 2,
    'no-dupe-keys': 2,
    'no-mutating-props': 'off'
  }
}
