<template>
    <b-container>
        <b-row align-h="center">
            <b-col>
                <h1>Login</h1>
            </b-col>
        </b-row>
        <b-row align-h="center">
            <b-col>
                <b-form @submit.prevent="onSubmit">
                    <b-form-input v-model="main" placeholder="type or paste private key here"></b-form-input>
                    <b-button type="submit" class="my-2">submit</b-button>
                </b-form>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import {ec} from 'elliptic'
export default {
    name: 'login',
    data(){
        return {
            main: ''
        }
    },
    methods: {
        onSubmit(){
            if(this.main){
                let user = new ec('secp256k1').keyFromPrivate(this.main, 'hex');
                let publicUser = user.getPublic('hex');
                let privateUser = user.getPrivate('hex');
                let userData = {publicUser, privateUser};
                localStorage.setItem('privateUser', privateUser);
                localStorage.setItem('publicUser', publicUser);
                // const expirationDate = new Date(new Date().getTime() + 86400 * 1000);
                // localStorage.setItem('expiresIn', expirationDate);
                // this.$store.dispatch('actionLogin', {publicUser: userData.publicUser, privateUser: userData.privateUser, expirationTime: 86400});
                this.$store.dispatch('actionLogin', {publicUser: userData.publicUser, privateUser: userData.privateUser});
                this.main = '';
                this.$router.replace('/');
            }
        }
    }
}
</script>
