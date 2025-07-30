module.exports = {
  presets: [
    [
      "vnmf",
      {
        framework: "preact",
        ts: true,
      },
    ],
  ],
  plugins: [
    [
      "import",
      {
        libraryName: "@vnmfify/core",
        libraryDirectory: "",
        style: true,
      },
      "@vnmfify/core",
    ],
    [
      "import",
      {
        libraryName: "@vnmfify/icons",
        libraryDirectory: "",
        camel2DashComponentName: false,
        style: () => "@vnmfify/icons/style",
      },
      "@vnmfify/icons",
    ],
    ["transform-remove-console"],
  ],
};
