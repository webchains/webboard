<template>
  <b-container>
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
        <p>count: {{data.count}} | hits: {{data.hit}}</p>
      </b-col>
    </b-row>
    <b-row align-h="center" class="my-3" v-if="$store.getters.isAuth">
      <b-col>
        <SendCategoryPost :category="category" @sendCategoryPost="madePost"/>
      </b-col>
    </b-row>
    <b-row v-else><b-col><p>Register or Login to submit content</p></b-col></b-row>
    <hr>
    <b-row><b-col><p>Results: <b-button @click="limit = 10" class="mx-1">10</b-button><b-button @click="limit = 25" class="mx-1">25</b-button><b-button @click="limit = 50" class="mx-1">50</b-button><b-button @click="limit = 75" class="mx-1">75</b-button><b-button @click="limit = 100" class="mx-1">100</b-button></p></b-col></b-row>
    <hr>
    <b-row class="my-3" align-h="center" v-if="posts">
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
      posts: null,
      page: 1,
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
    page(){
      this.getPosts();
    }
  },
  components: {
    Post,
    SendCategoryPost
  },
  methods: {
    madePost(){
        this.getPosts();
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
    },
    getPosts(){
      axios.get(this.$store.getters.randomServer + '/categories/' + this.category + '/' + this.page + '/' + this.limit).then(res => {
        this.posts = res.data;
      }).catch(error => {console.log(error);});
    },
    getData(){
      axios.get(this.$store.getters.randomServer + '/data/category/' + this.category).then(res => {
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
