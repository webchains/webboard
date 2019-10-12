<template>
    <b-container>
        <b-row>
            <b-col>
                <p class="logged">address: {{$store.getters.user.publicUser}}</p>
                <p class="logged">balance: {{balance}}</p>
            </b-col>
        </b-row>
        <b-row v-if="posts">
            <b-col v-if="posts.length">
                <p>Posts</p>
                <Post v-for="post of posts" :key="post._id" class="rowcol" @sendReply="matchPost" :post="post" @sendInterest="matchPost" :type="null" @mine="mine" :mining="mining"/>
                <b-pagination v-model="page" :total-rows="posts.length" :per-page="limit" align="fill"></b-pagination>
            </b-col>
            <b-col v-else>
                <p>no posts yet</p>
            </b-col>
        </b-row>
        <b-row v-else>
            <b-col>
                <p>no posts yet</p>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import Post from '../components/Post.vue'
import axios from 'axios'
export default {
    name: 'profile',
    data(){
        return {
            posts: null,
            balance: null,
            page: 1,
            limit: 10
        }
    },
    created(){
        this.getPosts();
        this.getBalance();
    },
    components: {
        Post
    },
    methods: {
        mine(e){
            this.$emit('mine', e);
        },
        props: ['mining'],
        getPosts(){
            axios.get(this.$store.getters.server + '/data/address/' + this.$store.getters.user.publicUser).then(res => {
                this.posts = res.data;
            }).catch(error => {console.log(error);});
        },
        matchPost(data){
            for(let i = 0;i < this.posts.docs.length;i++){
                if(data.post._id === this.posts.docs[i]._id){
                // this.posts[i] = data;
                this.posts.docs[i].replies = data.post.replies;
                this.posts.docs[i].interests = data.post.interests;
                return true;
                }
            }
        },
        getBalance(){
            axios.get(this.$store.getters.node + '/wallet/' + this.$store.getters.user.publicUser).then(res => {this.balance = res.data;}).catch(error => {console.log(error);});
        }
    }
}
</script>
