<template>
    <div class="margin-top-120">
        <vue-headful :title="'ISP'" :description="this.title"/>
    <div>  
        <div class="btn-group" role="group" aria-label="Basic example">
            <button v-bind:disabled="this.upload === false"
            class="btn btn-primary shadow-none" style="background-color:#232323; border-color:#232323; width:100px;" 
            @click="changeState()">Listing</button>
            
            <button v-bind:disabled="this.upload === true"
            class="btn btn-primary shadow-none" style="background-color:#232323; border-color:#232323; width:100px;" 
            @click="changeState()">Upload</button>
        </div>
        <Upload v-if="this.upload === true"/>
        <Listing style="margin-top:30px;" v-if="this.upload === false"/>
    </div>
    </div>
</template>

<script>
import Upload from '@/views/upload/Upload.vue'
import Listing from '@/views/listing/Listing.vue'

export default {
    components: {
        Listing,
        Upload,
    },
    data () {
        return {
            title: '',
            upload: false,
        };
    },
    created () {
    },
    methods: {
        //promjena sa uploada i listinga te suprotno, update prikazanih submissiona
        async changeState() {
            if(this.upload === true) {
                await this.$root.getPosts();
                this.upload = false;
            } else {
                this.upload = true;
            }
        }
    }
};
</script>