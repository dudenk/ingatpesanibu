<template>
    <div class="blog_box type_two">
        <div class=" image_box">
            <img :src="post.featured_image_src_medium" class="img-fluid" alt="img" />
            <div class="overlay">
            </div>
        </div>
        <div class="content_box">
            <a href="#" class="category"> </a>
            <div class="title_box">
            <div class="post-date">
                <p><span class="fa fa-clock-o"></span>{{ postDate(post.date) }}</p>
            </div>
            <h2><nuxt-link :to="{ name: 'berita-slug', params: { slug: post.slug }}" v-html="post.title.rendered"> </nuxt-link></h2>
            </div>
            <p></p>
            <nuxt-link :to="{ name: 'berita-slug', params: { slug: post.slug }}" class="read_more tp_two">Selanjutnya<span class="flaticon-arrow"></span></nuxt-link>
        </div>
    </div>
</template>

<script>
export default {
  name: 'post-summary',
  components: {
  },
  props: ['post'],
    methods: {
        postDate: function (theDate) {
            return this.$moment(theDate).format('D MMM YYYY, H:mm z')
        },
    }
}
</script>