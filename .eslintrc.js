module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'react-native/no-inline-styles': 0,
    'react/no-unstable-nested-components': [
      'off',
      {
        allowAsProps: false,
      },
    ],
  },
};
