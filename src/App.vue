<template>
  <div id="app">
    <Nav :mining="mining" @stop="stop"/>
    <router-view @mine="startMine" :mining="mining" :summary="summary" :server="server"/>
    <Stamp/>
  </div>
</template>

<script>
import Nav from './views/Nav.vue'
import Stamp from './views/Stamp.vue'
import axios from 'axios'
import SHA256 from 'crypto-js/sha256'
export default {
  components: {
    Nav,
    Stamp
  },
  data(){
    return {
      mineData: null,
      cores: this.getCores(),
      mining: false,
      summary: null,
      server: null,
      cancel: false
    }
  },
  watch: {
    mineData(val){
      setTimeout(() => {this.getMineData();}, val.expireTime - Date.now());
    }
  },
  methods: {
    stop(){
      this.cancel = true;
    },
    getCores(){
      let cores = navigator.hardwareConcurrency;
      if(cores > 8){
        return 25;
      } else if(cores > 4){
        return 50;
      } else if(cores > 2){
        return 75;
      } else if(cores > 1){
        return 100;
      } else {
        return 250;
      }
    },
    getMineData(){
      axios.get(this.$store.getters.randomNode + '/miner').then(res => {
        this.mineData = res.data;
        // let proof = {address: this.address, timestamp: Date.now(), nonce: 0};
        // proof.hash = SHA256(proof.address + proof.timestamp + proof.nonce).toString();
        // this.hashLoop({proof, difficulty: this.mineData.difficulty});
      }).catch(error => {
        console.log(error);
      });
    },
    startMine(data){
      if(!this.mining){
        this.$store.dispatch('actionStartMine');
        let proof = {address: data, timestamp: Date.now(), nonce: 0};
        proof.hash = SHA256(proof.address + proof.timestamp + proof.nonce).toString();
        this.hashLoop({proof, difficulty: this.mineData.difficulty});
      }
    },
    sleep(data){
      return new Promise(resolve => setTimeout(resolve, data));
    },
    async hashLoop(data){
        let proof = data.proof;
        let difficulty = data.difficulty;
      let i = 0;
      while(!proof.hash.startsWith('0'.repeat(difficulty))){
        if(i % 5 === 0){
          if(this.cancel){
              this.stopMining();
              return false;
            }
          await this.sleep(this.cores);
        }
        proof.nonce++;
        proof.hash = SHA256(proof.address + proof.timestamp + proof.nonce).toString();
        i++;
      }
      this.sendMine(proof);
    },
    sendMine(data){
      axios.post(this.$store.getters.randomNode + '/miner', data).then(res => {
        console.log(res.data);
        // let proof = {address: this.address, timestamp: Date.now(), nonce: 0};
        // proof.hash = SHA256(proof.address + proof.timestamp + proof.nonce).toString();
        // this.hashLoop({proof, difficulty: this.mineData.difficulty});
        this.stopMining();
      }).catch(error => {
        console.log(error.response.data);
        // let proof = {address: this.address, timestamp: Date.now(), nonce: 0};
        // proof.hash = SHA256(proof.address + proof.timestamp + proof.nonce).toString();
        // this.hashLoop({proof, difficulty: this.mineData.difficulty});
        this.stopMining();
      });
    },
    stopMining(){
      this.mining = false;
      this.cancel = false;
    },
    getSummary(){
      axios.get(this.$store.getters.randomServer + '/data').then(res => {
        this.summary = res.data;
      }).catch(error => {
        console.log(error);
      });
    },
    getServer(){
      axios.get(this.$store.getters.randomServer + '/server').then(res => {
        this.server = res.data;
      }).catch(error => {
        console.log(error);
      });
    }
  },
  created(){
    this.$store.dispatch('autoLogin');
    this.$store.dispatch('startConnections');
    this.getMineData();
    this.getSummary();
    this.getServer();
    // this.$store.watch(state => state.mining, data => {this.mining = data;});
  }
}
</script>


<style>
body {
overflow-wrap: break-word;
overflow-wrap: break-all;
word-wrap: break-word;

-ms-word-break: break-all;
/* This is the dangerous one in WebKit, as it breaks things wherever */
/* Instead use this non-standard one: */
word-break: break-word;
}
/* p {
  margin-bottom: 0;
} */
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.postText {
  margin-bottom: 0;
}
.heads {
  font-size: 12px;
}
.bold {
  font-weight: bold;
}
.logged {
  font-size: 12px;
}
.mainHead {
  font-size: 24px;
}
.reward {
  font-size: 7px;
  padding: 0;
  margin: 0;
}
.mainAddress {
  font-size: 8px;
}
.rowcol {
  border: 1px solid black;
}
.actual {
  font-size: 20px;
}
.mediaSize {
  max-width: 100%;
  max-height: 100%;
}
.centerText {
  text-align: center;
}
/* .halfSize {
  width: 50%;
  margin: 0 auto;
} */
/* #nav {
  padding: 30px;
} */
/* #nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
} */
/* .bg-varianttest {
  color: white;
} */
</style>
