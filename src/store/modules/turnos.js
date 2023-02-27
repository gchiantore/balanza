export default {
    namespaced:true,
    state: {
        turnoActual:{
            nombre:"",
            apertura:"",
            cierre:"",
            planilla:"",
            ctacte:0,
            ctdo:0,
            qpesadas:0,
            qpendientes:0,
            estado:'C'
        }
    },
    getters: {
        getTurnoActual(state){
            return state.turnoActual
        },
        getEstadoTurno(state){
            return state.turnoActual.estado
        }
    },
    mutations: {
        setTurnoActual(state,turno){
            state.turnoActual=turno
        },
        setEstadoTurno(state,estado){
            state.turnoActual.estado=estado
        },
    },
}    