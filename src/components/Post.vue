<template>
    <b-row>
        <b-col>
            <!-- <b-row>
                <b-col>
                    <p class="mainAddress"><span v-if="short" @click="short = !short" class="mainAddress">from: {{post.user.substring(0, 25)}}...click</span><span v-else @click="short = !short" class="mainAddress">from: {{post.user}}...click</span></p>
                </b-col>
            </b-row> -->
            <!-- <p class="mainAddress"><span v-if="short" @click="short = !short">from: {{post.user.substring(0, 25)}}...click</span><span v-else @click="short = !short">from: {{post.user}}...click</span></p> -->
            <b-row v-if="post.media" class="my-3">
                <b-col>
                    <img :src="$store.getters.randomServer + '/files/' + post.media" :alt="post.media" v-if="/\.(jpe?g|png|gif|bmp|webp)$/i.test(post.media)" class="mediaSize">
                    <video v-else-if="/\.(ogg|webm|3gp|flv|mp4)$/i.test(post.media)" :src="$store.getters.randomServer + '/files/' + post.media" controls class="mediaSize"></video>
                    <audio v-else-if="/\.(mp3|aac|wma|wav|flac)$/i.test(post.media)" :src="$store.getters.randomServer + '/files/' + post.media" controls class="mediaSize"></audio>
                    <p v-else class="actual">media: <a :href="$store.getters.randomServer + '/files/' + post.media">{{post.media}}</a></p>
                </b-col>
            </b-row>
            <b-row v-if="post.text" class="my-3">
                <b-col v-if="$route.name !== 'post'">
                    <p v-if="post.text.length < 280" class="postText">{{post.text}}</p>
                    <read-more more-str="read more" :text="post.text" link="#" less-str="read less" :max-chars="280" v-else></read-more>
                </b-col>
                <b-col v-else>
                    <p class="postText">{{post.text}}</p>
                </b-col>
            </b-row>
            <b-row class="my-3">
                <b-col>
                    <p class="heads"><span v-if="short" @click="short = !short">from:{{post.user.substring(0, 25)}}...click</span><span v-else @click="short = !short">from:{{post.user}}</span><span class="mx-1">|</span><span v-if="$route.name !== 'post'">id:<router-link :to="{name: 'post', params: {post: post._id}}">{{post._id}}</router-link></span><span v-else>id:{{post._id}}</span><span class="mx-1">|</span><span v-if="$route.name !== 'category'">category:<router-link :to="{name: 'category', params: {category: post.category}}">{{post.category}}</router-link></span><span v-else>category:{{post.category}}</span></p>
                    <p><span v-if="$store.getters.isAuth"><b-button @click="reply = !reply" size="sm">Reply</b-button></span><span v-else>Reply</span>:<span v-if="post.replies.length"><b-button @click="replies = !replies" size="sm">{{post.replies.length}}</b-button></span><span v-else>{{post.replies.length}}</span><span class="mx-1">|</span><span v-if="$store.getters.isAuth && $store.getters.user.publicUser !== post.user"><b-button @click="mainMine(post.user)" :disabled="mining" size="sm">Mine</b-button></span><span v-else>Mine</span><span class="mx-1">|</span><span v-if="$store.getters.isAuth && $store.getters.user.publicUser !== post.user"><b-button @click="sendInterest" size="sm">Interest</b-button></span><span v-else>Interest</span>:<span v-if="post.interests.length"><b-button @click="interests = !interests" size="sm">{{post.interests.length}}</b-button></span><span v-else>{{post.interests.length}}</span></p>
                </b-col>
            </b-row>
            <b-row v-if="feedback">
                <b-col>
                    <p>{{feedback}}</p>
                </b-col>
            </b-row>
            <hr v-if="reply">
            <Reply v-if="reply" :post="post" @reply="sendReply"/>
            <hr v-if="interests">
            <Interests v-if="interests" :post="post"/>
            <b-row v-if="replies">
                <b-col>
                    <hr>
                    <p>Replies</p>
                    <Replies v-for="(reply, index) of post.replies" :key="index" :reply="reply" @mine="mainMine" class="mx-1 my-1 rowcol"/>
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
            short: true,
            feedback: null
        }
    },
    props: ['post', 'mining', 'type'],
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
            axios.post(this.$store.getters.randomServer + '/interests/' + this.post._id, {main: this.$store.getters.user.publicUser}).then(res => {
                this.$emit('sendInterest', {post: res.data, type: this.type});
            }).catch(error => {
                console.log(error);
                this.feedback = 'there was an error';
                setTimeout(() => {this.feedback = null;}, 3000);
            });
        },
        sendReply(e){
            this.$emit('sendReply', {post: e, type: this.type});
            this.reply = false;
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