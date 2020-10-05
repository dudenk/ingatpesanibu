const webpack = require('webpack')

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'satgascovid',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
    '~/static/css/bootstrap.min.css',
    '~/static/fonts/font/flaticon.css',
    '~/static/css/style.css',
    '~/static/css/responsive.css'
  ], 

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/bootstrap.min.js',mode: 'client', ssr: false },
  ],
  
  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '@nuxtjs/moment'
  ],

  moment: {
    defaultLocale: 'id',
    locales: ['id'],
    defaultTimezone: 'Asia/Jakarta'
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    ['nuxt-lazy-load', {
      images: true,
      videos: true,
      audios: true,
      iframes: true,
      native: false,
      polyfill: true,
      directiveOnly: false,
      
      // Default image must be in the static folder
      // defaultImage: '/images/default-image.jpg',
   
      // To remove class set value to false
      loadingClass: 'isLoading',
      loadedClass: 'isLoaded',
      appendClass: 'lazyLoad',
      
      observerConfig: {
        // See IntersectionObserver documentation
      }
    }]
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    vendor: ['jquery'],
    plugins: [
      // set shortcuts as global for bootstrap
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
          'window.jQuery': 'jquery'
      })
    ]
  },

  server: {
    port: 3021,
    //host: 'localhost',
    host: '0.0.0.0'
  }
}
