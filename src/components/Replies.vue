<template>
    <b-row>
        <b-col>
            <b-row>
              <b-col>
                <p class="mainAddress">from: {{reply.user}}</p>
              </b-col>
            </b-row>
            <!-- <p>media: <a :href="nodes + '/files/' + reply.media">{{reply.media}}</a></p> -->
            <b-row v-if="reply.text">
                <b-col v-if="$route.name !== 'post'">
                    <read-more more-str="read more" :text="reply.text" link="#" less-str="read less" :max-chars="280"></read-more>
                </b-col>
                <b-col v-else>
                    <p>{{reply.text}}</p>
                </b-col>
            </b-row>
            <b-row v-if="reply.media">
                <b-col>
                    <img :src="$store.getters.randomServer + '/files/' + reply.media" :alt="reply.media" v-if="/\.(jpe?g|png|gif|bmp|webp)$/i.test(reply.media)" class="mediaSize">
                    <video v-else-if="/\.(ogg|webm|3gp|flv|mp4)$/i.test(reply.media)" :src="$store.getters.randomServer + '/files/' + reply.media" controls class="mediaSize"></video>
                    <audio v-else-if="/\.(mp3|aac|wma|wav|flac)$/i.test(reply.media)" :src="$store.getters.randomServer + '/files/' + reply.media" controls class="mediaSize"></audio>
                    <p v-else class="actual">media: <a :href="$store.getters.randomServer + '/files/' + reply.media">{{reply.media}}</a></p>
                </b-col>
            </b-row>
            <b-row>
              <b-col>
                <p><b-button :active="!mining" @click="mainMine(reply.user)" v-if="$store.getters.isAuth && $store.getters.user.publicUser !== reply.user">Mine</b-button></p>
              </b-col>
            </b-row>
        </b-col>
    </b-row>
</template>

<script>
export default {
    name: 'replies',
    props: ['reply', 'mining'],
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