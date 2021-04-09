<template>
    <div class="modal-backdrop1" style="z-index:1;">
      <div class="modal1 col-4" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
        <header class="modal-header" id="modalTitle">
          <slot name="header">
            Podaci o studentu
          </slot>
        </header>
        <section class="modal-body" id="modalDescription">
          <slot name="body">
            Tu nešto...
          </slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer">
            <button type="button" class="btn-close" @click="approve" aria-label="Close modal">Prihvati</button>
            <button type="button" class="btn-close" @click="decline" aria-label="Close modal">Odbij</button>
          </slot>
        </footer>
      </div>
    </div>
</template>

<script>
export default {
  props: ['contractCard'],
  name: 'modal',
    data(){
      return{
      }
    },
  methods: {
    close(broj) {
      this.$emit('close', broj)
    },
    approve() {
      this.close(1)
    },
    decline() {
      this.close(-1)
    }
  },
};
</script>