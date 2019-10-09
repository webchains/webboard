<template>
  <b-container>
    <b-row v-if="summary">
      <b-col>
        <p>name: {{summary.name}} | about: {{summary.about}} | count: {{summary.count}} | checksum: {{summary.checksum}} | type: {{summary.type}}</p>
      </b-col>
    </b-row>
    <b-row v-if="$store.getters.isAuth">
      <b-col>
        <p class="logged">address:{{$store.getters.user.publicUser}}</p>
      </b-col>
    </b-row>
    <!-- <b-row class="my-2" v-if="$store.getters.isAuth">
      <b-col>
        <b-button @click="tog = !tog" type="button">Private Key</b-button>
      </b-col>
    </b-row>
    <b-row v-if="tog">
      <b-col>
        <b-row>
          <b-col>
            <p class="dataBold">DO NOT SHARE YOUR PRIVATE KEY WITH ANYONE ELSE</p>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <p class="dataBold">{{$store.getters.user.privateUser}}</p>
          </b-col>
        </b-row>
      </b-col>
    </b-row> -->
    <b-row align-h="center" class="my-3" v-if="$store.getters.isAuth">
      <b-col>
        <SendPost @sendPost="madePost"/>
      </b-col>
    </b-row>
    <b-row v-else><b-col><p>Register or Login to submit content</p></b-col></b-row>
    <hr>
    <b-row><b-col><p>Results: <b-button @click="limit = 10" class="mx-1">10</b-button><b-button @click="limit = 25" class="mx-1">25</b-button><b-button @click="limit = 50" class="mx-1">50</b-button><b-button @click="limit = 75" class="mx-1">75</b-button><b-button @click="limit = 100" class="mx-1">100</b-button></p></b-col></b-row>
    <hr>
    <b-row class="my-3" align-h="center" v-if="posts">
      <b-col v-if="posts.docs.length">
        <p>Posts</p>
        <Post v-for="post of posts.docs" :key="post._id" class="rowcol" @sendReply="matchPost" :post="post" @sendInterest="matchPost"/>
        <b-pagination v-model="page" :total-rows="posts.total" :per-page="limit" align="fill"></b-pagination>
      </b-col>
      <b-col v-else><p>no posts yet</p></b-col>
    </b-row>
    <b-row v-else>
      <b-col>
        <p>no posts yet</p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import SendPost from '../components/SendPost.vue'
import Post from '../components/Post.vue'
// @ is an alias to /src
import axios from 'axios'
export default {
  name: 'panel',
  data(){
    return {
      // tog: false,
      limit: 25,
      summary: null,
      posts: null,
      page: 1
    }
  },
  created(){
    this.getSummary();
    this.getPosts();
  },
  watch: {
    limit(){
      this.getPosts();
    },
    page(){
      this.getPosts();
    }
  },
  components: {
    Post,
    SendPost
  },
  methods: {
    madePost(){
      this.getPosts();
    },
    getSummary(){
      axios.get(this.$store.getters.randomServer + '/data').then(res => {
        this.summary = res.data;
      }).catch(error => {
        console.log(error);
      });
    },
    getPosts(){
      axios.get(this.$store.getters.randomServer + '/data/posts/' + this.page + '/' + this.limit).then(res => {
        console.log(res);
        this.posts = res.data;
      }).catch(error => {console.log(error);});
    },
    matchPost(data){
      for(let i = 0;i < this.posts.docs.length;i++){
        if(data._id === this.posts.docs[i]._id){
          // this.posts[i] = data;
          this.posts.docs[i].replies = data.replies;
          this.posts.docs[i].interests = data.interests;
          return true;
        }
      }
    }
  }
}
</script>

<style scoped>
.mainInput {
  text-align: center;
}
.input-group.mainFormGroup {
  width: 55%;
  margin: 0 auto;
}
#selected1 {
  border-top: 1px solid black;
}
#selected2 {
  border-bottom: 1px solid black;
}
.dataBold {
  font-weight: bold;
}
/* .mainInput {
  margin: 0 auto;
} */
</style>
