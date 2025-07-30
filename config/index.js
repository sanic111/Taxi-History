const config = {
  projectName: 'miniappBase',
  date: '2024-4-22',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [],
  defineConstants: {
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  framework: 'preact',
  compiler: 'webpack5',
  cache: {
    enable: false // Webpack Lasting Cache Configuration，Suggested to turn on。Please refer to the default configuration：https://docs.vnmf.zone/docs/config-detail#cache
  },
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {

        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // Set conversion size ceiling
        }
      },
      cssModules: {
        enable: false, // Default As false，If needed css modules Functions，Set as true
        config: {
          namingPattern: 'module', // Convert Mode，Value As global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      cssModules: {
        enable: false, // Default As false，If needed css modules Functions，Set as true
        config: {
          namingPattern: 'module', // Convert Mode，Value As global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  rn: {
    appName: 'vnmfDemo',
    postcss: {
      cssModules: {
        enable: false, // Default As false，If needed css modules Functions，Set as true
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
