<template>
    <b-container>
        <b-row>
            <b-col>
                <p class="logged">address: {{$store.getters.user.publicUser}}</p>
                <p class="logged">balance: {{balance}}</p>
            </b-col>
        </b-row>
        <b-row v-if="post">
            <b-col v-if="posts.length">
                <p>Posts</p>
                <Post v-for="post of posts" :key="post._id" class="rowcol" @sendReply="matchPost" :post="post" @sendInterest="matchPost"/>
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
        getPosts(){
        axios.get(this.$store.getters.randomServer + '/data/address/' + this.$store.getters.user.publicUser).then(res => {
            this.posts = posts;
        }).catch(error => {console.log(error);});
        },
        matchPost(data){
            for(let i = 0;i < this.posts.length;i++){
                if(data._id === this.posts[i]._id){
                // this.posts[i] = data;
                this.posts[i].replies = data.replies;
                this.posts[i].interests = data.interests;
                return true;
                }
            }
        },
        getBalance(){
            axios.get(this.$store.getters.randomNode + '/wallet/' + this.$store.getters.user.publicUser).then(res => {console.log(res);this.balance = res.data;}).catch(error => {console.log(error);});
        }
    }
}
</script>
