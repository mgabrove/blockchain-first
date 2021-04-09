import Vue from 'vue'
import App from './views/app/App.vue'
import store from './store'
import router from './router'
import vueHeadful from 'vue-headful'
import { BootstrapVue } from 'bootstrap-vue'

import Web3 from 'web3';
//Web3 = require('web3')
var web3 = new Web3('ws://localhost:8545')

//import contract from './contracts/contractInstance';
//import web3 from './contracts/web3';

import  contract  from  "./contracts/contractInstance"

console.log(contract);

//import ipfsStorage from "./views/upload/IPFSStorage"

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.component('vue-headful', vueHeadful)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  contract,
  //ipfsStorage,
  data: {
    currentAccount: '',
    contract,
    currentPosts: [],
  },
  methods: {
    /**
     * gets current account on web3 and
     * store it on currentAccount variable.
     */
    
    async updateAccount() {
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];
      console.log("ACCOUNT: "+account)
      this.currentAccount = account;
    },
    /**
     * using the Smart Contract instance:
     * getCounter() - gets the length of total posts
     * getHash() - gets the image & text hashes using an index
     *
     * index is from the iteration of the retrieved total
     * post count. every loop gets the hashes and fetches
     * text & image using the IPFS gateway URL.
     */
    async getPosts() {
      const posts = [];
      const counter = await contract.methods.getCounter().call({
        from: this.currentAccount,
      });

      if (counter !== null) {
        const hashes = [];
        const captions = [];
        for (let i = counter; i >= 1; i -= 1) {
          hashes.push(contract.methods.getHash(i).call({
            from: this.currentAccount,
          }));
        }

        const postHashes = await Promise.all(hashes);

        for (let i = 0; i < postHashes.length; i += 1) {
          captions.push(fetch(`https://gateway.ipfs.io/ipfs/${postHashes[i].text}`)
            .then(res => res.text()));
        }

        const postCaptions = await Promise.all(captions);

        for (let i = 0; i < postHashes.length; i += 1) {
          posts.push({
            id: i,
            key: `key${i}`,
            caption: postCaptions[i],
            src: `https://gateway.ipfs.io/ipfs/${postHashes[i].img}`,
          });
        }

        console.log(posts)

        this.currentPosts = posts;
      }
    },
  },
  async created() {
    await this.updateAccount();
    console.log(web3.eth.getBalance(this.currentAccount));
    console.log(web3.eth.estimateGas({from: this.currentAccount}));
    await this.getPosts();
  },

  render: h => h(App)
}).$mount('#app')
