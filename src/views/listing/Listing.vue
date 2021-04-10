<template>
    <div class="col-12" style="margin-bottom:100px;">
        <div>
            <SingleContract v-for="contr in this.$root.currentPosts" :key="contr.id" 
            :contr="contr" style="background: gray;"/>
        </div>
    </div>
</template>

<script>
import SingleContract from "@/views/listing/SingleContract"

export default {
    components: {
        SingleContract
    }
}
</script>