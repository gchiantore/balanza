<template>
    <div class="col-12 header">
        <div class="header-top">
            <div class="logo-container">
                <img :src="empresa[0].logo" class="img-logo" alt="Logo YPF">
                <h6 class="m-1">{{ empresa[0].nombre }}</h6>
            </div>
            <div class="turno">
                <h6>{{ hayTurno }}</h6>
            </div>
        </div>
        <div class="header-bottom">
            <nav>
                <router-link to="/">Home</router-link> |
                <router-link to="/about">About</router-link>
            </nav>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import empre from "@/assets/json/empresa.json"
export default {
    name:'HeaderComponent',
    data(){
        return{
            empresa:{}
        }
    },
    created(){
        this.empresa=empre
        console.log(empre)

    },
    methods:{
        ...mapGetters('turnosModule',['getTurnoActual']),
        ...mapMutations('trunosModule',['setTurnoActual']),
        ...mapGetters('empresaModule',['getEmpresa']),
        ...mapMutations('empresaModule',['setEmpresa'])
    },
    computed:{
        hayTurno(){
            return this.getTurnoActual().nombre
        }
    }
}
</script>

<style>
    .logo-container{
        display: flex;
        flex-direction: row;
        align-content: center;
        align-items: center;
        justify-content:flex-start;
    }
    .img-logo{
        height: 35px;
    }
    .header{
        display: flex;
        flex-direction: column;
        margin: 0px;
        padding: 3px;
        height: 80px;
        background-color: aliceblue;
        box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
    }
    .header-top{
        display: flex;
        flex-direction: row;
        align-content: center;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid rgb(205, 204, 204);
        height: 40px;
    }
    .header-bottom{
        display: flex;
        flex-direction: row;
        align-content: center;
        align-items: center;
        justify-content: center;
        height: 40px;
    }
</style>