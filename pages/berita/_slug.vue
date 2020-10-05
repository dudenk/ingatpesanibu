<template>
    <div>
        <div class="single_blog_box">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                        <post-detail :post="post"></post-detail>
                    </div>
                    <div class="col-lg-4 col-md-4  col-sm-12 col-xs-12 ">
                        <div class="popular_posts">
                            <h2 class="sub_head">Popular Posts</h2>
                            <p> &nbsp; </p>
                            <div v-for="post in postRelated"
                                class=""
                                :key="post.id"
                            >
                                <post-summary2 :post="post"></post-summary2>
                            </div>
            
                        </div>
                        
                    </div>      
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

const Entities = require('html-entities').AllHtmlEntities;
import striptags from 'striptags'

import PostSummary2 from '~/components/PostSummary2.vue'
import PostDetail from '~/components/PostDetail.vue'
export default {
    components: {
        PostSummary2,
        PostDetail
    },
    async fetch (vm) {
        vm.store.dispatch('getPost', vm.params.slug)
    },
    head () {
        return {
            title: Entities.decode(this.post.title.rendered),
            meta: [
            {
                hid: 'description',
                name: 'description',
                content: striptags(Entities.decode(this.post.excerpt.rendered))
            },
            {
                hid: 'keywords',
                name: 'keywords',
                keywords: this.keyWords
            },
            {
                hid: 'og:title',
                property: 'og:title',
                content: Entities.decode(this.post.title.rendered)
            },
            {
                hid: 'og:type',
                property: 'og:type',
                content: 'article'
            },
            {
                hid: 'og:url',
                property: 'og:url',
                content: this.postUrl
            },
            {
                hid: 'og:image',
                property: 'og:image',
                content: this.post.featured_image_src,
            },
            {
                hid: 'og:description',
                property: 'og:description',
                content: striptags(Entities.decode(this.post.excerpt.rendered))
            }
            ],
            script: [
            { innerHTML: this.jsonld, type: 'application/ld+json' }
            ],
            __dangerouslyDisableSanitizers: ['script']
        }
    },

    data() {
        return {
            postRelated: []
        }
    },
    computed: {
        ...mapState({
            post: state => state.post,
        }),

        keyWords: function () {
            return 'Satgascovid ,' + this.post.title.rendered.split(' ').slice(0,6)
        },
        jsonld () {
            var ajson = '{ "@context": "http://schema.org", "@type": "NewsArticle", "mainEntityOfPage": { "@type": "WebPage",  "@id": "https://google.com/article" },'
            ajson += '"headline": "' + this.post.title.rendered + '",'
            ajson += '"image": ["' + this.post.featured_image_src + '"],'
            ajson += '"datePublished": "' + this.post.date + '",'
            ajson += '"dateModified": "' + this.post.modified + '",'
            ajson += '"author": { "@type": "Person", "name": "' + this.post.authorname + '"},'
            ajson += '"publisher": { "@type": "Organization", "name": "Pojoksatu.id", "logo": { "@type": "ImageObject", "url": "http://pojoksatu.id/wp-content/uploads/2017/04/logo_dekstop.png" }},'
            ajson += '"description": "' + striptags(this.post.excerpt.rendered) + '"'
            ajson += '}'
            return ajson
        }
    }, 
    methods: {
        ...mapActions({
            getPost: 'getPost',
        }),
        getRelated () {
            this.$axios.get('https://pojoksatu.id/wp-json/sulsel/v1/related/?slug=' + this.$route.params.slug)
                .then(response => {
                var vd = response.data
                // JSON responses are automatically parsed.
                if (vd) {
                    this.postRelated = vd.content
                }
            })
        },
    },
    created() {
        this.getRelated()
    }
}

</script>