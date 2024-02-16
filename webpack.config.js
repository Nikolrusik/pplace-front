const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: '/src/index.tsx', // Укажите точку входа как .tsx файл
    // output: {
    //     path: path.resolve(__dirname, 'dist'),
    //     filename: 'index_bundle.js',
    //     // publicPath: "/",

    //     publicPath: "/b28502136/app_local/473ee3726de57156bf426c46b8ee25a5/"
    // },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/, // Добавляем ts и tsx в список расширений
                exclude: /node_modules/,
                use: ['babel-loader', 'ts-loader'], // Добавляем ts-loader для обработки TypeScript файлов
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: '/src/index.html',
        }),
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'], // Добавляем расширения .ts и .tsx
    },
    devServer: {
        historyApiFallback: true,
    },
};
