<template>
  <b-navbar toggleable="lg" type="light" variant="light">
    <b-navbar-brand :to="{name: 'index'}">{{site}}</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <!-- <b-nav-item v-if="$store.getters.isAuth" :to="{name: 'wallet'}">Wallet</b-nav-item> -->
        <b-nav-item :to="{name: 'profile'}" v-if="$store.getters.isAuth">Profile</b-nav-item>
        <b-nav-item :to="{name: 'categories'}">Categories</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-text v-if="mining">MINING</b-nav-text>
        <b-nav-text v-else>NOT MINING</b-nav-text>
        <b-nav-item v-if="$store.getters.isAuth" @click="$store.dispatch('clearUser')">Logout</b-nav-item>
        <b-nav-item :to="{name: 'register'}" v-if="!$store.getters.isAuth">Register</b-nav-item>
        <b-nav-item :to="{name: 'login'}" v-if="!$store.getters.isAuth">Login</b-nav-item>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
    name: 'Nav',
    data(){
      return {
        site: this.$store.getters.site
      }
    },
    props: ['mining'],
    watch: {
      mining(data){
        if(data){
          this.message = 'mining';
        } else {
          this.message = 'not mining';
        }
      }
    }
}
</script>

<style scoped>
#navText {
  color: black;
}
</style>
