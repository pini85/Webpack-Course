const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

//Inside webpack.js we cannot use EcmaScript modules yet. Hence, require syntax.
// We need to generate an absolute path for our output. This module will help us.
module.exports = {
  //This file usually imports all other dependencies. Webpack will start from this file when running the build process.
  // entry: './src/index.js', // single bundle
  entry: {
    'hello-world': './src/hello-world.js',
    'kiwi': './src/kiwi.js'// here we are using two js files.
  },
  output: {
    // filename: 'bundle[contenthash].js',//single bundle
    filename: '[name].[contenthash].js',//this will use the name of the property from the entry object and will produce two bundle js.
    path: path.resolve(__dirname, './distt'),
    publicPath: ''
    /*PublicPath tells Webpack where all the generated files are located. If you would deploy this to the internet you would use your
    server name for example: 'http://my-website.com/'. Now we are using html-webpack-plugin so the public folder will no longer be
    'distt' but empty because we dont want our new index.html to have a path for our css and js with distt/ because now they are in
    the same path.
    */
  },
  mode: 'production',
  /*
  We specified lodash twice for the kiwi page and also the hello world page. Webpack gave both pages the lodash libary. We want one
  libary to share for both of them so it wont get too much data. So we specifiy optimization

  This indicates which chunks will be selected for optimization. When a string is provided, valid values are all, async,
  and initial. Providing all can be particularly powerful, because it means that chunks can be shared even between async and
  non-async chunks.
  */
  optimization: {
    splitChunks: {
      chunks: "all"
    }

  },
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,// if webpack sees a file ending with .png or .jpg then we tell it how to use it.
        use: [
            'file-loader' // we use a plugin called file-loader so this will handle images.
        ]
      },
      {
        test: /\.css$/,
        use: [
            // 'style-loader', 'css-loader'
            //css-loader will read our CSS from file and style-loader will create style tags inside our HTML page
              MiniCssExtractPlugin.loader, 'css-loader'
              //We use miniplugin instead of style-loader.
        ]
      },
      {
        test: /\.scss$/,
        use: [
            // 'style-loader', 'css-loader', 'sass-loader'
            /*
            pay attention to the order of this array. Webpack reads from right to left. So first Webpack will invoke sass loader
            which will convert our sass to css. And it will invoke css-loader which will take that converted css and convert it to
             the javascript representation. And only then Webpack will invoke style-loader which will create style tags inside
              our HTML page and put the assets into it.
            */
              MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude:  /nodes_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            //We need a special babel preset which is called "env". Env preset will help us to compile
  // EcmaScript 6 and above code down to EcmaScript 5. Env preset includes all the features from the latest EcmaScript specification.
            presets: [ '@babel/env' ],
//Class properties are not part of the official EcmaScript specification. So we need a special babel plugin to support this feature.
// This babel plugin is called "transform-class-properties". If you want to use another modern javascript feature which is not
//supported by most browsers yet, you should find a babel plugin for that.
            plugins: ['transform-class-properties']
          }
        }
      },
      {
        test: /\.hbs$/,
        use: [
          'handlebars-loader'
        ],
      }
    ]
  },
  plugins: [
    // new TerserPlugin(),//this plugin minifies our bundle.js. We dont need to include this in production. It is already added.
    new MiniCssExtractPlugin({
      // filename: 'style[contenthash].css'//single bundle
      filename: '[name][contenthash].css'//we also want separate names from our css

    }), // What we have is the bundle.js also includes our css styles. Thep problem here is that the js file can get really big and
    //loading times will take longer. So we seperate our css into a different file
    new CleanWebpackPlugin(),
    /*contenthash = MD5 hash. Browsers use cache to save our css htrml js so when we refresh the page we do not need to
download those files each time. But if we update the files we want them to download the newest file. We use
contenthash to generate a new name for our html js css files so that the browser will download the newest
version.
Now the problem is it makes a new file each time but odes not delete the old one. So our dist folder gets
cluttered really fast. So we use a plugin called Cleanwebapckpack to clear the old files.
*/
    new HtmlWebpackPlugin({ // this plugin will generate our src index.html to distt/index.html including the MD5 hash names.
      filename: 'hello-world.html',
      chunks:['hello-world','vendors~hello-world~kiwi'],//which bundles do we include in this html page. Chunks
      //name are specified in the entry object.
      template: './src/page-template.hbs',
      title: 'Hello World',
      description: 'Some description',
      meta: {
        viewport: 'width=device-width, initial-scale=1'
      }
      // We can also give it many different options. Here we specify the title,meta tag and filename.

    }),
     new HtmlWebpackPlugin({
      filename: 'kiwi.html',
      chunks:['kiwi','vendors~hello-world~kiwi'],
      template: './src/page-template.hbs',
      title: 'Kiwi',
      description: 'Some description2',
      meta: {
        viewport: 'width=device-width, initial-scale=1'
      }
    })
  ]
};

