<template>
    <div id="nav" class="col-12">
      <div class="stupanj">
        <b-button id="tooltip-button-interactive" variant="null" class="shadow-none"><img :src="require('@/assets/logo.png')"></b-button>
        <b-tooltip target="tooltip-button-interactive">Blockchain web app for submitting issues.<br></b-tooltip>
      </div>
      <div style="margin-top:1rem;"> <p> Issue Submission Platform </p> </div>
      <!---<img :src="require('@/assets/img/logo.png')" contain class="logo logo-visibility"/>
      <img :src="require('@/assets/img/logo-SM.png')" contain class="logo logo-visibility-sm"/>--->
      <!---<button v-if="this.$route.name !== 'Login'" @click="destroyToken" class="logout btn-close">Odjava</button>--->
    </div>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
  },
}
</script>

<style scoped>
  .sticky { 
    position: fixed;
    top: 0;
    width: 100%;
  }
</style>
