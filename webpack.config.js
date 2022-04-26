
const path = require('path')
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')     // 抽离css为单独文件，此时就不需要style-loader

const globAll = require('glob-all')
const PurgecssWebpackPlugin = require('purgecss-webpack-plugin')    // css摇树

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin    // 打包分析

const PostcssPresetEnv = require('postcss-preset-env')  // css兼容

const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')


module.exports = {
    mode: 'development',
    // mode: 'production',
    // entry配置说明

    // 字符串：单入口 -> 单出口
    // Array: 多入口 -> 单出口 -> 1个html
    // Object: 多入口 -> 多出口 -> 1个/多个html(多个html需要配置多个HTML模板)
    // entry: './src/app.js',
    entry: ['./src/app.js', './src/app2.js'],
    // entry: {
    //   index: './src/app.js',
    //   about: './src/app2.js'
    // },
    output: {
        // 单出口配置
        // filename: 'js/main.js',
        // 多出口配置
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {      // 开启摇树
        usedExports: true
    },
    // resolve: {
    //
    // },
    devServer: {
        port: 9000,
        open: true,
        hot: false
    },
    module: {
        rules: [
            {
                test: /\.css/,
                include: path.resolve(__dirname, 'src'),
                use: [
                    // 'style-loader',
                    {
                      loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                // postcss插件
                                PostcssPresetEnv()
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.less/,
                include: path.resolve(__dirname, 'src'),
                use: [
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                // postcss插件
                                PostcssPresetEnv()
                            ]
                        }
                    },
                    {
                        loader: 'less-loader'
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpeg)$/i,
                include: path.resolve(__dirname, 'src'),
                loader: 'url-loader',
                options: {
                    esModule: false,
                    limit: 30 * 1024,
                    name: '[hash:8].[ext]',    // 名称只取前八位，扩展名取原文件扩展名
                    publicPath: '../images',
                    outputPath: 'images'
                },
            },
            {
              test: /\.html$/,
              use: [
                  {
                      loader: 'html-loader'
                  }
              ]
            },
            {
                test: /\.js/,
                include: path.resolve(__dirname, 'src'),
                use: {
                    loader: 'babel-loader',
                    options: {  // 用babel-loader 把es6 -->es5
                        presets: [
                            '@babel/preset-env'
                        ]
                    }
                }
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './public/index.html',
            // minify: {
            //     collapseWhitespace: false,  // 移除空格
            //     removeComments: true,       // 移除注释
            // },
            chunks: 'index'
        }),
        // new HtmlWebpackPlugin({
        //     filename: 'about.html',
        //     template: './public/index.html',
        //     minify: {
        //         collapseWhitespace: false,  // 移除空格
        //         removeComments: true,       // 移除注释
        //     },
        //     chunks: 'about'
        // }),
        new CleanWebpackPlugin(),           // 每次打包清除上一次打包文件
        new MiniCssExtractPlugin({          // 抽离css为单独文件
            filename: 'css/index.css'       // 不设置默认就是根路径下main.css
        }),
        new OptimizeCssAssetsWebpackPlugin(), // 压缩css
        // new PurgecssWebpackPlugin({
        //     paths: globAll.sync([
        //         path.join(__dirname, './src/index.html'),
        //         path.join(__dirname, './src/**/*.js')
        //     ])
        // })

        new BundleAnalyzerPlugin({
            analyzerMode: 'disabled', // 不启动展示打包报告的http服务
            generateStatsFile: true, // 生成stats.json文件
        }),
        new webpack.DefinePlugin({
            EXPRESSION: "1+1",
            BOOLEAN: "true",
            URL: JSON.stringify('www.fengzhen8023.com')
        })
    ],
    devtool: 'source-map'
}
