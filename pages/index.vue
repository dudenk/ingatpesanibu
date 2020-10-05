<template>
    <!--Header-->
    <main class="main-content">
      <!------main-content------>
      
      <section id="berita" class="welcome type_one">
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
                <div class="col-lg-12 padding_zero">
                  <div class="row news-list">
                    <div
                        v-for="post in HomePosts"
                        class="col-lg-4"
                        :key="post.id"
                    >
                      <post-summary :post="post"></post-summary>
                    </div>
                      
                  </div>
                  <center><nuxt-link to="/berita" class="theme_btn tp_two">Berita Lainnya</nuxt-link></center>
                  <p> &nbsp; </p>
                </div>
            </div>
          </div>
      </section>
      <!-------------welome_box---------->
      <section class="blog type_two">
          <div class="container">
            <div class="row">
                <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                  <div class="icon_box type_one wow slideInUp" data-wow-delay="00ms" data-wow-duration="1500ms">
                      <div class="icon">
                        <img src="~static/image/svg/masksick.svg" class="img-fluid svg_image" alt="home" /> 
                      </div>
                      <div class="content_box">
                        <h2><a href="#">Memakai Masker</a></h2>
                        <p> Memakai masker terbukti menjadi cara paling efektif dalam mencegah penularan virus corona, yang utamanya menyebar lewat transmisi udara. </p>
                      </div>
                  </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                  <div class="icon_box type_one wow slideInUp" data-wow-delay="100ms" data-wow-duration="1500ms">
                      <div class="icon">
                        <img src="~static/image/svg/handwashwashing.svg" class="img-fluid svg_image" alt="home" />
                      </div>
                      <div class="content_box">
                        <h2><a href="#">Mencuci Tangan</a></h2>
                        <p>Disarankan untuk mencuci tangan sesering mungkin, mencuci tangan minimal 20 detik adalah cara paling tepat untuk menghilangkan bakteri dan virus.</p>
                      </div>
                  </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                  <div class="icon_box type_one wow slideInUp" data-wow-delay="200ms" data-wow-duration="1500ms">
                      <div class="icon">
                        <img src="~static/image/svg/socialspreading.svg" class="img-fluid svg_image" alt="home" />
                      </div>
                      <div class="content_box">
                        <h2><a href="#">Menjaga Jarak</a></h2>
                        <p>  Physical distancing atau jaga jarak merupakan hal sederhana yang bisa kita lakukan untuk mencegah penyebaran virus corona. </p>
                      </div>
                  </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                  <div class="icon_box type_one last wow slideInUp" data-wow-delay="300ms" data-wow-duration="1500ms">
                      <div class="icon">
                        <img src="~static/image/svg/smartphone.svg" class="img-fluid svg_image" alt="svg" /> <span class="flaticon-virus"></span>
                      </div>
                      <div class="content_box"> 
                        <p> &nbsp; </p>
                        <h6>Pertanyaan? COVID-19</h6>
                        <h2><a href="#">Hotline 119 </a></h2>
                        <p> </p>
                        <p> &nbsp; </p>
                      </div>
                  </div>
                </div>
            </div>
          </div>
      </section>
      <!-------------welome_box---------->
      
    

      <section id="infographis" class="welcome type_one"> 
          <div class="container">
            <div class="row">
                <div class="col-lg-12">
                  <div class="heading text-center icon_dark tp_one">
                      <h6>Infograpis</h6>
                      <span class="flaticon-virus icon"></span>
                  </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12 padding_zero">
                  <div class="igpost-list">

                  <client-only>
                    <carousel v-bind="slickOptions">
                      <slide
                          v-for="igpost in tagData"
                          class="owl-item"
                          :key="igpost.id"
                        >
                            <div class="blog_box type_one ">
                              <div class="image_box ">
                                  <img :src="igpost.node.thumbnail_src" class="img-fluid " alt="img ">
                                  <div class="overlay">
                                    <a :href="igUrl(igpost.node.shortcode)" data-fancybox="gallery" data-caption="  ">
                                    <span><i class="fa fa-instagram"></i></span>
                                    </a>
                                  </div>
                              </div>
                            </div>
                        </slide>
                    </carousel>
                  </client-only>

                  </div>
                  
                </div>
            </div>
          </div>
      </section>

      <section id="video" class="explore_more type_two">
          <div class="container">
            <div class="row">
                <div class="col-lg-12">
                  <div class="heading text-center icon_dark tp_one">
                      <h3 class="text-white">Video</h3>
                  </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12 padding_zero">
                  <div class="row news-list">
                    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/videoseries?list=PLEfKHty_QlpjLemMpYs4RSvnGtXpIlOdW" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                      
                  </div>
                  
                </div>
            </div>
          </div>
      </section>
      <!-------------main-centent-end--------------->
    </main>
</template>

<script>

import driver from 'ig-headless-driver'

import { mapState, mapActions } from 'vuex';

import PostSummary from '~/components/PostSummary.vue'

export default {
  components: {
    PostSummary
  },
  head () {
    return {
      title: 'SATGASCOVID | Bersama Pojoksatu.id #IngatPesanIbu',
      meta: [
        { hid: 'description', name: 'description', content: 'Bersama Pojoksatu.id #IngatPesanIbu, Memakai Masker, Mencuci Tangan, Menjaga Jarak.' }
      ],
      script: [
        { innerHTML: '{"@context":"http://schema.org","@type":"WebSite","url":"https://dayamotora.pojoksatu.id"}', type: 'application/ld+json' }
      ],
      __dangerouslyDisableSanitizers: ['script']
    }
  },
  data() {
        return {
          slickOptions: {
            loop: true,
            perPage: 5,
            paginationEnabled: false
          },
          tagData: []
        }
    },
    computed: {
        ...mapState({
            HomePosts: state => state.homeposts,
        })
    }, 
    methods: {
        ...mapActions({
            getPosts: 'getHomePosts',
        }),
        async getIGbyTag() {
          const tag = 'ingatpesanibupakaimasker'
          const tagData  = await driver.getTag(tag)
          this.tagData = tagData.post.slice(0,10)
          // console.log(this.tagData)
        },
        igUrl( shortcode ) {
          return "https://www.instagram.com/p/"+shortcode
        }

    },
    created() {
        this.getPosts()
        this.getIGbyTag()
    }
}

</script>

<style scoped>
iframe {
  height:100vh; 
}
</style>
