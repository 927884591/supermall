// const { resolve } = require("core-js/fn/promise");

module.exports = {
	configureWebpack: {
		alias: {
			assets: resolve("@/assets"),
			common: resolve("@/common"),
			components: resolve("@/components"),
			network: resolve("@/network"),
			views: resolve("@/views"),
		},
	},
};
