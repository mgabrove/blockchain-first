import Vue from 'vue'
import App from './views/app/App.vue'
import router from './router'
import vueHeadful from 'vue-headful'
import { BootstrapVue } from 'bootstrap-vue'

import Web3 from 'web3';
var web3 = new Web3('ws://localhost:8545');
import  contract  from  "./contracts/contractInstance"

console.log(contract);

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
  contract,
  data: {
    currentAccount: '',
    contract,
    currentPosts: [],
  },
  methods: {
    //uhvati korisnika sa web3 i pohrani u varijablu currentAccount
    async updateAccount() {
      const accounts = await web3.eth.getAccounts();
      const account = accounts[4];
      this.currentAccount = account;
      console.log("ACCOUNT: "+account)
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
    //
    async getPosts() {
      const posts = [];
      const counter = await contract.methods.getCounter().call({
        from: this.currentAccount,
      });
      if (counter !== null) {
        const hashes = [];
        const captions = [];
        const titles = [];
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
        for (let i = 0; i < postHashes.length; i += 1) {
          titles.push(fetch(`https://gateway.ipfs.io/ipfs/${postHashes[i].title}`)
            .then(res => res.text()));
        }
        const postTitles = await Promise.all(titles);
        const postCaptions = await Promise.all(captions);
        for (let i = 0; i < postHashes.length; i += 1) {
          posts.push({
            id: postHashes.length-i,
            key: `no.${i+1}`,
            caption: postCaptions[i],
            src: `https://gateway.ipfs.io/ipfs/${postHashes[i].img}`,
            title: postTitles[i],
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
    await this.getPosts();
  },

  render: h => h(App)
}).$mount('#app')
