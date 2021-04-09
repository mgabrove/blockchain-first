<template>
  <div id="uploadOuter">
    <div style="display: flex; flex-direction: column;">
      <!-- Upload Interface -->
      <div id="upload">
        <div>
          <h1>Upload your media here.</h1>

          <!-- Form for file choose, caption text and submission -->
          <form
            class="margin-sm"
            @submit.stop.prevent="handleSubmit"
          >
            <div class="border-style">
              <b-form-file
                plain
                @change="captureFile"
                accept="image/*,video/*"
              />
            </div>
            <b-form-textarea
              v-model="caption"
              placeholder="Post description"
              :rows="3"
              :max-rows="6"
              class="margin-xs"
            />
            <b-button
              class="margin-xs"
              variant="secondary"
              @click="handleOk"
            >
              Upload
            </b-button>
          </form>
        </div>
        <div
          v-if="this.$root.$data.loading === true"
          style="margin-top: 10%; margin-bottom: 5%"
        >
          <img
            class="upload-load"
            src="https://media.giphy.com/media/2A6xoqXc9qML9gzBUE/giphy.gif"
          >
        </div>
      </div>
   </div>
          <b-card
            border-variant="secondary"
            :img-src="imgPath"
          >
            <!---<p class="home-card-text">
              {{ item.caption }}
            </p>--->
          </b-card>
  </div>
</template>

<script>
import ipfs from './ipfs';

export default {
  name: 'Upload',
  // data variables
  data() {
    return {
      buffer: '',
      caption: '',
      imgPath: '',

    };
  },
  methods: {
    /* used to catch chosen image &
     * convert it to ArrayBuffer.
     */
    
    captureFile(file) {
      const reader = new FileReader();
      if (typeof file !== 'undefined') {
        reader.readAsArrayBuffer(file.target.files[0]);
        reader.onloadend = async () => {
          this.buffer = await this.convertToBuffer(reader.result);
        };
      } else this.buffer = '';
    },
    /**
     * converts ArrayBuffer to
     * Buffer for IPFS upload.
     */
    async convertToBuffer(reader) {
      return Buffer.from(reader);
    },
    /**
     * submits buffered image & text to IPFS
     * and retrieves the hashes, then store
     * it in the Contract via sendHash().
     */
    onSubmit() {
      let imgHash;

      ipfs.add(this.buffer).then((hashedImg) => {
        imgHash = hashedImg.path;
        this.imgPath = `https://gateway.ipfs.io/ipfs/${imgHash}`;
        return this.convertToBuffer(this.caption);
      }).then(bufferDesc => ipfs.add(bufferDesc).then(hashedText => hashedText.path)).then((textHash) => {
        this.$root.contract.methods
        .sendHash(imgHash, textHash)
        .send({ from: this.$root.currentAccount, gas: 1000000 }, 
          (error, transactionHash) => {
            console.log(error)  
            console.log(transactionHash)
            if (typeof transactionHash !== 'undefined') {
              this.$root.contract.once('NewPost',
                  () => {
                    console.log("SAD GETTAMO")
                    this.$root.getPosts();
                    alert('Operation Finished! Refetching...');
                });
            } else this.$root.loading = false;
          }
        )
      })
    },
    /**
     * validates if image & captions
     * are filled before submission.
     */
    handleOk() {
      if (!this.buffer || !this.caption) {
        alert('Please fill in the information.');
      } else {
        this.onSubmit();
        console.log("SUCCESS")
      }
    },
  },
};
</script>

<style>
  #uploadOuter {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    display: flex;
    justify-content: center;
    color: #2c3e50;
    margin-top: 3%;
  }
  .home-load {
    width: 50px;
    height: 50px;
  }
  .card img {
    object-fit: cover;
    height: 500px;
    width: 500px;
  }
  .card {
    text-align: left;
    width: 500px;
    margin-bottom: 20px;
  }
  .home-list{
    padding: 0;
    list-style: none;
  }
  .home-card-text {
    text-align: justify;
    margin-top: 10px;
  }
  #upload {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-bottom: 5%;
    width: 500px;
  }
  .upload-load {
    width: 50px;
    height: 50px;
  }
  .margin-xs {
    margin-top: 3%;
  }
  .margin-sm {
    margin-top: 7%;
  }
  .border-style {
    border: 1px solid #ced4da;
  }
</style>