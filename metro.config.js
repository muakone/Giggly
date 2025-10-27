const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

const projectRoot = __dirname;
const config = getDefaultConfig(projectRoot);

// Provide Node core module fallbacks for libraries like @supabase/supabase-js
// so Metro can resolve them in React Native / Expo environments.
// You may need to install the corresponding polyfill packages listed in README.
config.resolver = config.resolver || {};
config.resolver.extraNodeModules = Object.assign(
  {},
  config.resolver.extraNodeModules,
  {
    crypto: path.resolve(projectRoot, "node_modules", "react-native-crypto"),
    stream: path.resolve(projectRoot, "node_modules", "readable-stream"),
    buffer: path.resolve(projectRoot, "node_modules", "buffer"),
    process: path.resolve(projectRoot, "node_modules", "process"),
  }
);

// Ensure Metro resolves .cjs files which some packages use
config.resolver.sourceExts = Array.from(
  new Set([...(config.resolver.sourceExts || []), "cjs"])
);

module.exports = withNativeWind(config, { input: "./global.css" });
