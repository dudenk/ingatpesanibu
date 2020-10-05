<template>
    <!--Header-->
    <main class="main-content">
      <!------main-content------>
      <!------main-slider------>
      <!-------------welome_box---------->
      <section id="berita" class="blog type_two">
          <div class="container">
            <div class="row">
                <div class="col-lg-12">
                  <div class="heading text-center icon_dark tp_one">
                      <h6>Video</h6>
                      <span class="flaticon-virus icon"></span>
                  </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    {{ dataYoutube }}
                    <async-content :loaded="loaded" classnya="row">
                        <div v-for="(video,i) of dataYoutube" :key="i" class="col-lg-4 col-md-4 col-xs-12" >
                            <playlist-youtube :post="video" class="post-summary"></playlist-youtube>
                        </div>
                    </async-content>
                    
                </div>

                <!--- <button @click="postLoader.loadPage()" class="theme_btn tp_two">Berita Lainnya</button> -->
            </div>
          </div>
      </section>
      
      <!-------------main-centent-end--------------->
    </main>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import wpMixin from '~/plugins/wp-mixin'
import asyncContent from '~/components/async-content.vue'
import PlaylistYoutube from '~/components/PlaylistYoutube.vue'

export default {
  mixins: [wpMixin],
  components: {
    asyncContent,
    PlaylistYoutube
  },
  head () {
    return {
      title: 'Video SATGASCOVID Bersama Pojoksatu.id #IngatPesanIbu',
      meta: [
        { hid: 'description', name: 'description', content: 'Bersama Pojoksatu.id #IngatPesanIbu, Memakai Masker, Mencuci Tangan, Menjaga Jarak.' }
      ],
      script: [
        { innerHTML: '{"@context":"http://schema.org","@type":"WebSite","url":"https://satgascovid.pojoksatu.id"}', type: 'application/ld+json' }
      ],
      __dangerouslyDisableSanitizers: ['script']
    }
  },
    data () {
        return {
            loaded: false,
            dataYoutube: {}
        }
    },
    computed: {
        
    }, 
    methods: {
        getVideos() {
            this.$axios.get('')
            .then(response => {
                // console.log(response.data)
                this.loaded = true
                this.dataYoutube = response.data
            })
        }
        
    },
    created() {
        this.getVideos
    }
}

</script>

<style>
</style>
