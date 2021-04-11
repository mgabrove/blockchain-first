<template>
    <table style="width:90%;margin: 0 auto;margin-bottom:3px;table-layout:fixed;">
        <tr class="dodatak">
            <td class="dodaci" style="width:10%;"><p>{{this.contr.key}}</p></td>
            <td class="dodaci" style="width:10%;"><p>{{this.contr.id}}</p></td>
            <td class="dodaci" style="width:20%;"><p style="overflow:hidden;text-overflow:ellipsis;margin-left:10px;margin-right:10px;white-space:nowrap;">{{this.contr.title.trim()}}</p></td>
            <td class="dodaci" style="width:300px;"><p style="overflow:hidden;text-overflow:ellipsis;margin-left:10px;margin-right:10px;white-space:nowrap;">{{this.contr.caption.trim()}}</p></td>
            <td class="dodaci" style="width:10%;padding:0;"><button @click="showModal">Expand</button></td>
        </tr>
        <Expand :contr="this.contr" v-if="isModalVisible === true" @close="closeModal"/>
    </table>
</template>

<script>
import Expand from '@/views/listing/Expand'

export default {
    props: ['contr'],
    components: {
        Expand
    },
    data(){
        return{
            isModalVisible: false
        }
    },
    methods: {
        showModal() {
            this.isModalVisible = true
        },
        closeModal() {
            this.isModalVisible = false
        },
    },
    computed: {
    }
}
</script>

<style>
    .dodatak{
        border: 1px solid black;
    }
    .dodaci {
        border-right: 1px solid black;
        padding-top: 15px;
    }
</style>