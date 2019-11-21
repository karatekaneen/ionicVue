/* eslint-disable camelcase */
module.exports = {
	transpileDependencies: ['vuetify'],
	publicPath: process.env.NODE_ENV === 'production' ? '/~roba0007/' : '/',
	pwa: {
		name: 'Busy Beaver',
		themeColor: '#9b1d20',
		msTileColor: '#9b1d20',
		appleMobileWebAppCapable: 'yes',
		appleMobileWebAppStatusBarStyle: 'black',
		manifestOptions: {
			icons: [
				{
					src: 'img/icons/Icon-16.png',
					sizes: '16x16',
					type: 'image/png'
				},
				{
					src: 'img/icons/Icon-20.png',
					sizes: '20x20',
					type: 'image/png'
				},
				{
					src: 'img/icons/Icon-29.png',
					sizes: '29x29',
					type: 'image/png'
				},
				{
					src: 'img/icons/Icon-32.png',
					sizes: '32x32',
					type: 'image/png'
				},
				{
					src: 'img/icons/Icon-36.png',
					sizes: '36x36',
					type: 'image/png'
				},
				{
					src: 'img/icons/Icon-40.png',
					sizes: '40x40',
					type: 'image/png'
				},
				{
					src: 'img/icons/Icon-48.png',
					sizes: '48x48',
					type: 'image/png'
				},
				{
					src: 'img/icons/Icon-50.png',
					sizes: '50x50',
					type: 'image/png'
				},
				{
					src: 'img/icons/Icon-55.png',
					sizes: '55x55',
					type: 'image/png'
				},
				{
					src: 'img/icons/Icon-57.png',
					sizes: '57x57',
					type: 'image/png'
				},
				{
					src: 'img/icons/Icon-58.png',
					sizes: '58x58',
					type: 'image/png'
				},
				{
					src: 'img/icons/Icon-60.png',
					sizes: '60x60',
					type: 'image/png'
				},
				{
					src: 'img/icons/Icon-64.png',
					sizes: '64x64',
					type: 'image/png'
				},
				{
					src: 'img/icons/Icon-72.png',
					sizes: '72x72',
					type: 'image/png'
				},
				{
					src: 'img/icons/Icon-76.png',
					sizes: '76x76',
					type: 'image/png'
				},
				{
					src: 'img/icons/Icon-80.png',
					sizes: '80x80',
					type: 'image/png'
				},
				{
					src: 'img/icons/Icon-87.png',
					sizes: '87x87',
					type: 'image/png'
				},
				{
					src: 'img/icons/Icon-88.png',
					sizes: '88x88',
					type: 'image/png'
				},
				{
					src: 'img/icons/Icon-96.png',
					sizes: '96x96',
					type: 'image/png'
				},
				{
					src: 'img/icons/Icon-100.png',
					sizes: '100x100',
					type: 'image/png'
				},
				{
					src: 'img/icons/Icon-114.png',
					sizes: '114x114',
					type: 'image/png'
				},
				{
					src: 'img/icons/Icon-120.png',
					sizes: '120x120',
					type: 'image/png'
				},
				{
					src: 'img/icons/Icon-128.png',
					sizes: '128x128',
					type: 'image/png'
				},
				{
					src: 'img/icons/Icon-144.png',
					sizes: '144x144',
					type: 'image/png'
				},
				{
					src: 'img/icons/Icon-152.png',
					sizes: '152x152',
					type: 'image/png'
				},
				{
					src: 'img/icons/Icon-167.png',
					sizes: '167x167',
					type: 'image/png'
				},
				{
					src: 'img/icons/Icon-172.png',
					sizes: '172x172',
					type: 'image/png'
				},
				{
					src: 'img/icons/Icon-180.png',
					sizes: '180x180',
					type: 'image/png'
				},
				{
					src: 'img/icons/Icon-192.png',
					sizes: '192x192',
					type: 'image/png'
				},
				{
					src: 'img/icons/Icon-196.png',
					sizes: '196x196',
					type: 'image/png'
				},
				{
					src: 'img/icons/Icon-256.png',
					sizes: '256x256',
					type: 'image/png'
				},
				{
					src: 'img/icons/Icon-512.png',
					sizes: '512x512',
					type: 'image/png'
				},
				{
					src: 'img/icons/Icon-1024.png',
					sizes: '1024x1024',
					type: 'image/png'
				}
			],
			start_url: '.',
			display: 'standalone'
		}
	}
}
