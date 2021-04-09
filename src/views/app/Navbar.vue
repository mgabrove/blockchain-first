<template>
    <div id="nav" class="col-12">
      <div class="stupanj">
        <!---<b-button id="tooltip-button-interactive" variant="null" class="shadow-none"><img :src="require('@/assets/img/upitnik.png')"></b-button>--->
        <b-tooltip v-if="this.$route.name === 'Login'" target="tooltip-button-interactive">Unesite vaš OIB i lozinku koju ste dobili porukom.<br><br>Za bilo koji problem obratite se na: pomoc-upis@unipu.hr</b-tooltip>
        <b-tooltip v-else-if="$store.state.acceptedEnrollment === null" target="tooltip-button-interactive">Provjerite prikazane podatke i nastavite ili zaustavite upis.<br><br>Za bilo koji problem obratite se na: pomoc-upis@unipu.hr</b-tooltip>
        <b-tooltip v-else-if="$store.state.acceptedEnrollment === false" target="tooltip-button-interactive">Upis zaustavljen!<br><br>Za bilo koji problem obratite se na: pomoc-upis@unipu.hr</b-tooltip>
        <b-tooltip v-else-if="$store.state.acceptedEnrollment === true && $store.state.canDownloadBill === true" target="tooltip-button-interactive">Izvršite uplatu skeniranjem barkoda ili na podatke sa "Podaci za uplatu".<br><br>Za bilo koji problem obratite se na: pomoc-upis@unipu.hr</b-tooltip>
        <b-tooltip v-else-if="$store.state.acceptedEnrollment === true && $store.state.canDownloadAAI === true" target="tooltip-button-interactive">Skinite AAI identitet dokument te pratite upute u njemu.<br><br>Za bilo koji problem obratite se na: pomoc-upis@unipu.hr</b-tooltip>
      </div>
      <div style="margin-top:1rem;"> <p> Issue submission platform </p> </div>
      <!---<img :src="require('@/assets/img/logo.png')" contain class="logo logo-visibility"/>
      <img :src="require('@/assets/img/logo-SM.png')" contain class="logo logo-visibility-sm"/>--->
      <!---<button v-if="this.$route.name !== 'Login'" @click="destroyToken" class="logout btn-close">Odjava</button>--->
    </div>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    destroyToken () {
      this.$store.dispatch('logoutProcedure')
      .catch(err => {
        console.log(err)
      })
    }
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
