<template>
  <b-container>
      <Post :post="post" v-if="post" @sendReply="getPost"/>
  </b-container>
</template>

<script>
import Post from '../components/Post.vue'
import axios from 'axios'
export default {
    name: 'Post',
    data(){
        return {
            id: this.$route.params.postid,
            post: null
        }
    },
    components: {
        Post
    },
    created(){
        this.getPost(this.id);
    },
    methods: {
        getPost(id){
            axios.get(this.$store.getters.randomServer + '/data/post/' + id).then(res => {
                this.post = res.data;
                this.post.replies = res.data.replies;
            }).catch(error => {
                console.log(error);
            });
        }
    }
}
</script>

<style>

</style>