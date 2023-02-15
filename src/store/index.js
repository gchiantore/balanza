import Vue from 'vue'
import Vuex from 'vuex'
import operadorModule from '@/store/modules/operador'
import pesoModule from '@/store/modules/peso'
import ticketModule from '@/store/modules/ticket'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        estado:0,
        titulo:'Peso Electrónico',
        modo:0
    },
    getters: {
        getEstado(state){
            return state.estado
        },
        getTitulo(state){
          return state.titulo
        },
        getModo(state){
          return state.modo
        }
    },
    mutations: {
        setEstado(state,estado){
            state.estado=estado
        },
        setTitulo(state,titulo){
          state.titulo=titulo
        },
        setModo(state,modo){
          state.modo=modo
        }
    },
    modules: {
      operadorModule,
      pesoModule,
      ticketModule,
    },
}) 

