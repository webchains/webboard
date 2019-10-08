<template>
    <b-row align-h="center" class="my-3">
      <b-col>
          <b-form @submit.prevent="onSubmit">
            <b-form-file v-model="media" class="my-1"></b-form-file>
            <b-form-textarea v-model="text" placeholder="type your post" class="my-1"></b-form-textarea>
            <b-button type="submit" class="my-1">submit</b-button>
          </b-form>
          <p v-if="feedback">{{feedback}}</p>
      </b-col>
    </b-row>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Reply',
    data(){
        return {
            text: '',
            media: '',
            feedback: null,
            servers: this.$store.getters.servers
        }
    },
    props: ['post'],
    methods: {
    onSubmit(){
        if(!this.text && !this.media){
            this.feedback = 'something is empty or incorrect';
            setTimeout(() => {this.feedback = null;}, 3000);
        } else {
            let bodyFormData = new FormData();
            bodyFormData.append('main', this.$store.getters.user.privateUser);
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
        axios.post(this.servers + '/replies/' + this.post._id, data).then(res => {
            this.text = '';
            this.media = '';
            this.category = '';
            this.feedback = 'post was submitted';
            setTimeout(() => {this.feedback = null;}, 3000);
            this.$emit('reply', this.post._id);
        }).catch(error => {
            console.log(error);
            this.feedback = 'error while submitting post, try again later';
            setTimeout(() => {this.feedback = null;}, 3000);
        });
    }
    }
}
</script>