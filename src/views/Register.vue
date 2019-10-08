<template>
    <b-container>
        <b-row align-h="center">
            <b-col>
                <h1>Register</h1>
            </b-col>
        </b-row>
        <b-row align-h="center" v-if="user">
            <b-col>
                <p class="mainReg">public:{{user.publicUser}}</p>
                <p class="mainReg">private:{{user.privateUser}}</p>
                <p>write these down, or copy it</p>
                <p>you will automatically logged in when you click away from this page</p>
                <p>you will be redirected to the home page in 10 minutes, you can also click the button below</p>
                <p><b-button :to="{name: 'index'}">Homepage</b-button></p>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import {ec} from 'elliptic'
export default {
    name: 'register',
    data(){
        return {
            user: null
        }
    },
    created(){
        let main = new ec('secp256k1').genKeyPair();
        let publicUser = main.getPublic('hex');
        let privateUser = main.getPrivate('hex');
        this.user = {publicUser, privateUser};
        localStorage.setItem('privateUser', privateUser);
        localStorage.setItem('publicUser', publicUser);
        // const expirationDate = new Date(new Date().getTime() + 86400 * 1000);
        // localStorage.setItem('expiresIn', expirationDate);
        // this.$store.dispatch('actionLogin', {publicUser: this.user.publicUser, privateUser: this.user.privateUser, expirationTime: 86400});
        setTimeout(() => {this.$router.replace('/');}, 600000);
    },
    destroyed(){
        this.$store.dispatch('actionLogin', {publicUser: this.user.publicUser, privateUser: this.user.privateUser});
    }
}
</script>

<style scoped>
.mainReg {
    font-weight: bold;
}
</style>
