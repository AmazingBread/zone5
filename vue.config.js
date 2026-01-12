const {defineConfig} = require("@vue/cli-service");

module.exports = defineConfig({
	transpileDependencies:true,
	publicPath           :"./",
	devServer            :{
		historyApiFallback:true,
	},
	productionSourceMap  :true,
	configureWebpack     :{
		module:{
			rules:
				{
					test   :/\.mjs$/,
					include:/node_modules/,
					type   :'javascript/auto',
				},
		},
	},
	devtool              :'source-map', // devtool을 configureWebpack 안으로 이동
})
