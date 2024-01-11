module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    ['@babel/plugin-transform-flow-strip-types'],
    ['@babel/plugin-proposal-class-properties'],
    ['@babel/plugin-proposal-private-methods'],
    ['@babel/plugin-transform-private-methods', {loose: true}],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@': './src',
          '@Assets': './src/Assets',
          '@Components': './src/Components',
          '@Navigation': './src/Navigation',
          '@Screens': './src/Screens',
          '@Store': './src/Store',
          '@Utility': './src/Utility',
        },
      },
    ],
    [
      'module:react-native-dotenv',
      {
        moduleName: 'react-native-dotenv',
        path: '.env',
        blacklist: null,
        whitelist: null,
        safe: true,
        allowUndefined: true,
      },
    ],
  ],
};
