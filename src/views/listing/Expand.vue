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
            {{this.contr.caption}}
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
      }
    },
  methods: {
    close() {
      this.$emit('close')
    },
  },
};
</script>