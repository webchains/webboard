<template>
  <b-container>
      <Post :post="post" v-if="post" @sendReply="matchPost" @sendInterest="matchPost" :type="null" @mine="mine" :mining="mining"/>
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
    props: ['mining'],
    methods: {
        mine(e){
            this.$emit('mine', e);
        },
        getPost(){
            axios.get(this.$store.getters.server + '/data/post/' + this.id).then(res => {
                this.post = res.data;
            }).catch(error => {
                console.log(error);
            });
        },
        matchPost(data){
            this.post = data.post;
        }
    }
}
</script>

<style>

</style>