<template>
    <div id="nav" class="col-12">
      <div class="navIcon">
        <b-button id="tooltip-button-interactive" variant="null" class="shadow-none"><img style="max-width:50px;height:auto;" :src="require('@/assets/logo.png')"></b-button>
        <b-tooltip target="tooltip-button-interactive">Blockchain web app for submitting issues.<br></b-tooltip>
      </div>
      <div style="margin-top:1rem;"><p>Issue Submission Platform</p></div>
    </div>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
  },
}
</script>

<style src='@/assets/styles/pagestyles.css' scoped>
  .sticky { 
    position: fixed;
    top: 0;
    width: 100%;
  }
</style>
