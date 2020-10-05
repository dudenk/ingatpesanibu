import Vuex from 'vuex'
import axios from 'axios'

// axios.defaults.baseURL = 'https://express.pojoksatu.id/api/';
// axios.defaults.baseURL = 'https://pojoksatu.id/wp-json/';

const APIEXpress = axios.create({
  baseURL: `https://express.pojoksatu.id/api/`,
  headers: {
    Authorization: 'Bearer {token}'
  }
})

const APIWP = axios.create({
  baseURL: `https://pojoksatu.id/wp-json/`,
  headers: {
    Authorization: 'Bearer {token}'
  }
})

var tag_id = 139895;

const createStore = () => {
  return new Vuex.Store({
    state: {
      menuIsActive: false,
      post: {},
      pages: {
        title: {},
        better_featured_image: {},
        content: {}
      },
      tag: {},
      topiks: [],
      posts: [],
      homeposts: []
    },
    //plugins: [createPersistedState()],
    mutations: {
      setPosts: (state, posts) => {
        state.posts = posts
      },
      setHomePosts: (state, posts) => {
        state.homeposts = posts
      },
      setCurrentPost: (state, post) => {
        state.post = post
      },
      setCurrentPages: (state, pages) => {
        state.pages = pages
      },
      setCurrentTag: (state, tag) => {
        state.tag = tag
      }
    },
    actions: {
      async getPosts (vm) {
        let {data} = await APIWP.get(`wp/v2/posts/?per_page=20&tags=` + vm.state.tag.id )
        vm.commit('setPosts', data[0])
      },
      async getHomePosts ({commit}) {
        let {data} = await APIWP.get(`wp/v2/posts/?per_page=3&tags=` + tag_id )
        commit('setHomePosts', data)
      },
      async getPost ({commit, store}, slug) {
        let {data} = await axios.get(`https://express.pojoksatu.id/api/baca/?slug=${slug}`)
        commit('setCurrentPost', data.post)
      },
      async getPages ({commit, store}, slug) {
        let {data} = await axios.get(`https://pojoksatu.id/wp-json/wp/v2/pages/?slug=${slug}`)
        //console.log(data);
        commit('setCurrentPages', data[0])
      },
      async getTag ({commit, store}, slug) {
        let {data} = await axios.get(`https://pojoksatu.id/wp-json/wp/v2/tags/?slug=${slug}`)
        commit('setCurrentTag', data[0])
      },

      async nuxtServerInit ({commit}, { route, params}) {

        var ttl = 3600;
        if ( process.server ) {
          var RedisClient = require('ioredis');
          var myRedis = new RedisClient(6379, '127.0.0.1', { db: 0 });

          myRedis.on('connect', () => {
            console.log(`connected to redis`);
          });
        }

        if (process.server && route.name === 'topik-slug') {
          let {data} = await axios.get(`https://pojoksatu.id/wp-json/wp/v2/tags/?slug=${params.slug}`)
          commit('setCurrentTag', data[0])
        }
        if (process.server && route.name === 'populer') {
          let {data} = await axios.get('sulsel/v1/popular')
          commit('setPopulerPosts', data)
        }

        if (process.server && params.slug) {

          //let {data} = await axios.get(`baca/?slug=${params.slug}`)
          //console.log(data);
          //commit('setCurrentPost', data.post);

          let dataOnredis = await myRedis.get(`satgascovid:${params.slug}`, (err, result) => {
            // If that key exist in Redis store
            if (result) {
              return result;
            } else { // Key does not exist in Redis store
              // Fetch directly from Wikipedia API
              return  APIEXpress.get(`baca/?slug=${params.slug}`)
                  .then(response => {
                  // console.log(response);
                  const responseJSON = response.data.post;
                  const dataJSON = JSON.stringify({ source: 'Redis Cache', post: responseJSON });
                  // console.log(dataJSON);
                  // Save the Wikipedia API response in Redis store
                  if ( responseJSON ) {
                    myRedis.setex(`satgascovid:${params.slug}`, 3600, dataJSON);
                  }
                  // Send JSON response to client
                  const dataJSON2 = JSON.stringify({ source: 'Pojoksatu API', post:responseJSON, });
                  const resultJSON2 = JSON.parse(dataJSON2);
                  return false;
                })
                .catch(err => {
                  // console.log(err.config);
                    // console.log(err.message);
                    return false
                });
            }
          });
          // console.log(dataOnredis)
          if ( dataOnredis ) {
            const dataParse = JSON.parse(dataOnredis);
            // console.log(dataParse);
            commit('setCurrentPost', dataParse.post);
          }
          else {
            let {data} = await APIEXpress.get(`baca/?slug=${params.slug}`)
            //console.log(data);
            commit('setCurrentPost', data.post);
          }

        }
      }
    }
  })
}

export default createStore
