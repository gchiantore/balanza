<template>
    <div>
        <div v-if="loggedUser==0">
            <div class="container-fluid login-contenedor">
                <div v-if="userList==1" class="row container">
                    <div class="user-list-container container">
                        <div v-for="(op, i) of operadores" :key="i" @click="activaPinUsuario(op)" class="avatar-container">
                            <img :src="op.avatar" :alt="op.nombre">
                            <h6>{{op.nombre}}</h6>
                        </div>
                    </div>
                </div>
                <div v-else class="row d-flex justify-content-center align-items-center">
                    <div class="pin-container">
                        <div class="xcancelar">
                            <p @click="canceloPin()" class="text-end fw-bold text-secondary" style="cursor:default;">X</p>
                        </div>
                        <img :src="opActivo.avatar" :alt="opActivo.nombre">
                        <h5>{{opActivo.nombre}}</h5>
                        <div class="pin">
                            <VueChillCodeInput 
                                id="PinCode"
                                ref="PinCode"
                                :length="4" 
                                :autoFocus="true"
                                :password="true"
                                @done="pinlleno()" 
                                v-model="code"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
<!--Inicial -->
        <div v-if="checkEstado==0" class="container-fluid contenedor-peso">
            <div class="titulo">
                <h3>{{buscoTitulo}}</h3>
            </div>
            <div class="peso">
                <div class="icono">
                    <i class="bi bi-arrow-repeat repeat-icon"></i>
                </div>
                <h2 class="numero-peso">{{ tomoPeso }}</h2>
            </div>
            <div class="botones">
                <button @click="tomarPesoBalanza()" class="btn btn-primary">Tomar Peso</button>
                <button @click="tomarPesoManual()" class="btn btn-warning">Peso Manual</button>
            </div>
        </div>
<!--Toma de Peso Manual -->        
        <div v-if="checkEstado==1" class="container-fluid contenedor-peso">
            <h3 class="titulo">{{buscoTitulo}}</h3>
            <div class="peso-manual">
                <!-- <div v-if="errores.length!=0" class="alert alert-danger">
                    {{showErrors}}
                </div> -->
                <form form id="pesoManuaFrm" action="" @submit.prevent="regValidate">
                    <div class="mb-3">
                        <label for="peso-manual" class="form-label">Peso Manual</label>
                        <input ref="pesoManual" v-model="tomaPeso.peso" type="number" class="form-control text-end" id="peso-manual" aria-describedby="pm-help">
                        <div id="pm-help" class="form-text">ingrese numeros enteros del 1000 al 100000</div>
                    </div>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                        <button type="submit" class="btn btn-primary col-12">OK!</button>
                    </div>
                </form>
            </div>
        </div>
<!--Peso Fijado -->        
        <div v-if="checkEstado==2" class="container-fluid contenedor-peso">
            <h3 class="titulo">{{buscoTitulo}}</h3>
            <div class="peso-fijado">
                <div class="peso-info">
                    <h2 class="peso-fijado-texto text-center">{{ tomaPeso.peso }} kg.</h2>
                    <h6 class="datos-peso text-center">{{tomaPeso.tipo}} - {{ tomaPeso.fecha}} - {{tomaPeso.hora}} - OP: {{operador.nombre}}</h6>
                </div>
                <div class="d-felx gap-2 d-md-flex justify-content-md-center ">
                    <button @click="fijoTara()" class="btn btn-primary col-4">Tara</button>
                    <button @click="fijoBruto()" class="btn btn-warning col-4">Bruto</button>
                    <button @click="botonCancelar()" class="btn btn-danger col-4 text-center">Cancela</button>
                </div>
            </div>
        </div>
<!--Tomar el Peso como Tara/Bruto-->        
        <div v-if="checkEstado==3" class="container-fluid contenedor-peso">
            <h3 class="titulo">{{buscoTitulo}}</h3>
            <div class="peso-fijado">
                <div class="peso-info">
                    <h2 class="peso-fijado-texto text-center">{{ tomaPeso.peso }} kg.</h2>
                    <h6 class="datos-peso text-center">{{tomaPeso.tipo}} - {{ tomaPeso.fecha}} - {{tomaPeso.hora}} - OP:{{tomaPeso.op}}</h6>
                </div>
                <div v-if="checkModo===0" class="d-grid gap-2 d-md-flex justify-content-md-center">
                    <button class="btn btn-primary col-4">Pendiente</button>
                    <button @click="nuevoTk()" class="btn btn-warning col-4">Nuevo</button>
                    <button @click="botonCancelar()" class="btn btn-danger col-4">Cancelar</button>
                </div>
            </div>
        </div>
<!--Volver a Tomar el peso-->        
        <div v-if="checkEstado==4" class="container-fluid contenedor-peso">
            <h3>Datos del TK</h3>
        </div>
<!--Cancelar operacion y volver al principio-->        
        <div v-if="checkEstado==4" class="container-fluid contenedor-peso">
            <h3>Datos del TK</h3>
        </div>        
    </div>
</template>

<script>
import { db } from '@/firebaseDB';
import pesodata from "@/assets/json/data.json"
import VueChillCodeInput from 'vue-chill-code-input';
import { mapGetters,mapMutations } from 'vuex'
export default {
    name:'PesoComponent',
    components:{
        VueChillCodeInput
    },
    data(){
        return{
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
            },
            tomaPeso:{
                peso:0,
                op:{},
                fecha:'',
                hora:'',
                tipo:'AUT',
                tb:''
            },
            operadores:[],
            opActivo:Object,
            opTicket:{
                id:'',
                nombre:''
            },
            errores:[],
            loggedUser:1,
            userList:1,
            code:'0'
        }
    },
    created(){
        db.collection('usuarios').onSnapshot((snapshotChange) => {
                this.Users = [];
                snapshotChange.forEach((doc) => {
                    this.operadores.push({
                        key: doc.id,
                        nombre: doc.data().nombre,
                        pin:doc.data().pin,
                        avatar: doc.data().avatar,
                        cdodebo: doc.data().cdodebo,
                    })
                });
            })
            this.$vToastify.setSettings({
                            position:"top-center",
                            errorDuration:2000,
                            hideProgressbar:true,
                            theme:"dark",
                        })
    },

    methods:{
        ...mapGetters(['getEstado','getTitulo','getModo']),
        ...mapMutations(['setEstado','setTitulo','setModo']),
        ...mapMutations('pesoModule',['setPeso']),
        ...mapGetters('operadorModule',['getOpTicket']),
        ...mapMutations('operadorModule',['setOpTicket']),
        ...mapGetters('ticketModule',['getTicket']),
        ...mapMutations('ticketModule',['setTicket']),
        ...mapGetters('empresaModule',['getEmpresa']),
        ...mapGetters('turnosModule',['getTurnoActual']),

        pinlleno(){
            if (this.opActivo.pin==this.code){
                this.loggedUser=1
                this.userList=1
                this.opTicket.nombre=this.opActivo.nombre
                this.opTicket.id=this.opActivo.cdodebo
                this.opTicket.avatar=this.opActivo.avatar
                this.setOpTicket(this.opTicket)
                if (this.getEstado()==1){
                    this.$nextTick(() => {
                        this.$refs.pesoManual.focus(); 
                        document.getElementById("peso-manual").select()
                    });
                }
            }else{
                this.$vToastify.error("El PIN es incorrecto!!")
                this.code=""
                this.$nextTick(() => {
                        this.$refs.PinCode.focus(); 
                    });
            }
        },
        canceloPin(){
            this.setEstado(0)
            this.loggedUser=1
            this.userList=1  
        },
        activaPinUsuario(operador){
            this.opActivo=operador
            this.userList=0
        },
        cambiaestado(valor,titulo,modo){
            this.setEstado(valor)
            this.setTitulo(titulo)
            this.setModo(modo)
        },
        nuevoTk(){
            this.setPeso(this.tomaPeso)
            this.ticket.fecha=new Date().toLocaleDateString()
            this.ticket.hora=new Date().toLocaleTimeString()
            this.ticket.opcreador=this.getOpTicket()
            this.ticket.empresa=this.getEmpresa()
            this.ticket.importe=this.ticket.empresa[0].precio
            this.ticket.turnoinicio=this.getTurnoActual()
            this.ticket.contado=true
            this.ticket.pendiente=true
            this.setTicket(this.ticket)
            this.setModo(1)
            
        },
        fijoTara(){
            this.tomaPeso.tb="T"
            this.setEstado(3)
            this.setTitulo("Tara Fijada En:")
        },
        fijoBruto(){
            this.tomaPeso.tb="B"
            this.setEstado(3)
            this.setTitulo("Bruto Fijad0 En:")
        },
        botonCancelar(){
            this.setEstado(0)
            this.setTitulo("Peso Electronico")
        },

        tomarPesoBalanza(){
            this.setEstado(2)
            this.setTitulo("Peso Fijado Automaticamente")
            this.loggedUser=0
            this.tomaPeso.peso=pesodata[0].data
            this.tomaPeso.op=this.getOpTicket()
            this.tomaPeso.fecha=new Date().toLocaleDateString()
            this.tomaPeso.hora=new Date().toLocaleTimeString()
            this.tomaPeso.tipo="AUT"
        },

        tomarPesoManual(){
            this.setEstado(1)
            this.setTitulo("Peso Manual")
            this.loggedUser=0

        },
        regValidate() {
            if(this.tomaPeso.peso>=1000 && this.tomaPeso.peso<=100000){
                this.setEstado(2)
                this.setTitulo("Peso Fijado Manualmente")
                this.tomaPeso.op=this.getOpTicket()
                this.tomaPeso.fecha=new Date().toLocaleDateString()
                this.tomaPeso.hora=new Date().toLocaleTimeString()
                this.tomaPeso.tipo="MAN"
            }

            if(!this.tomaPeso.peso){
                this.$vToastify.error("El peso debe tener un valor")
                this.$nextTick(() => {
                        this.$refs.pesoManual.focus(); 
                        document.getElementById("peso-manual").select()
                    });
            }

            if(this.tomaPeso.peso<1000){
                this.$vToastify.error("El peso debe ser mayor o igual a 1.000")
                this.$nextTick(() => {
                        this.$refs.pesoManual.focus(); 
                        document.getElementById("peso-manual").select()
                    });
            }
            
            if(this.tomaPeso.peso>100000){
                this.$vToastify.error("El Peso debe ser menor a 100.000")
                this.$nextTick(() => {
                        this.$refs.pesoManual.focus(); 
                        document.getElementById("peso-manual").select()
                    });
            } 
        },
    },
    computed: {
        tomoPeso(){
            return pesodata[0].data
        },
        showErrors() {
            let formErrores=this.errores.join(" <---> ");
            return formErrores;
        },
        checkEstado(){
            return this.getEstado()
        },
        buscoTitulo(){
            return this.getTitulo()
        },
        checkModo(){
            return this.getModo()
        },
        operador(){
            return this.getOpTicket()
        },
    }
}
</script>

<style>
    .pin-container{
        min-width: 300px;
        height: 400px;
        background: rgba(255, 255, 255, 0.55);
        border-radius: 10px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        border: 1px solid rgba(255, 255, 255, 0.3);
        display:flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        row-gap: 20px;
    }
    .xcancelar{
        width: 100%;
        padding: 4px;
    }
    .pin-container img{
        margin-top: 5px;
        width: 150px;
        height: 150px;
        border-radius: 50%;
    }
    .avatar-container{
        height: 150px;
        width: 150px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        row-gap: 10px;
    }
    .avatar-container h6{
        color: gray;
    }
    .avatar-container:hover img{
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    }
    .avatar-container:hover h6{
        font-weight: bold;
        color:green;
    }
    .avatar-container img{
        width: 100px;
        height: 90px;
        border-radius: 50%;
    }
    .user-list-container{
        min-height: 200px;
        background: rgba(255, 255, 255, 0.55);
        border-radius: 16px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        border: 1px solid rgba(255, 255, 255, 0.3);
        display:flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        column-gap: 30px;
    }
    .login-contenedor{
        position:absolute;
        height: 100vh;
        width: 100vw;
        top:0;
        left:0;
        background: rgba(156, 235, 255, 0.5);
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        border: 1px solid rgba(156, 235, 255, 0.3);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .peso-fijado{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: 10px;
    }
    .peso-info{
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        margin-bottom: 10px;
    }
    .peso-info h2{
        margin-bottom: 1px;
    }
    .peso-fijado-texto{
        padding: 0px;
        margin: 0px;
        font-size: 62px;
    }
    .datos-peso{
        padding: 0px;
        margin: 0px;
        font-size: 10px;
        color: dimgray;
    }
    .repeat-icon{
        text-align: left;
        font-size: 30px;
        color:greenyellow;
    }
    .contenedor-peso{
        display: flex;
        flex-direction: column;
        row-gap: 10px;
    }
    .titulo{
        text-align: center;
    }
    .peso-manual{
        display: flex;
        flex-direction: column;
        align-content: center;
        align-items: center;
        justify-content: center;
    }
    .peso{
        padding: 10px;
        display: flex;
        flex-direction: row;
        align-content: center;
        align-items: center;
        justify-content: space-between;
        height: 90px;
        background-color: #2b2b2b;
        border-radius: 10px;
    }

    .numero-peso{
        text-align: right;
        color:greenyellow;
        font-size: 64px;
    }

    .botones{
        display: flex;
        flex-direction: row;
        justify-content: center;
        column-gap: 10px;
    }
</style>