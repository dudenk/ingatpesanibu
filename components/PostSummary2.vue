<template>

    <div class="posts_box">
        <nuxt-link :to="{ name: 'berita-slug', params: { slug: post.post_name }}">
            <div class="thumb_left">
                <img :src="post.post_thumb" class="img-fluid" alt="img" />
            </div>
        </nuxt-link>
        <div class="post_content">
        <p> {{ postDate(post.post_date) }} </p>
        <h2><nuxt-link :to="{ name: 'berita-slug', params: { slug: post.post_name }}" v-html="post.post_title"> </nuxt-link></h2>
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