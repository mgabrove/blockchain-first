<template>
  <div id="uploadOuter">
    <div style="display: flex; flex-direction: column;">
      <div id="upload">
        <div>
          <h1>Upload your issue here.</h1>
          <form class="margin-sm" @submit.stop.prevent="handleSubmit">
            <div class="border-style">
              <b-form-file plain @change="captureFile" accept="image/*,video/*"/>
            </div>
            <b-form-textarea v-model="title" placeholder="Add issue title" :rows="1" :max-rows="1" class="margin-xs"/>
            <b-form-textarea v-model="caption" placeholder="Add issue description" :rows="3" :max-rows="6" class="margin-xs"/>
            <div style="margin-top:15px;">
              <b-button style="display:inline-block;margin-right:10px;margin-top:0px;" 
              class="margin-xs" variant="secondary" @click="handleOk">Upload</b-button>
              <div v-if="uploadFinished === 1" style="display:inline-block;font-size:20px;">
                <p style="color:lightgreen;">Issue submission uploaded.</p>
              </div>
              <div v-if="uploadFinished === 0" style="display:inline-block;font-size:20px;">
                <p style="color:red;">Issue submission uploading.</p>
              </div>
            </div>
          </form>
        </div>
        <div style="margin-top:10px;margin-bottom:80px;">
              <b-card class="offset-2 col-8" v-show="viewingVideo===0" border-variant="secondary">
                <img style="max-width:100%;height:auto;" v-bind:src="imgPreview"/> 
              </b-card>
              <b-card class="offset-2 col-8" v-show="viewingVideo===1" border-variant="secondary">
                <video style="max-width:100%;height:auto;" v-bind:src="imgPreview" controls/> 
              </b-card>
            </div>
      </div>
   </div>
  </div>
</template>

<script>
import ipfs from './ipfs';

export default {
  name: 'Upload',
  data() {
    return {
      buffer: '',
      caption: '',
      title: '',
      imgPreview: '',
      viewingVideo: 2,
      uploadFinished: 2,
    };
  },
  methods: {
    //provjera radi li se o video formatu ili slici
    checkVideo(file) {
      var video = document.createElement("video");
      video.setAttribute("src", file);
      video.addEventListener("canplay", () => {
        this.viewingVideo = 1;
      });
      video.addEventListener("error", () => {
        this.viewingVideo = 0;
      });
    },
    //hvata medij i priprema za slanje
    captureFile(file) {
      const filePreview = file.target.files[0];
      this.imgPreview = URL.createObjectURL(filePreview);
      const reader = new FileReader();
      if (typeof file !== 'undefined') {
        reader.readAsArrayBuffer(file.target.files[0]);
        reader.onloadend = async () => {
          this.buffer = await this.convertToBuffer(reader.result);
        };
      } else this.buffer = '';
      this.checkVideo(this.imgPreview)
    },
    //prebacuje ArrayBuffer u Buffer za uploadanje na IPFS
    async convertToBuffer(reader) {
      return Buffer.from(reader);
    },
    //tekst i medij šalju se na IPFS, preuzmimaju se hashevi i pohrane se u ugovor sa sendHash()
    onSubmit() {
      this.uploadFinished = 0;
      let imgHash;
      let titleHashOut;
      ipfs.add(this.buffer).then((hashedImg) => {
        imgHash = hashedImg.path;
        return (this.convertToBuffer(this.title));
      }).then((bufferTitle) => ipfs.add(bufferTitle).then((hashedTitle) => (hashedTitle.path))).then((titleHash) => {
          titleHashOut = titleHash;
          return (this.convertToBuffer(this.caption));
          }).then((bufferText) => ipfs.add(bufferText).then((hashedText) => (hashedText.path))).then((textHash) => {
            this.$root.contract.methods
            .sendHash(imgHash, textHash, titleHashOut)
            .send({ from: this.$root.currentAccount, gas: 1000000 }, 
              (error, transactionHash) => {
                console.log(error)  
                console.log(transactionHash)
                this.uploadFinished = 1;
                if (typeof transactionHash !== 'undefined') {
                  this.$root.contract.once('NewPost',
                      () => {
                        this.$root.getPosts();
                    });
                }
          }
        )
      })
    },
    //provjera popunjenosti svih formi
    handleOk() {
      if (!this.buffer || !this.caption || !this.title) {
        alert('Please fill in the information.');
      } else {
        this.onSubmit();
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