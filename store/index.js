import Vuex from 'vuex'
import { auth } from '../plugins/firebase.js'

const createStore = () => {
  return new Vuex.Store({
    state: {
        user:null,
    },

    getters: {
        user(state) {
            return state.user
        },
        isAuthenticated(state) {
            return !!state.user
        }
    },

    mutations: {
        setUser(state, payload) {
            state.user = payload
        }
    },

    actions: {
      signUp() {

      },

      signInWithEmail({ commit }, { email, password }) {
        return new Promise((resolve,reject)=>{
            email = email.toString();
            password = password.toString();
            auth.signInWithEmailAndPassword(email, password).then((user)=>{
                this.state.user = user;
                return resolve();
            }).catch((err)=>{
                return reject(err)
            })
        })
      },
    
      signOut({commit}) {
          return new Promise((resolve,reject)=>{
             auth.signOut().then(()=>{
                this.state.user=null;
                return resolve();
             }).catch((err)=>{
                return reject(err);
             })
          })
      }
    }
  })
}

export default createStore