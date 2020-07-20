const path = require("path");
const fs = require("fs");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const SpritePlugin = require("svg-sprite-loader/plugin");
const webpack = require('webpack');

const PATHS = {
    src: path.join(__dirname, "../src"),
    dist: path.join(__dirname, "../dist"),
    assets: "assets/"
};

const PAGES_DIR = `${PATHS.src}/pug/pages/`;
const PAGES = fs
    .readdirSync(PAGES_DIR)
    .filter(fileName => fileName.endsWith(".pug"));

module.exports = {
    externals: {
        paths: PATHS
    },
  entry: {
    index: `${PATHS.src}/index.js`,
  },
    output: {
        filename: `${PATHS.assets}js/[name].[contenthash].js`,
        path: PATHS.dist,
        publicPath: "/"
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            name: "vendors",
            test: /node_modules/,
            chunks: "all",
            enforce: true
          }
        }
      }
    },
    module: {
        rules: [
            {
                // JavaScript
                test: /\.js$/,
                loader: "babel-loader",
                exclude: "/node_modules/"
            },
            {
              // pug
              test: /\.pug$/,
              loader: "pug-loader",
              options: {
                pretty: true
              }
            },
            {
              // images / icons
              test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "/assets/fonts/",
                publicPath: "../fonts/",
              },
            },
            {
                // images / icons
                test: /\.(png|jpg|gif|svg)$/,
                loader: "file-loader",
                options: {
                    name: "[name].[ext]",
                    outputPath: "/assets/img/",
                    publicPath: "../img/",
                },
            },
            {
              // scss
                test: /\.scss$/,
                use: [
                    "style-loader",
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: { sourceMap: true }
                    },
                    {
                      loader: "postcss-loader",
                      options: {
                        sourceMap: true,
                        config: { path: `./postcss.config.js` }
                      }
                    },
                    {
                        loader: "sass-loader",
                        options: { sourceMap: true }
                    }
                ]
            },
          {
            // css
            test: /\.css$/,
            use: [
              "style-loader",
              MiniCssExtractPlugin.loader,
              {
                loader: "css-loader",
                options: { sourceMap: true }
              },
              {
                loader: "postcss-loader",
                options: {
                  sourceMap: true,
                  config: { path: `./postcss.config.js` }
                }
              }
            ]
          },
        ]
    },
    resolve: {
        alias: {
            "~": PATHS.src,
        }
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        "window.jQuery": "jquery"
      }),
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}css/[name].[contenthash].css`,
            exclude: "/node_modules/"
        }),
        new CopyWebpackPlugin([
            { from: `${PATHS.src}/${PATHS.assets}img`, to: `${PATHS.assets}img` },
            { from: `${PATHS.src}/${PATHS.assets}fonts`, to: `${PATHS.assets}fonts` },
            { from: `${PATHS.src}/static`, to: "" }
        ]),
      ...PAGES.map(
        page =>
          new HtmlWebpackPlugin({
            template: `${PAGES_DIR}/${page}`,
            filename: `./${page.replace(/\.pug/,'.html')}`
          })
      ),
      new CleanWebpackPlugin()
    ]
};

//            chunks: [`${page.replace(/\.pug/,'')}`, 'vendors'],
//        new SpritePlugin(),
/*
*           {
            test: /\.svg$/,
            //include: path.resolve(__dirname, 'src/assets/img'), // new line
            use: [
              {
                loader: 'svg-sprite-loader'
              },
            ]
          }
          *             // {
            //   // Fonts
            //   test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
            //   loader: "file-loader",
            //   options: {
            //     name: "[name].[ext]",
            //     /*publicPath: "/",*/
//     publicPath: (url, resourcePath, context) => {
//       if (/fonts/.test(resourcePath)) {
//         //return `../fonts/${url}`;
//       }
//       if (/node_modules/.test(resourcePath)) {
//       //  return `/${url}`;
//       }
//     },
//     // outputPath: (url, resourcePath, context) => {
//     //   if (/fonts/.test(resourcePath)) {
//     //     return `/assets/fonts/${url}`;
//     //   }
//     //   if (/node_modules/.test(resourcePath)) {
//     //     return `/${url}`;
//     //   }
//     // },
//   },
// },
// {
//     // Fonts
//     test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
//     exclude: "/node_modules/",
//     loader: "file-loader",
//     options: {
//         name: "[name].[ext]",
//         /*outputPath: "/assets/fonts/",*/
//         /*publicPath: "../fonts/",*/
//         /*publicPath: "/",*/
//     },
// },

