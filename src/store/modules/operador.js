export default {
    namespaced:true,
    state: {
        opTicket:{
            id:'',
            nombre:'',
            avatar:''
        }
    },
    getters: {
        getOpTicket(state){
            return state.opTicket
        }
    },
    mutations: {
        setOpTicket(state,op){
            state.opTicket=op
        }
    },
}    