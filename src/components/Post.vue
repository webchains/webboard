<template>
    <b-row>
        <b-col>
            <p class="mainAddress">from: {{post.user}}</p>
            <p v-if="$route.name !== 'category'">category: <router-link :to="{name: 'category', params: {category: post.category}}">{{post.category}}</router-link></p>
            <p v-if="$route.name !== 'post'">id: <router-link :to="{name: 'post', params: {post: post._id}}">{{post._id}}</router-link></p>
            <!-- <p>media: <a :href="nodes + '/files/' + post.media">{{post.media}}</a></p> -->
            <b-row v-if="post.text">
                <b-col v-if="$route.name !== 'post'">
                    <read-more more-str="read more" :text="post.text" link="#" less-str="read less" :max-chars="280"></read-more>
                </b-col>
                <b-col v-else>
                    <p>{{post.text}}</p>
                </b-col>
            </b-row>
            <b-row v-if="post.media">
                <b-col>
                    <img :src="$store.getters.randomServer + '/files/' + post.media" :alt="post.media" v-if="/\.(jpe?g|png|gif|bmp|webp)$/i.test(post.media)" class="mediaSize">
                    <video v-else-if="/\.(ogg|webm|3gp|flv|mp4)$/i.test(post.media)" :src="$store.getters.randomServer + '/files/' + post.media" controls class="mediaSize"></video>
                    <audio v-else-if="/\.(mp3|aac|wma|wav|flac)$/i.test(post.media)" :src="$store.getters.randomServer + '/files/' + post.media" controls class="mediaSize"></audio>
                    <p v-else class="actual">media: <a :href="$store.getters.randomServer + '/files/' + post.media">{{post.media}}</a></p>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <p class="my-1"><span v-if="$store.getters.isAuth"><b-button @click="reply = !reply">Reply</b-button></span><span v-else>Reply</span>:<span v-if="post.replies.length"><b-button @click="replies = !replies">{{post.replies.length}}</b-button></span><span v-else>{{post.replies.length}}</span><span class="mx-1">|-----|</span><span v-if="$store.getters.isAuth && $store.getters.user.publicUser !== post.user"><b-button @click="mainMine(post.user)" :active="!mining">Mine</b-button></span><span v-else>Mine</span><span class="mx-1">|-----|</span><span v-if="$store.getters.isAuth && $store.getters.user.publicUser !== post.user"><b-button @click="sendInterest">Interest</b-button></span><span v-else>Interest</span>:<span v-if="post.interests.length"><b-button @click="interests = !interests">{{post.interests.length}}</b-button></span><span v-else>{{post.interests.length}}</span></p>
                </b-col>
            </b-row>
            <b-row v-if="feedback">
                <b-col>
                    <p>{{feedback}}</p>
                </b-col>
            </b-row>
            <Interests v-if="interests" :post="post"/>
            <Reply v-if="reply" :post="post" @reply="sendReply"/>
            <b-row v-if="replies">
                <b-col>
                    <Replies v-for="(reply, index) of post.replies" :key="index" :reply="reply"/>
                </b-col>
            </b-row>
        </b-col>
    </b-row>
</template>

<script>
import Reply from './Reply.vue'
import Replies from './Replies.vue'
import Interests from './Interests.vue'
import axios from 'axios'
export default {
    name: 'post',
    data(){
        return {
            reply: false,
            replies: false,
            interests: false,
            feedback: null
        }
    },
    props: ['post', 'mining'],
    components: {
        Reply,
        Replies,
        Interests
    },
    methods: {
        mainMine(e){
            // if(e !== this.$store.getters.user.publicUser){
                this.$emit('mine', e);
            // } else {
            //     console.log('can not mine you');
            // }
        },
        sendInterest(){
            axios.post(this.$store.getters.randomServer + '/data/interests/' + this.post._id, {main: this.$store.getters.user.publicUser}).then(res => {
                this.$emit('sendInterest', res.data);
            }).catch(error => {
                console.log(error);
                this.feedback = 'there was an error';
                setTimeout(() => {this.feedback = null;}, 3000);
            });
        },
        sendReply(e){
            this.$emit('sendReply', e);
        }
    }
}
</script>

<style>
/* .reward {
  font-size: 10px;
}
.mainAddress {
  font-size: 8px;
}
.actual {
  font-size: 20px;
} */
</style>