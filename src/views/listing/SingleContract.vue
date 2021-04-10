<template>
    <table style="width:90%; margin: 0 auto;">
        <tr class="dodatak">
            <td style="width:10%;"><p>{{this.contr.id}}</p></td>
            <td style="width:10%;"><p>{{this.contr.key}}</p></td>
            <td style="width:20%;"><p>{{this.contr.caption}}</p></td>
            <td style="width:30%;"><p>{{this.contr.src}}</p></td>
            <td style="width:10%;"><button @click="showModal">Proširi</button></td>
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
        padding-top: 15px;
    }
    .dodaci {
        border-right: 1px solid black;
    }
</style>