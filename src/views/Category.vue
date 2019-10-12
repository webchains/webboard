<template>
  <b-container fluid>
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
    <b-row v-if="data">
      <b-col>
        <p>{{data.category}}</p>
        <p>count: {{data.count}} | hits: {{data.hit}}</p>
      </b-col>
    </b-row>
    <b-row align-h="center" class="my-3" v-if="$store.getters.isAuth">
      <b-col>
        <SendCategoryPost :category="category" @sendCategoryPost="getNewPosts"/>
      </b-col>
    </b-row>
    <b-row v-else><b-col><p>Register or Login to submit content</p></b-col></b-row>
    <hr>
    <b-row><b-col><p>Results: <b-button @click="limit = 10" class="mx-1">10</b-button><b-button @click="limit = 25" class="mx-1">25</b-button><b-button @click="limit = 50" class="mx-1">50</b-button><b-button @click="limit = 75" class="mx-1">75</b-button><b-button @click="limit = 100" class="mx-1">100</b-button></p></b-col></b-row>
    <hr>
    <!-- <b-row class="my-3" align-h="center" v-if="posts">
      <b-col v-if="posts.docs.length">
        <p>Posts</p>
        <Post v-for="post of posts.docs" :key="post._id" class="rowcol" @sendReply="matchPost" @sendInterest="matchPost" :post="post"/>
        <b-pagination v-model="page" :total-rows="posts.total" :per-page="limit" align="fill"></b-pagination>
      </b-col>
      <b-col v-else><p>no posts yet on the chain</p></b-col>
    </b-row>
    <b-row v-else>
      <b-col>
        <p>no posts yet</p>
      </b-col>
    </b-row> -->
    <b-row class="my-3" align-h="center">
      <b-col v-if="posts.popular">
        <b-row>
          <b-col v-if="posts.popular.docs.length">
            <p>Popular</p>
            <Post v-for="post of posts.popular.docs" :key="post._id" class="rowcol mx-5 my-5" @sendReply="matchPost" :post="post" @sendInterest="matchPost" :type="'popular'" @mine="mine" :mining="mining"/>
            <b-pagination v-model="popularPage" :total-rows="posts.popular.total" :per-page="limit" align="fill"></b-pagination>
          </b-col>
          <b-col v-else><p>no popular posts yet</p></b-col>
        </b-row>
      </b-col>
      <b-col v-if="posts.new">
        <b-row>
          <b-col v-if="posts.new.docs.length">
            <p>New</p>
            <Post v-for="post of posts.new.docs" :key="post._id" class="rowcol mx-5 my-5" @sendReply="matchPost" :post="post" @sendInterest="matchPost" :type="'new'" @mine="mine" :mining="mining"/>
            <b-pagination v-model="newPage" :total-rows="posts.new.total" :per-page="limit" align="fill"></b-pagination>
          </b-col>
          <b-col v-else><p>no new posts yet</p></b-col>
        </b-row>
      </b-col>
      <b-col v-if="posts.updated">
        <b-row>
          <b-col v-if="posts.updated.docs.length">
            <p>Updated</p>
            <Post v-for="post of posts.updated.docs" :key="post._id" class="rowcol mx-5 my-5" @sendReply="matchPost" :post="post" @sendInterest="matchPost" :type="'updated'" @mine="mine" :mining="mining"/>
            <b-pagination v-model="updatedPage" :total-rows="posts.updated.total" :per-page="limit" align="fill"></b-pagination>
          </b-col>
          <b-col v-else><p>no updated posts yet</p></b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import SendCategoryPost from '../components/SendCategoryPost.vue'
import Post from '../components/Post.vue'
// @ is an alias to /src
import axios from 'axios'
export default {
  name: 'category',
  data(){
    return {
      category: this.$route.params.category,
      posts: {new: null, updated: null, popular: null},
      newPage: 1,
      updatedPage: 1,
      popularPage: 1,
      // tog: false,
      limit: 25,
      data: null
    }
  },
  created(){
    if(this.category.length > 25){
        this.$router.replace('/');
    }
    this.getData();
    this.getPosts();
  },
  watch: {
      '$route.params.category'(){
        this.category = this.$route.params.category;
        this.getPosts();
      },
    limit(){
      this.getPosts();
    },
    newPage(){
      this.getNewPosts();
    },
    updatedPage(){
      this.getUpdatedPosts();
    },
    popularPage(){
      this.getPopularPosts();
    }
  },
  components: {
    Post,
    SendCategoryPost
  },
  props: ['mining'],
  methods: {
    mine(e){
        this.$emit('mine', e);
    },
    getPosts(){
      this.getNewPosts();
      this.getUpdatedPosts();
      this.getPopularPosts();
    },
    matchPost(data){
      if(data.type === 'new'){
        for(let i = 0;i < this.posts.new.docs.length;i++){
          if(data.post._id === this.posts.new.docs[i]._id){
            // this.posts[i] = data;
            this.posts.new.docs[i].replies = data.post.replies;
            this.posts.new.docs[i].interests = data.post.interests;
            return true;
          }
        }
      } else if(data.type === 'updated'){
        for(let i = 0;i < this.posts.updated.docs.length;i++){
          if(data.post._id === this.posts.updated.docs[i]._id){
            // this.posts[i] = data;
            this.posts.updated.docs[i].replies = data.post.replies;
            this.posts.updated.docs[i].interests = data.post.interests;
            return true;
          }
        }
      } else if(data.type === 'popular'){
        for(let i = 0;i < this.posts.popular.docs.length;i++){
          if(data.post._id === this.posts.popular.docs[i]._id){
            // this.posts[i] = data;
            this.posts.popular.docs[i].replies = data.post.replies;
            this.posts.popular.docs[i].interests = data.post.interests;
            return true;
          }
        }
      }
    },
    getNewPosts(){
      axios.get(this.$store.getters.randomServer + '/data/category/new/' + this.category + '/' + this.newPage + '/' + this.limit).then(res => {
        console.log(res);
        this.posts.new = res.data;
      }).catch(error => {console.log(error);});
    },
    getPopularPosts(){
      axios.get(this.$store.getters.randomServer + '/data/category/popular/'+ this.category + '/' + this.popularPage + '/' + this.limit).then(res => {
        console.log(res);
        this.posts.popular = res.data;
      }).catch(error => {console.log(error);});
    },
    getUpdatedPosts(){
      axios.get(this.$store.getters.randomServer + '/data/category/updated/'+ this.category + '/' + this.updatedPage + '/' + this.limit).then(res => {
        console.log(res);
        this.posts.updated = res.data;
      }).catch(error => {console.log(error);});
    },
    getData(){
      axios.get(this.$store.getters.randomServer + '/data/category/upsert/' + this.category).then(res => {
        this.data = res.data;
      }).catch(error => {
        console.log(error);
      });
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
