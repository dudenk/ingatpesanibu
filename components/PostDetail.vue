<template>
    <div class="blog_details_content">
        <div class="image_box">
            <div class="row">
                <div class="col-lg-12">
                <div class="">
                    <div class="image">
                        <img :src="imageSource(post.featured_image_src)"  class="img-fluid" alt="img" />
                    </div>
                </div>
                </div>
            </div>
        </div>
        <ul class="tags_upper">
            <li><a href="# " class="author "><b>{{post.authorname}} </b> </a></li>
            <li><a href="# " class="date "><span class="fa fa-clock-o"></span>{{ postDate(post.date) }} </a></li>
        </ul>
        
        <h1 class="heading" v-html="post.title.rendered"> </h1>

        <div class="content_box">
            <div v-for="(content,p) of post.content.rendered.split('</p>')" :key="p">
                <div v-html="content"> </div>
                <div v-if="p === 0"> </div>
            </div>
            
            <div class="authour_box clearfix">
                <div class="authour_details">
                <img src="assets/image/resources/review-1.png" class="img-fluid" alt="img" />
                <div class="content_box">
                     
                </div>
                </div>
                <div class="media_icons">
                <ul>
                    <li>Share:</li>
                    <ShareNetwork
                        v-for="network in networks"
                        :network="network.network"
                        :key="network.network"
                    
                        :url="postUrl"
                        :title="post.title.rendered"
                        >
                        
                    <li> <i :class="network.icon"></i> </li> 
                    </ShareNetwork>
                </ul>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>

export default {
    name: 'post-detail',
    components: {
    },
    props: ['post'],
    computed: {
        postUrl: function () {
            return 'https://satgascovid.pojoksatu.id/berita/' + this.post.slug
        },
    },
    data() {
        return {
            networks: [
                { network: 'facebook', name: 'Facebook', icon: 'fa fah fa-lg fa-facebook-f', color: '#1877f2' },
                { network: 'twitter', name: 'Twitter', icon: 'fa fah fa-lg fa-twitter', color: '#1da1f2' },
                { network: 'whatsapp', name: 'Whatsapp', icon: 'fa fah fa-lg fa-whatsapp', color: '#25d366' }
            ]
        }
    },
    methods: {
        postDate: function (theDate) {
            return this.$moment(theDate).format('D MMM YYYY, H:mm z')
        },
        imageSource (src) {
            if (src && src.substring(0,5) !== 'https' ) {
                return 'https' + src.substring(4)
            } else {
                return src
            }
        },
    }
}
</script>