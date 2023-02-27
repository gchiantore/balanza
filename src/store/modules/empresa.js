export default {
    namespaced:true,
    state: {
        empresa:{}
    },
    getters: {
        getEmpresa(state){
            return state.empresa
        }
    },
    mutations: {
        setEmpresa(state,emp){
            state.empresa=emp
        }
    },
}    