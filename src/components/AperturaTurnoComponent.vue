<template>
    <div class="col-md-12 contenedor turno-contenedor">
        <img class="img-logo" :src="empresa[0].logo" alt="">
        <h4 class="text-center">{{ empresa[0].nombre }}</h4>
        <hr>
        <h3 class="text-center">Control de Peso - Apertura de Turno</h3>
        <div class="planilladebo">
            <div class="mb-3">
                <input v-model="planilla" type="text" class="form-control text-center" id="planilla" placeholder="Planilla Debo">
            </div>
        </div>
        <div class="opciones-contenedor">
            <div @click="fijoTurno('Noche')" class="icono-turno-contenedor">
                <i class="bi bi-moon-stars icono-turno"></i>
                <p class="texto-icono">Turno Noche</p>
            </div>

            <div @click="fijoTurno('Mañana')" class="icono-turno-contenedor">
                <i class="bi bi-sunrise icono-turno"></i>
                <p class="texto-icono">Turno Mañana</p>
            </div>

            <div @click="fijoTurno('Tarde')" class="icono-turno-contenedor">
                <i class="bi bi-sunset icono-turno "></i>
                <p class="texto-icono">Turno Tarde</p>
            </div>
        </div>
    </div>
</template>

<script>

import { mapGetters, mapMutations } from 'vuex';
export default {
    name:'AperturaTurnoComponent',
    data(){
        return{
            empresa:{},
            planilla:"",
            turnoActivo:{
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
        }
    },
    created(){
        this.empresa=this.getEmpresa()
        this.$vToastify.setSettings({
                        position:"top-center",
                        errorDuration:2000,
                        hideProgressbar:true,
                        theme:"dark",
                    })
    },
    methods:{
        ...mapGetters('turnosModule',['getTurnoActual']),
        ...mapMutations('turnosModule',['setTurnoActual']),
        ...mapGetters('empresaModule',['getEmpresa']),
        
        fijoTurno(turno){
            if (this.planilla!=""){
                this.turnoActivo.nombre=turno
                this.turnoActivo.apertura=new Date().toLocaleDateString()+" - "+new Date().toLocaleTimeString()
                this.turnoActivo.planilla=this.planilla
                this.turnoActivo.estado="A"
                this.setTurnoActual(this.turnoActivo)
                localStorage.setItem('turnoActv',JSON.stringify(this.turnoActivo))
            }
        }
    }

}

</script>

<style scoped>
    .planilladebo{
        margin-top: 20px;
    }
    .turno-contenedor{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .opciones-contenedor{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 15px;
        margin: 10px;
        column-gap: 15px;
    }
    .icono-turno-contenedor{
        min-width: 150px;
        min-height: 150px;
        display:flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        border-radius: 5px;
        padding: 15px;
        /* From https://css.glass */
        background: rgba(255, 255, 255, 0.14);
        border-radius: 16px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(10.3px);
        -webkit-backdrop-filter: blur(10.3px);
        border: 1px solid rgba(255, 255, 255, 0.91);
    }
    .icono-turno-contenedor:hover{
        background: rgba(255, 255, 225, 0.55);
        /* From https://css.glass */
        background: rgba(255, 255, 255, 0.4);
        border-radius: 16px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(10.3px);
        -webkit-backdrop-filter: blur(10.3px);
        border: 1px solid rgba(255, 255, 255, 0.91);
    }
    .icono-turno-contenedor:hover p{
        font-weight: bold;
        color:darkblue;
    }
    .texto-icono{
        padding: 0px;
        margin: 0px;
    }
    .icono-turno{
        font-size: 72px;
        margin-bottom:-20px;
        margin-top:0px;
        padding:0px;
    }
    .img-logo{
        width: 100px;
        height: auto;
    }
</style>