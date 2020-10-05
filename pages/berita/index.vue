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
                      <h6>Berita</h6>
                      <span class="flaticon-virus icon"></span>
                  </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                <div v-for="(page,index) of postLoader.pages" :key="index" class="">
                    <async-content :loaded="page.loaded" classnya="row">
                        <div v-for="(post,i) of page.content" :key="i" class="col-lg-3 col-md-4 col-xs-12" >
                            <article class="list horizontal" itemscope="" itemtype="http://schema.org/NewsArticle">
                                <post-loop :post="post" class="post-summary"></post-loop>
                            </article>
                        </div>
                    </async-content>
                    
                </div>
                </div>

                <button @click="postLoader.loadPage()" class="theme_btn tp_two">Berita Lainnya</button>
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
import PostLoop from '~/components/PostLoop.vue'

export default {
  mixins: [wpMixin],
  components: {
    asyncContent,
    PostLoop
  },
  head () {
    return {
      title: 'SATGASCOVID Bersama Pojoksatu.id #IngatPesanIbu',
      meta: [
        { hid: 'description', name: 'description', content: 'Bersama Pojoksatu.id #IngatPesanIbu, Memakai Masker, Mencuci Tangan, Menjaga Jarak.' }
      ],
      script: [
        { innerHTML: '{"@context":"http://schema.org","@type":"WebSite","url":"https://satgascovid.pojoksatu.id"}', type: 'application/ld+json' }
      ],
      __dangerouslyDisableSanitizers: ['script']
    }
  },
  data() {
        return {
            postLoader: this.createWpLoader('https://pojoksatu.id/wp-json/wp/v2/posts', {
                embed: false,
                queryParams: ['tags=139895', 'per_page=8']
            }),
        }
    },
    computed: {
        
    }, 
    methods: {
        
    },
    created() {
    }
}

</script>

<style>
</style>
