<template>
    <div id="footer" class="col-12">
      <!---<img :src="require('@/assets/img/fipu-lab.png')" contain class="fipu-lab"/>
      <img :src="require('@/assets/img/sric.png')" contain class="fipu-lab"/>
      <img :src="require('@/assets/img/infobip.png')" contain class="infobip"/>--->
      <div style="margin:1rem;"> <p> made by: Gabrovec Marko, Vedran Nejedly </p> </div>
    </div>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style scoped>
  .sticky { 
    position: fixed;
    bottom: 0;
    width: 100%;
  }
</style>