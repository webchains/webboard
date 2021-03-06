import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    publicUser: null,
    privateUser: null,
    servers: process.env.VUE_APP_SERVERS.includes(',') ? process.env.VUE_APP_SERVERS.split(',') : [process.env.VUE_APP_SERVERS],
    server: process.env.VUE_APP_SERVER,
    node: process.env.VUE_APP_NODE,
    stamp: process.env.VUE_APP_STAMP,
    site: process.env.VUE_APP_SITE,
    nodes: process.env.VUE_APP_NODES.includes(',') ? process.env.VUE_APP_NODES.split(',') : [process.env.VUE_APP_NODES]
  },
  getters: {
    user(state){
      return {privateUser: state.privateUser, publicUser: state.publicUser};
    },
    isAuth(state){
      return state.publicUser !== null && state.privateUser !== null;
    },
    site(state){
      return state.site;
    },
    randomServer(state){
      return state.servers[Math.floor(Math.random() * state.servers.length)];
    },
    stamp(state){
      return state.stamp;
    },
    server(state){
      return state.server;
    },
    node(state){
      return state.node;
    },
    randomNode(state){
      return state.nodes[Math.floor(Math.random() * state.nodes.length)];
    }
  },
  mutations: {
    mutationLogin(state, payload){
      state.privateUser = payload.privateUser;
      state.publicUser = payload.publicUser;
    },
    clearAuth(state, payload){
      state.publicUser = null;
      state.privateUser = null;
    },
    startConnections(state, payload){
      state.appServer = payload.server;
      state.appNode = payload.node;
    },
    mutationMine(state, payload){
      state.mining = payload;
    }
  },
  actions: {
    startConnections(context){
      let servers = context.state.servers;
      let server = servers[Math.floor(Math.random() * servers.length)];
      let nodes = context.state.nodes;
      let node = nodes[Math.floor(Math.random() * nodes.length)];
      context.commit('startConnections', {server, node});
    },
    clearUser(context){
      context.commit('clearAuth');
      localStorage.clear();
      // router.replace('/');
    },
    // expireLogout(context, expiration){
    //   setTimeout(() => {
    //       context.commit('clearAuth');
    //   }, expiration * 1000);
    // },
    autoLogin(context){
      const publicUser = localStorage.getItem('publicUser');
      const privateUser = localStorage.getItem('privateUser');
      // if(!publicUser || !privateUser){
      //     return
      // }
      // const expiresIn = localStorage.getItem('expiresIn');
      // const now = new Date();
      // if(now >= expiresIn){
      //     return
      // }
      // context.commit('mutationLogin', {
      //   publicUser, privateUser
      // });
      if(publicUser && privateUser){
        context.commit('mutationLogin', {
          publicUser, privateUser
        });
      }
    },
    actionLogin(context, payload){
      let publicUser = payload.publicUser;
      let privateUser = payload.privateUser;
      // let expiresIn = payload.expirationTime;
      context.commit('mutationLogin', { publicUser, privateUser });
      // context.dispatch('expireLogout', expiresIn);
    }
  }
})
