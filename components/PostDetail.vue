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
            <li><a href="# " class="author ">{{post.authorname}} </a></li>
            <li><a href="# " class="date "><span class="fa fa-clock-o"></span>{{ postDate(post.date) }} </a></li>
        </ul>
        
        <h1 class="heading" v-html="post.title.rendered"> </h1>
        <p> </p>
        <div class="content_box">
            <div v-for="(content,p) of post.content.rendered.split('</p>')" :key="p">
                <div v-html="content"> </div>
                <div v-if="p === 0"> </div>
            </div>

            <p> </p>
            <div class="authour_box clearfix">
                <div class="authour_details">
                <img src="assets/image/resources/review-1.png" class="img-fluid" alt="img" />
                <div class="content_box">
                     
                </div>
                </div>
                <div class="media_icons">
                <ul>
                    <li>Share:</li>
                    <li> <a><i class="fa fa-facebook"></i></a></li>
                    <li> <a><i class="fa fa-twitter"></i></a></li>
                    <li> <a><i class="fa fa-instagram"></i></a></li>
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