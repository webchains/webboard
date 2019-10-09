<template>
    <b-row>
        <b-col>
            <b-form @submit.prevent="onSubmit">
                <b-form-file v-model="media" class="my-1 centerText"></b-form-file>
                <b-form-textarea v-model="text" placeholder="type your post" class="my-1 centerText"></b-form-textarea>
                <b-form-input v-model="category" placeholder="type category here" class=" centerText"></b-form-input>
                <b-button type="submit" class="my-1">submit</b-button>
            </b-form>
            <p v-if="feedback">{{feedback}}</p>
        </b-col>
    </b-row>
</template>

<script>
import axios from 'axios'
export default {
    name: 'sendpost',
    data(){
        return {
            feedback: 'interact',
            text: '',
            media: '',
            category: ''
        }
    },
    methods: {
    onSubmit(){
        if(!this.category || !/\w/.test(this.category) || this.category.length > 25 || !this.text && !this.media){
            this.feedback = 'something is empty or incorrect';
            setTimeout(() => {this.feedback = null;}, 3000);
        } else {
            let bodyFormData = new FormData();
            bodyFormData.append('main', this.$store.getters.user.privateUser);
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
            this.$emit('sendPost');
        }).catch(error => {
            console.log(error);
            this.feedback = 'error while submitting post, try again later';
            setTimeout(() => {this.feedback = null;}, 3000);
        });
    }
    }
}
</script>

<style>

</style>