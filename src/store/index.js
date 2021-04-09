import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router'
import { codesRoot, apiRoot } from '@/config'

axios.defaults.baseURL = apiRoot

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //get token and username from localstorage
    //used if page is refreshed or revisited without logging out
    token: localStorage.getItem('access_token') || null,
    username: localStorage.getItem('access_username') || null,
    feedback: null,
    title: null,
    name: null,
    surname: null,

    personal: false,

    prototip: null,
    acceptedEnrollment: null,
    render: false
  },
  getters: {
    name(state) {
      return state.name
    },
    surname(state) {
      return state.surname
    },
    loggedIn(state) {
      //returns true if token exists
      return state.token != null
    },
    moduleList(state) {
      return state.courses
    },
    billUrl(state) {
      //returns url to the barcode of the bill
      return (codesRoot+"/"+state.billKey+"/racun-"+state.oib+".png")
    },
    AAIUrl(state) {
      //returns url to the aai file
      return (codesRoot+"/files/aai/"+state.AAIkey+"/aaiedu-info-"+state.oib+".pdf")
    }
  },
  mutations: {
      changeState(state, data) {
        state.personal = data.flag
      },
    move(state, data) {
      //swaps positions of 2 elements in an array
      var temp_from = state.courses[data.from]
      var temp_to = state.courses[data.to]
      state.courses.splice(data.from, 1, temp_to)
      state.courses.splice(data.to, 1, temp_from)
    },
    acceptEnrollment(state, data) {
      state.acceptedEnrollment = data.flag
    },
    retrieveInfo(state) {
        //, doc
      /*state.name = doc.data.name
      state.surname = doc.data.surname
      state.oib = doc.data.oib
      state.course = doc.data.course
      state.secondCourse = doc.data.secondCourse
      state.faculty = doc.data.faculty
      state.fullTimeStudent = doc.data.fullTimeStudent
      state.notStudiedBefore = doc.data.notStudiedBefore
      state.dateOfBirth = doc.data.dateOfBirth
      state.postalTown = doc.data.postalTown
      state.postalNumber = doc.data.postalCode
      state.streetAddress = doc.data.streetAddress
      state.telephone = doc.data.telephone
      state.placement = doc.data.placement
      state.upisniBroj = doc.data.upisniBroj
      state.courses = doc.data.modulePreferences
      state.canDownloadBill = doc.data.canDownloadBill
      state.canDownloadAAI = doc.data.canDownloadAAI
      state.billKey = doc.data.billHash
      state.AAIkey = doc.data.AAIHash
      state.acceptedEnrollment = doc.data.acceptedEnrollment*/
      state.render = true
    },
    retrieveToken(state, data) {
      //set credentials from store
      state.token = data.token
      state.username = data.username
    },
    destroyToken(state) {
      //remove credentials from store
      state.token = null
      state.username = null
    }
  },
  actions: {
    changeState(context, data) {
        context.commit('changeState', data)
      },
    move(context, data) {
      context.commit('move', data)
    },
    retrieveToken(context) {
        //, credentials
      //login procedure
      localStorage.setItem('access_token', 15)
      localStorage.setItem('access_username', "boris")
      context.commit('retrieveToken', {
        token: 15,
        username: "boris"
      });
      /*return new Promise((resolve, reject) => {
        axios.post('/login', {
          oib: credentials.username,
          password: credentials.password
        })
        .then(response => {
          const token = response.data
          //put token into local storage
          localStorage.setItem('access_token', token)
          localStorage.setItem('access_username', credentials.username)
          //put token into app storage
          context.commit('retrieveToken', {
            token: token,
            username: credentials.username
          });
          resolve(response)
        })
        .catch(error => {
          context.state.feedback = "OIB ili lozinka nisu ispravni"
          reject(error)
        })
      })*/
    },
    destroyToken(context) {
      //logout procedure that destroys all credentials
      if(context.getters.loggedIn) {
        localStorage.removeItem('access_token')
        localStorage.removeItem('access_username')
        context.commit('destroyToken')
      }
    },
    /* destroyToken(context) {
      if(context.getters.loggedin) {
        return new Promise((resolve, reject) => {
          axios.post('/logout')
          .then(response => {
            localStorage.removeItem('access_token')
            context.commit('destroyToken')
            resolve(response)
          })
          .catch(error => {
            localStorage.removeItem('access_token')
            localStorage.removeItem('access_username', token)
            context.commit('destroyToken')
            console.log(error)
            reject(error)
          })
        })
      }
    }, */
    acceptEnrollment(context, data){
      //approve enrollment of a student
      if(context.state.courses != null) {
        axios.defaults.headers.common['Authorization'] = 'basic ' + context.state.token
        axios.patch('/info/'+context.state.username, {
          acceptedEnrollment: data.flag,
          modulePreferences: context.state.courses
        })
        .then(pov => {
          context.commit('retrieveInfo', pov);
          context.commit('acceptEnrollment', {
            flag: data.flag
          })
        }) 
        .catch(error => {
          console.log(error)
          context.dispatch('logoutProcedure')
        })
      } else {
        axios.defaults.headers.common['Authorization'] = 'basic ' + context.state.token
        axios.patch('/info/'+context.state.username, {
          acceptedEnrollment: data.flag,
        })
        .then(pov => {
          context.commit('retrieveInfo', pov);
          context.commit('acceptEnrollment', {
            flag: data.flag
          })
        }) 
        .catch(error => console.log(error))
      }
    },
    retrieveInfo(context){
      /*axios.defaults.headers.common['Authorization'] = 'basic ' + context.state.token
      axios.get('/info/'+context.state.username)
        .then(response => {
          context.commit('retrieveInfo', response)
        }) 
        .catch(error => {
          console.log(error)
          context.dispatch('logoutProcedure')
        })*/
        context.commit('retrieveInfo')
    },
    logoutProcedure(context) {
      context.dispatch('destroyToken')
      .then(() => { 
        router.push({ 
          name: 'Login'
        })
        .catch(err => {
          console.log(err)
        })
      })     
    }
  },
});
