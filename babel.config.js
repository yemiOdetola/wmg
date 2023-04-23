module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  // env: {
  //   production: {
  //     plugins: [
  //       'react-native-paper/babel',
  //     ],
  //   },
  // },
  // plugins: ['optional-require', [
  //   "module-resolver",
  //   {
  //     alias: {
  //       "*": ["src/*"],
  //       "assets": "./src/assets",
  //       "components/*": "./src/components/*",
  //       "context/*": "./src/context/*",
  //       "hooks/*": "./src/hooks/*",
  //       "navigation/*": "./src/navigation/*",
  //       "utils/*": "./src/utils/*"
  //     }
  //   }
  // ]],
  plugins: [
    'react-native-reanimated/plugin',
  ],
};
