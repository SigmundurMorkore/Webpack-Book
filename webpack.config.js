require("dotenv").config()
const merge = require("webpack-merge")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const GoogleFontsPlugin = require("google-fonts-webpack-plugin")

const path = require("path")
const glob = require("glob")

const parts = require("./webpack.parts")

const PATHS = {
  app: path.join(__dirname, "src")
}

const commonConfig = merge([
  {
    plugins: [
      new HtmlWebpackPlugin({
        title: "Webpack Book"
      }),
      new GoogleFontsPlugin({
        fonts: [
          { family: "Source Sans Pro" },
          { family: "Roboto", variants: ["400", "700italic"] },
          { family: "Raleway" }
        ],
        path: "fonts/"
      })
    ]
  },
  parts.loadFonts()
])

const productionConfig = merge([
  parts.extractCSS({
    use: ["css-loader", parts.autoprefix()]
  }),

  parts.purifyCSS({
    paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true })
  }),

  parts.loadImages({
    options: {
      limit: 15000,
      name: "[name].[ext]"
    },
    use: [
      {
        loader: "image-webpack-loader",
        options: {
          bypassOnDebug: true
        }
      }
    ]
  }),

  parts.loadSVGs({
    use: ["svgo-loader"]
  })
])

const developmentConfig = merge([
  parts.devServer({
    // Customize host/port here if needed
    host: process.env.HOST,
    port: process.env.PORT
  }),

  parts.loadCSS(),
  parts.loadImages(),
  parts.loadSVGs()
])

module.exports = mode => {
  if (mode === "production") {
    return merge(commonConfig, productionConfig, { mode })
  }

  return merge(commonConfig, developmentConfig, { mode })
}
