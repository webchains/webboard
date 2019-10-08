<template>
  <b-container>
      <Post :post="post" v-if="post" @sendReply="matchPost" @sendInterest="matchPost"/>
  </b-container>
</template>

<script>
import Post from '../components/Post.vue'
import axios from 'axios'
export default {
    name: 'post',
    data(){
        return {
            id: this.$route.params.post,
            post: null
        }
    },
    components: {
        Post
    },
    created(){
        this.getPost();
    },
    methods: {
        getPost(){
            axios.get(this.$store.getters.randomServer + '/data/post/' + this.id).then(res => {
                this.post = res.data;
            }).catch(error => {
                console.log(error);
            });
        },
        matchPost(data){
            this.post = data;
        }
    }
}
</script>

<style>

</style>