export default {
    namespaced:true,
    state: {
        ticket:{
            idticket:0,
            fecha:'',
            hora:'',
            turnoinicio:Object,
            turnofin:Object,
            opcreador:Object,
            origen:'',
            destino:'',
            producto:'',
            chasis:'',
            acoplado:'',
            chofer:'',
            bruto:Object,
            tara:Object,
            neto:0,
            contado:true,
            importe:0,
            pendiente:true,
            empresa:Object
        } 
    },
    getters: {
        getTicket(state){
            return state.ticket
        }
    },
    mutations: {
        setTicket(state,tk){
            state.ticket=tk
        },
        setOperadorTicket(state,op,tb){
            if (tb=="B"){
                state.ticket.bruto.op=op
            }
                state.ticket.tara.op=op
        }
    },
}    