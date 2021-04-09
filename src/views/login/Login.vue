<template>
    <div class="top150">
        <vue-headful
            title="Upisi na UniPu"
            description="Upisi na UniPu"
        />
        <h2>Prijava</h2>
            <div class="form-group offset-lg-4 col-lg-4 col-10 offset-1">
                <input @keyup.enter="enterClicked()" type="text" aria-describedby="emailHelp" v-model="username" placeholder="OIB" name="username" class="form-control" :class="{ 'is-invalid': submitted && !username }" />
                <div v-show="submitted && !username" class="invalid-feedback">Potreban OIB</div>
            </div>
            <div class="form-group offset-lg-4 col-lg-4 col-10 offset-1">
                <VuePassword @keyup.enter="enterClicked()" type="text" :disable-strength="true" v-model="password" placeholder="Lozinka" id="password" :class="{ 'is-invalid': submitted && !password }" />
                <div v-show="submitted && !password" class="invalid-feedback">Potrebna lozinka</div>
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-primary shadow-none" style="background-color:#232323; border-color:#232323;" @click.prevent="login">Ulaz</button>
                <p v-if="$store.state.feedback" class="mt-3 feedback">{{$store.state.feedback}}</p>
            </div>  
    </div>
</template>

<script>
import VuePassword from "vue-password";

export default {
    components: {
        VuePassword,
    },
    data () {
        return {
            username: null,
            password: null,
            submitted: null
        }
    },
    methods: {
        login() {
            if(this.username && this.password) {
                this.$store.dispatch('retrieveToken', {
                    username: this.username,
                    password: this.password
                })
                .then(() => {
                    this.$router.push({
                        name: 'HomePage'
                    })
                    .catch(err => {
                        console.log(err)
                    })
                });
            } else{
                this.$store.state.feedback = 'Popunite oba polja'
            }
        },
        enterClicked () {
            this.submitted = true
            this.login()
        }
    }
}
</script>
