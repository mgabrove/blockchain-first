<template>
    <div class="modal-backdrop1" style="z-index:1;">
      <div class="modal1 col-4" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
        <header class="modal-header" id="modalTitle">
          <slot name="header">
            {{this.contr.title}}
          </slot>
        </header>
        <section class="modal-body" id="modalDescription">
          <slot name="body">
            <div style="overflow-wrap: break-word;">{{this.contr.caption}}</div>
            <a :href="this.contr.src" target="_blank">
              <p><u>media</u></p>
            </a>
            <div>
              <b-card class="offset-2 col-8" v-if="displayImage===true"
                border-variant="secondary"
              >
              <img style="max-width:100%;height:auto;" v-bind:src="this.contr.src"/> 
                <!---<p class="home-card-text">
                  {{ item.caption }}
                </p>--->
              </b-card>
              <b-card class="offset-2 col-8" v-if="displayImage===false"
                border-variant="secondary"
              >
              <video style="max-width:100%;height:auto;" v-bind:src="this.contr.src" controls/> 
                <!---<p class="home-card-text">
                  {{ item.caption }}
                </p>--->
              </b-card>
            </div>
          </slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer">
            <button type="button" class="btn-close" @click="close" aria-label="Close modal">Close</button>
          </slot>
        </footer>
      </div>
    </div>
</template>

<script>
export default {
  props: ['contr'],
  name: 'modal',
    data(){
      return{
        displayImage: true,
      }
    },
  methods: {
    close() {
      this.$emit('close')
    },
    changeVideoState(){
      this.displayImage = false;
    }
  },
  created(){
    var video = document.createElement("video");
    video.setAttribute("src", this.contr.src);
    video.addEventListener("canplay", () => {
      this.displayImage = false;
    });
    video.addEventListener("error", () => {
      this.displayImage = true;
    });
  }
};
</script>