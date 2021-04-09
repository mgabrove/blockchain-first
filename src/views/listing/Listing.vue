<template>
    <div class="col-12">
        <div v-if="!$store.state.personal">
            <ApproveEntry v-for="contr in this.$root.currentPosts" :key="contr.id" 
            :contr="contr" style="background: gray;"/>
        </div>
        <div v-if="$store.state.personal">
            <ApproveEntry v-for="contr in this.$root.currentPosts" :key="contr.id" 
            :contr="contr" style="background: gray;"/>
        </div>
    </div>
</template>

<script>
import ApproveEntry from "@/views/listing/ApproveEntry"

export default {
    components: {
        ApproveEntry
    },
    data(){
        return{
            users: [],
            usersPersonal: [],
            user: null,
            //userDoc: firebase.auth().currentUser,
            filterDropdown: false,
            searchTerm: "",
            status: null,
            temp: ""
        }
    },

    methods: {
        /*changing(broj){
            {  
                var goup = 2;
                if(broj === 1) {
                    goup = 3
                }
                db.collection("users").where("oib","==",this.temp).get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        db.collection("users").doc(doc.id).update({ 
                            phase: goup,
                            status: broj
                        })
                    }) 
                })
            }
        },
        changing1(oib){
            this.temp = oib
        },*/
    
        userDocListener(){ 
            for(var i=0; i < 30; i++){
                if(i===7||i===9||i===16||i===27) {
                   this.users.push(
                    {
                        thumbnail: "thumbnail"+i,
                        username: "boris",
                        title: "title"+i,
                        description: "description"+i
                    }) 
                    this.usersPersonal.push(
                    {
                        thumbnail: "thumbnail"+i,
                        username: "boris",
                        title: "title"+i,
                        description: "description"+i
                    })
                }
                else {
                    this.users.push(
                        {
                            thumbnail: "thumbnail"+i    ,
                            username: "username"+i,
                            title: "title"+i,
                            description: "description"+i
                        }
                    )
                }
            }
            /*db.collection("users").where("isRef", "==", false)
            .onSnapshot(snap => {
                this.usersWait = [],
                this.usersDen = [],
                this.usersApp = [],
                this.usersNon = [],
                snap.forEach(doc => {
                    var user = doc.data()
                    if(user.isRef === false){ //preskoci ref
                        if(user.status === 0) {
                            this.usersWait.push(user)
                        }
                        else if(user.status === -1) {
                            this.usersDen.push(user)
                        }
                        else if(user.status === 1) {
                            this.usersApp.push(user)
                        }
                        else {
                            this.usersNon.push(user)
                        }
                    }
                })
            })*/
        }
    },
    mounted(){
        this.userDocListener()
    }

}
</script>