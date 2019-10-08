<template>
  <b-container>
    <b-row v-if="summary">
      <b-col>
        <h1>{{summary.name}}</h1>
        <h3>{{summary.about}}</h3>
      </b-col>
    </b-row>
    <b-row>
      <b-col v-if="$store.getters.isAuth">
        <p class="logged">address:{{$store.getters.user.publicUser}}</p>
      </b-col>
    </b-row>
    <b-row class="my-2" v-if="$store.getters.isAuth">
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
    </b-row>
    <b-row align-h="center" class="my-3" v-if="$store.getters.isAuth">
      <b-col>
          <b-form @submit.prevent="onSubmit">
            <b-form-file v-model="media" class="my-1"></b-form-file>
            <b-form-textarea v-model="text" placeholder="type your post" class="my-1"></b-form-textarea>
            <b-input-group prepend="Category" class="mt-3" size="sm">
                <b-form-input v-model="category" placeholder="type category here"></b-form-input>
            </b-input-group>
            <b-button type="submit" class="my-1">submit</b-button>
          </b-form>
          <p v-if="feedback">{{feedback}}</p>
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
import Post from '../components/Post.vue'
// @ is an alias to /src
import axios from 'axios'
export default {
  name: 'panel',
  data(){
    return {
      feedback: 'interact',
      text: '',
      media: '',
      category: '',
      tog: false,
      limit: 25,
      summary: null,
      posts: null,
      page: 1
    }
  },
  created(){
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
    Post
  },
  methods: {
    onSubmit(){
        if(!this.category || !/\w/.test(this.category) || this.category.length > 25 || !this.text && !this.media){
            this.feedback = 'something is empty or incorrect';
            setTimeout(() => {this.feedback = null;}, 3000);
        } else {
            let bodyFormData = new FormData();
            bodyFormData.append('main', this.main);
            bodyFormData.append('category', this.category);
            if(this.text){
                bodyFormData.append('text', this.text);
            }
            if(this.media){
                bodyFormData.append('media', this.media);
            }
            this.sendPost(bodyFormData);
        }
    },
    sendPost(data){
        axios.post(this.$store.getters.randomServer + '/posts', data).then(res => {
            this.text = '';
            this.media = '';
            this.category = '';
            this.feedback = 'post was submitted';
            setTimeout(() => {this.feedback = null;}, 3000);
            this.getPosts();
        }).catch(error => {
            console.log(error);
            this.feedback = 'error while submitting post, try again later';
            setTimeout(() => {this.feedback = null;}, 3000);
        });
    },
    getPosts(){
      axios.get(this.$store.getters.randomServer + '/data/posts/' + this.page + '/' + this.limit).then(res => {
        console.log(res);
        this.posts = res.data;
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
