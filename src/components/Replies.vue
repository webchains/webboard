<template>
    <b-row>
        <b-col>
            <p class="mainAddress">from: <span @click="short = !short" v-if="short">{{address.substring(0, 15)}}...click to see</span><span @click="short = !short" v-else>{{address}}</span></p>
            <p>{{reply}}</p>
            <b-button :active="!mining" @click="mainMine(address)" v-if="$store.getters.isAuth && $store.getters.user.publicUser !== address" >Mine</b-button>
        </b-col>
    </b-row>
</template>

<script>
export default {
    name: 'replies',
    props: ['address', 'reply', 'mining'],
    data(){
        return {
            short: true
        }
    },
    methods: {
        mainMine(e){
            // if(e !== this.$store.getters.user.publicUser){
                this.$emit('mine', e);
            // } else {
            //     console.log('can not mine you');
            // }
        }
    }
}
</script>

<style>
/* .mainHead {
  font-size: 24px;
}
.reward {
  font-size: 10px;
}
.mainAddress {
  font-size: 8px;
}
.rowcol {
  border: 2px solid black;
}
.actual {
  font-size: 20px;
}
.mediaSize {
  max-width: 100%;
  max-height: 100%;
} */
</style>