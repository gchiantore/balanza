export default {
    namespaced:true,
    state: {
        peso:Object
    },
    getters: {
        getPeso(state){
            return state.peso
        }
    },
    mutations: {
        setPeso(state,valor){
            state.peso=valor
        }
    },
}    