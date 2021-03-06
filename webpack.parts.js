exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    stats: "errors-only",
    host,
    port,
    open: false,
    overlay: true
  }
})

exports.loadCSS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        exclude,

        use: ["style-loader", "css-loader"]
      }
    ]
  }
})

const MiniCssExtractPlugin = require("mini-css-extract-plugin")
exports.extractCSS = ({ include, exclude, use = [] }) => {
  // Output extracted CSS to a file
  const plugin = new MiniCssExtractPlugin({
    filename: "[name].css"
  })

  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          include,
          exclude,

          use: [MiniCssExtractPlugin.loader].concat(use)
        }
      ]
    },
    plugins: [plugin]
  }
}

const PurifyCSSPlugin = require("purifycss-webpack")
exports.purifyCSS = ({ paths }) => ({
  plugins: [
    new PurifyCSSPlugin({
      paths,
      minimize: false,
      verbose: true
    })
  ]
})

exports.autoprefix = () => ({
  loader: "postcss-loader",
  options: {
    plugins: () => [require("autoprefixer")()]
  }
})

exports.loadImages = ({ include, exclude, options, use = [] } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g)$/,
        include,
        exclude,
        use: [{ loader: "url-loader", options }].concat(use)
      }
    ]
  }
})

exports.loadSVGs = ({ include, exclude, options, use = [] } = {}) => ({
  module: {
    rules: [
      {
        test: /\.svg$/,
        include,
        exclude,
        use: ["file-loader"].concat(use)
      }
    ]
  }
})

exports.loadFonts = ({ include, exclude, options, use = [] } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        include,
        exclude,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "fonts/[name].[ext]"
            }
          }
        ].concat(use)
      }
    ]
  }
})

exports.loadJavascript = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,
        use: "babel-loader"
      }
    ]
  }
})

exports.loadJSON5 = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.json5$/,
        include,
        exclude,
        use: "json5-loader"
      }
    ]
  }
})
