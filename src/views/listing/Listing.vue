<template>
    <div class="col-12" style="margin-bottom:100px;">
        <div>
            <table style="width:90%;margin: 0 auto;margin-bottom:3px;table-layout:fixed;">
                <tr class="dodatak">
                    <td class="dodaci" style="width:10%;"><p>Key</p></td>
                    <td class="dodaci" style="width:10%;"><p>id</p></td>
                    <td class="dodaci" style="width:20%;"><p>Title</p></td>
                    <td class="dodaci" style="width:300px;"><p style="overflow:hidden;text-overflow:ellipsis;margin-left:10px;margin-right:10px;white-space:nowrap;">Description</p></td>
                    <td class="dodaci" style="width:10%;"><p>Expand issue</p></td>
                </tr>
            </table>
            <SingleContract v-for="contr in this.$root.currentPosts" :key="contr.id" 
            :contr="contr" style="background:gray;"/>
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

<style>
    .dodatak{
        border: 1px solid black;
    }
    .dodaci {
        border-right: 1px solid black;
        padding-top: 15px;
    }
</style>