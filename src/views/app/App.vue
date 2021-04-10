<template>
  <div id="app" style="min-height:100vh;">
    <Navbar style="position:fixed; top:0; z-index:1;"/>
    <router-view/>
    <Footer style="position:fixed; bottom:0; z-index:1;"/>
  </div>
</template>

<script>
import Navbar from '@/views/app/Navbar'
import Footer from '@/views/app/Footer'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  },
}
</script>

<style src='@/assets/styles/pagestyles.css'></style>