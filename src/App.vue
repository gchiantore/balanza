<template>
  <div id="app">
    <div v-if="hayTurno=='C'" class="gradiante container-fluid row">
      <AperturaTurnoComponent />
    </div>
    <div class="gradiante" v-else>
      <HeaderComponent />   
      <div class="row main">
        <div class="info col-10 col-md-5 col-lg-3 m-3">
            <PesoComponent />
        </div>
        <div class="info col-10 col-md-5 col-lg-7 m-3">
          <TicketComponent/>
        </div>
      </div>
    </div>  
  </div>
</template>

<script>
import empre from "@/assets/json/empresa.json"
import { mapGetters, mapMutations } from 'vuex';
import AperturaTurnoComponent from './components/AperturaTurnoComponent.vue';
import HeaderComponent from './components/HeaderComponent.vue';
import PesoComponent from './components/PesoComponent.vue';
import TicketComponent from './components/TicketComponent.vue';
export default {
        components: {
          HeaderComponent,
          PesoComponent,
          TicketComponent,
          AperturaTurnoComponent,
        },
        data(){
          return{
            turnoActivo:Object,
            empresa:{},
          }
        },
        created(){
          this.empresa=empre
          this.setEmpresa(this.empresa)
          if (JSON.parse(localStorage.getItem('turnoActv'))){
            this.turnoActivo=JSON.parse(localStorage.getItem('turnoActv'))
            this.setTurnoActual(this.turnoActivo)
          }else{
            this.turnoActivo=this.getTurnoActual()
          }
          this.getEstadoTurno()
        },

        methods:{
          ...mapGetters('turnosModule',['getTurnoActual','getEstadoTurno']),
          ...mapMutations('turnosModule',['setTurnoActual']),
          ...mapGetters('empresaModule',['getEmpresa']),
          ...mapMutations('empresaModule',['setEmpresa'])
        },
        computed:{
          hayTurno(){
            return this.getEstadoTurno()
          }
        }
}
    
</script>


<style>
  *{
    font-family: 'Titillium Web', sans-serif;
  }
  
  .gradiante{
    padding: 0px;
    margin:0px;
    height: 100vh;
    background: #2980B9;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to bottom, #FFFFFF, #6DD5FA, #2980B9);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to bottom, #FFFFFF, #6DD5FA, #2980B9); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
  .main{
    display:flex;
    flex-direction: row;
    justify-content: center;
    height: calc(100vh - 80px);
  }
  .info{
    padding: 20px;
    background-color:aliceblue;
    box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
    height: calc(100vh - 120px);
  }
</style>
