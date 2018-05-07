require("dotenv").config()
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  devServer: {
    // Display only errors to reduce the amount of output.
    stats: "errors-only",

    // Parse host and port from env to allow customization.
    //
    // If you use Docker, Vagrant or Cloud9, set
    // host: options.host || "0.0.0.0";
    //
    // 0.0.0.0 is available to all network devices
    // unlike default "localhost".
    host: process.env.HOST, // Defaults to "localhost"
    port: process.env.PORT, // Defaults to 8080
    open: false, // Open the page in browser
    overlay: true // Overlay for capturing compilation related warnings and errors
  },

  plugins: [new HtmlWebpackPlugin({ title: "Webpack Book" })]
}
