<template>
    <div v-if="$store.state.render" class="margin-top-120">
        <vue-headful
            :title="'Upisi na UniPu - ' + $store.state.name + ' ' + $store.state.surname"
            :description="this.title"
        />
    <div>  
        <div class="btn-group" role="group" aria-label="Basic example">
            <button v-bind:disabled='$store.state.personal === false'
            class="btn btn-primary shadow-none" style="background-color:#232323; border-color:#232323; width:100px;" 
            @click="changeState(false)"
            >Listing</button>
            <button v-bind:disabled='$store.state.personal === true'
            class="btn btn-primary shadow-none" style="background-color:#232323; border-color:#232323; width:100px;" 
            @click="changeState(true)"
            >Upload</button>
        </div>
        <Upload v-if="$store.state.personal === true"/>
        <Listing style="margin-top:30px;" v-if="$store.state.personal != true"/>
    </div>
    </div>
</template>

<script>
import Upload from '@/views/upload/Upload.vue'
import Listing from '@/views/listing/Listing.vue'

export default {
    components: {
        Listing,
        Upload
    },
    data () {
        return {
            title: ''
        };
    },
    created () {
        this.$store.dispatch('retrieveInfo')
    },
    methods: {
        changeState(state) {
            console.log(this.$store.state.personal)
            this.$store.dispatch('changeState', {
                flag: state
            })
        }
    }
};
</script>