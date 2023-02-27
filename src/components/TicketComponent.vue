<template>
    <div class="container">
        <div v-if="checkModo===1">
            <div v-if="errores.length!=0" class="alert alert-danger">
                {{showErrors}}
            </div>
            <div class="row">
                <div class="col-md-12 m-0">
                    <h4 class="text-center m-1">Nuevo Ticket</h4>
                    <hr class="m-1">
                    <form class="row g-3 needs-validation" id="productform" action="" @submit.prevent="formValidate">
                        <div class="row m-3">
                            <div class="col-12 col-md-7">
                                <p class="m-0">Ticket : Nuevo </p>
                                <p class="m-0">Operador : ({{ticket.opcreador.id}})- {{ticket.opcreador.nombre}}</p>
                                <p class="m-0">Fecha: {{ new Date().toLocaleDateString()}}</p>
                                <p class="m-0">Hora: {{ new Date().toLocaleTimeString()}}</p>
                                <div class="row m-2">
                                    <div class="form-check col-12 col-md-6">
                                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                                        <label class="form-check-label" for="flexRadioDefault1">
                                            Contado
                                        </label>
                                    </div>
                                    <div class="form-check col-12 col-md-6">
                                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
                                        <label class="form-check-label" for="flexRadioDefault2">
                                            Cuenta Corriente
                                        </label>
                                    </div>
                                </div>   
                                <div class="m-2">
                                    <h5 class="text-center">Total a Pagar :$ 1200.00</h5>
                                </div>
                            </div>
                            <!-- ***** ESTO ES LO QUE PASA CON EL BRUTO **** -->
                            <div class="col-12 col-md-5 d-flex flex-column gap-3">
                                <div class="col-12 col-md-10">

                                    <div v-if="estadoBruto==1" class="d-flex flex-row gap-1">
                                        <label for="bruto" class="form-label m-2" style="width:100px">Bruto</label>
                                        <input ref="bruto" v-model="bruto" type="text" class="form-control text-end" id="bruto" value="" disabled>
                                        <button @click="cambiaEstadoBoton('B',2)" type="button" class="btn btn-info">
                                            <i class="bi bi-pencil-square"></i>
                                        </button>
                                    </div>

                                    <div v-else-if="estadoBruto==2" class="d-flex flex-row gap-1">
                                        <label for="bruto" class="form-label m-2" style="width:100px">Bruto</label>
                                        <input ref="bruto" v-model="bruto" type="text" class="form-control text-end" id="bruto" value="">
                                        <div v-if="validaPesoBruto==1">
                                            <button @click="cambiaEstadoBoton('B',3)" type="button" class="btn btn-success">
                                                <i class="bi bi-check-all"></i>
                                            </button>
                                        </div>
                                        <div v-else>
                                            <button type="button" class="btn btn-danger">
                                                <i class="bi bi-x-circle"></i>
                                            </button>
                                        </div>
                                    </div>

                                    <div v-else class="d-flex flex-row gap-1">
                                        <label for="bruto" class="form-label m-2" style="width:100px">Bruto</label>
                                        <input ref="bruto" v-model="bruto" type="text" class="form-control text-end" id="bruto" value="" disabled>
                                        <button type="button" class="btn btn-info" disabled data-bs-toggle="button" >
                                            <i class="bi bi-pencil-square"></i>
                                        </button>   
                                    </div>
                                </div>

                                <!-- ***** ESTO ES LO QUE PASA CON LA TARA **** -->
                                <div class="col-12 col-md-10">
                                    
                                    <div v-if="estadoTara==1" class="d-flex flex-row gap-1">
                                        <label for="tara" class="form-label m-2" style="width:100px">Tara</label>
                                        <input ref="tara" v-model="tara" type="text" class="form-control text-end" id="tara" value="" disabled>
                                        <button @click="cambiaEstadoBoton('T',2)" type="button" class="btn btn-info">
                                            <i class="bi bi-pencil-square"></i>
                                        </button>
                                    </div>

                                    <div v-else-if="estadoTara==2" class="d-flex flex-row gap-1">
                                        <label for="tara" class="form-label m-2" style="width:100px">Tara</label>
                                        <input ref="tara" v-model="tara" type="text" class="form-control text-end" id="tara" value="">
                                        <div v-if="validaPesoTara==1">
                                            <button @click="cambiaEstadoBoton('T',3)" type="button" class="btn btn-success">
                                                <i class="bi bi-check-all"></i>
                                            </button>
                                        </div>
                                        <div v-else>
                                            <button type="button" class="btn btn-danger">
                                                <i class="bi bi-x-circle"></i>
                                            </button>
                                        </div>
                                    </div>

                                    <div v-else class="d-flex flex-row gap-1">
                                        <label for="tara" class="form-label m-2" style="width:100px">Tara</label>
                                        <input ref="tara" v-model="tara" type="text" class="form-control text-end" id="tara" value="" disabled>
                                        <button type="button" class="btn btn-info" disabled data-bs-toggle="button" >
                                            <i class="bi bi-pencil-square"></i>
                                        </button>
                                    </div>
                                </div>

                                <div class="col-12 col-md-10">
                                    <div class="d-flex flex-row gap-1">
                                        <label for="neto" class="form-label m-2" style="width:100px">Neto</label>
                                        <input ref="neto" v-model="ticket.neto" type="text" class="form-control text-end" style="width:340px" id="neto" value="" disabled>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr class="m-1">
                        <div class="col-12 col-md-5 m-0">
                            <label for="origen" class="form-label">Origen</label>
                            <input ref="origen" @blur="validaCampo(1)" v-model="ticket.origen" type="text" class="form-control" id="origen" value="">
                        </div>
                        <div class="col-12 col-md-5 m-0">
                            <label for="destino" class="form-label">Destino</label>
                            <input ref="destino" @blur="validaCampo(2)" v-model="ticket.destino" type="text" class="form-control" id="destino" value="">
                        </div>
                        <div class="col-12 col-md-2 m-0">
                            <label for="producto" class="form-label">Producto</label>
                            <input ref="producto" @blur="validaCampo(3)" v-model="ticket.producto" type="text" class="form-control" id="producto" value="">
                        </div>
                        <hr class="m-2">
                        <div class="col-12 col-md-3 m-0">
                            <label for="chasis" class="form-label">Dominio Chasis</label>
                            <input ref="chasis" @blur="validaCampo(4)" v-model="ticket.chasis" type="text" class="form-control" id="chasis" value="" placeholder="ej.: AA999AA o AAA999">
                        </div>
                        <div class="col-12 col-md-3 m-0">
                            <label for="acoplado" class="form-label">Dominio Acoplado</label>
                            <input ref="acoplado" @blur="validaCampo(5)" v-model="ticket.acoplado" type="text" class="form-control" id="acoplado" value="" placeholder="ej.: AA999AA o AAA999">
                        </div>
                        <div class="col-12 col-md-6 m-0">
                            <label for="chofer" class="form-label">Chofer/Transporte</label>
                            <input ref="chofer" @blur="validaCampo(6)" v-model="ticket.chofer" type="text" class="form-control" id="chofer" value="">
                        </div>
                        <hr>
                        <div class="d-grid gap-2 d-md-flex justify-content-md-center m-0">
                            <button @click="guardarEimprimir()" class="btn btn-primary" type="submit">Guardar e Imprimir</button>
                            <button @click="cambiaestado(0,'Peso Electronico',0)" class="btn btn-danger">Cancelar</button>
                        </div>
                    </form>
                    
                </div>
                    <div class="col-md-3"></div>
            </div>
        </div>
        <div v-else>
            <h1>Hola Mundo</h1>
            <br>
            <h4>Turno: {{ turnoActivo.nombre }}</h4>
            <h4>Abierto: {{ turnoActivo.apertura }}</h4>
            <h4>Planilla Debo: {{ turnoActivo.planilla }}</h4>
            <br>
            <button @click="cerrarTurno()" class="btn btn-danger">Cerrar Turno {{ turnoActivo.nombre }}</button>
        </div>    
    </div>
</template>


<script>
import {ConectorPluginV3} from "@/assets/js/conector.js"
import { mapGetters, mapMutations } from 'vuex';
export default {
    name:'ProductForm',
    props:{
        modo:Number,
    },
    
    data() {
        return {
            bruto:0,
            tara:0,
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
            turnoActivo:Object,
            estadoBruto:1,
            estadoTara:1,
            errores:[],
            letrasDominio:0
        }
    },    
    created(){
        this.turnoActivo=this.getTurnoActual()
        this.ticket=this.getTicket()
        if(this.getPeso().tb=="T"){
            this.ticket.tara=this.getPeso()
            this.ticket.bruto.peso=0
            this.estadoTara=3
            this.estadoBruto=1
        }
        if(this.getPeso().tb=="B"){
            this.ticket.bruto=this.getPeso()
            this.ticket.tara.peso=0
            this.estadoTara=1
            this.estadoBruto=3
        }
        this.setTicket(this.ticket)
        this.$vToastify.setSettings({
                            position:"top-center",
                            errorDuration:2000,
                            hideProgressbar:true,
                            theme:"dark",
                        })
    },
    beforeUpdate(){
        this.turnoActivo=this.getTurnoActual()
    },
    updated(){
        if(this.getPeso().tb=="T"){
            this.ticket=this.getTicket()
            this.ticket.tara=this.getPeso()
            this.tara=this.ticket.tara.peso
            this.estadoTara=3
            this.setOperadorTicket(this.getOpTicket(),"T")

        }
        if(this.getPeso().tb=="B"){
            this.ticket=this.getTicket()
            this.ticket.bruto=this.getPeso()
            this.bruto=this.ticket.bruto.peso
            this.estadoBruto=3
            this.setOperadorTicket(this.getOpTicket(),"B")
        }
    },

    methods: {
        ...mapGetters(['getEstado','getTitulo','getModo']),
        ...mapGetters('pesoModule',['getPeso']),
        ...mapMutations(['setEstado','setTitulo','setModo']),
        ...mapMutations('pesoModule',['setPeso']),
        ...mapGetters('turnosModule',['getTurnoActual','getEstadoTurno']),
        ...mapMutations('turnosModule',['setTurnoActual']),
        ...mapGetters('ticketModule',['getTicket']),
        ...mapMutations('ticketModule',['setTicket','setOperadorTicket']),
        ...mapGetters('operadorModule',['getOpTicket']),
        ...mapMutations('operadorModule',['setOpTicket']),

        cerrarTurno(){
            this.turnoActivo.nombre=''
            this.turnoActivo.apertura=''
            this.turnoActivo.planilla=''
            this.turnoActivo.estado="C"
            this.turnoActivo.ctacte=0
            this.turnoActivo.ctdo=0
            this.turnoActivo.qpesadas=0
            this.turnoActivo.qpendientes=0
            this.setTurnoActual(this.turnoActivo)
            localStorage.removeItem('turnoActv')
        },
        validaCampo(campo){
            let valorCampo=""
            switch(campo){
                case 1:{
                    if(!this.ticket.origen){
                        this.$nextTick(() => {
                            this.$refs.origen.focus(); 
                            document.getElementById("origen").select()
                        });
                        this.$vToastify.error("Ups! el Origen no puede estar vacio!")
                    }else{
                    valorCampo=this.ticket.origen.toUpperCase()
                    this.ticket.origen=valorCampo
                    }
                    break
                }
                case 2:{
                    if(!this.ticket.destino){
                        this.$nextTick(() => {
                            this.$refs.destino.focus(); 
                            document.getElementById("destino").select()
                        });
                        this.$vToastify.error("Ups! el Destino no puede estar vacio!")
                    }else{
                    valorCampo=this.ticket.destino.toUpperCase()
                    this.ticket.destino=valorCampo
                    }
                    break
                }
                case 3:{
                    if(!this.ticket.producto){
                        this.$nextTick(() => {
                            this.$refs.producto.focus(); 
                            document.getElementById("producto").select()
                        });
                        this.$vToastify.error("Ups! Debe haber un producto!")
                    }else{
                    valorCampo=this.ticket.producto.toUpperCase()
                    this.ticket.producto=valorCampo
                    }
                    break
                }
                case 4:{
                    if(!this.ticket.chasis){
                        this.$nextTick(() => {
                            this.$refs.chasis.focus(); 
                            document.getElementById("chasis").select()
                        });
                        this.$vToastify.error("Ups! El dominio del Chasis no puede estar vacio!")
                    }else{
                        if (this.ticket.chasis.length<6 || this.ticket.chasis.length>7){
                            this.$nextTick(() => {
                            this.$refs.chasis.focus(); 
                            document.getElementById("chasis").select()
                        });
                        this.$vToastify.error("Ups! el formato del dominio es incorrecto")
                        }else{
                            this.sacoespacios("C")
                        }
                    }    
                    break
                }
                case 5:{
                    if(!this.ticket.acoplado){
                        this.$vToastify.warning("Ojo Falta el dominio del acoplado")
                        this.sacoespacios("A")
                        break
                    }else{
                        if (this.ticket.acoplado.length<6 || this.ticket.acoplado.length>9){
                                this.$nextTick(() => {
                                this.$refs.acoplado.focus(); 
                                document.getElementById("acoplado").select()
                            });
                            this.$vToastify.error("Ups! el formato del dominio es incorrecto")
                        }else{
                            this.sacoespacios("A")
                        }     
                        break
                    }  
                }
                case 6:{
                    if(!this.ticket.chofer){
                        this.$nextTick(() => {
                            this.$refs.chofer.focus(); 
                            document.getElementById("chofer").select()
                        });
                        this.$vToastify.error("Ups! el chofer no puede estar vacio!")
                    }else{
                        valorCampo=this.ticket.chofer.toUpperCase()
                        this.ticket.chofer=valorCampo
                    }
                    break
                }
            }
        },
        sacoespacios(valor){
            let modificado=""
            if (valor=='C'){
                modificado=this.ticket.chasis.replace(/\s+/g, '')
                this.ticket.chasis=modificado.toUpperCase()
            }else{
                modificado=this.ticket.acoplado.replace(/\s+/g, '')
                this.ticket.acoplado=modificado.toUpperCase()
            }
        },
        cambiaEstadoBoton(boton,valor){
            if(boton=='B'){
                this.estadoBruto=valor
                if (valor==2){
                    this.bruto=0
                    this.$nextTick(() => {
                        this.$refs.bruto.focus(); 
                        document.getElementById("bruto").select()
                    });
                }else if (valor==3){
                    this.ticket.bruto.peso=this.bruto
                    this.ticket.bruto.fecha=new Date().toLocaleDateString()
                    this.ticket.bruto.hora=new Date().toLocaleTimeString()
                    this.ticket.bruto.tipo="MAN"
                    this.ticket.bruto.tb="B"
                    this.ticket.bruto.op=this.getOpTicket()
                    this.$nextTick(() => {
                        this.$refs.origen.focus(); 
                        document.getElementById("origen").select()
                    });
                }
            }else{
                this.estadoTara=valor
                if (valor==2){
                this.ticket.tara.peso=0    
                this.$nextTick(() => {
                        this.$refs.tara.focus(); 
                        document.getElementById("tara").select()
                    });
                }else if (valor==3){
                    this.ticket.tara.peso=this.bruto
                    this.ticket.tara.fecha=new Date().toLocaleDateString()
                    this.ticket.tara.hora=new Date().toLocaleTimeString()
                    this.ticket.tara.tipo="MAN"
                    this.ticket.tara.tb="B"
                    this.ticket.tara.op=this.getOpTicket()
                    this.$nextTick(() => {
                        this.$refs.origen.focus(); 
                        document.getElementById("origen").select()
                    });
                }
            }
            this.calculoNeto()
        },


        cambiaestado(valor,titulo,modo){
            this.setEstado(valor)
            this.setTitulo(titulo)
            this.setModo(modo)
            Object.assign(this.$data, this.$options.data());
            this.setPeso({})
        },

        calculoNeto(){
            this.ticket.neto=parseInt(this.ticket.bruto.peso)-parseInt(this.ticket.tara.peso)
        },

        formValidate() {
            /* if(this.objproducto.name && this.objproducto.desc && this.objproducto.precio){
                if(this.modo==2){
                        this.putProductosApi(this.objproducto)
                        this.$swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'El producto fue modificado con exito',
                            showConfirmButton: false,
                            timer: 1500
                            })      
                        document.getElementById("productform").reset();
                        Object.assign(this.$data, this.$options.data());
                }else{
                        this.postProductosApi(this.objproducto)
                        this.$swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'El producto fue agregado con exito',
                            showConfirmButton: false,
                            timer: 1500
                            })      
                        document.getElementById("productform").reset();
                        Object.assign(this.$data, this.$options.data());
                }
                return true;
            }
            if(!this.objproducto.name){
                this.errores.push("El nombre del producto es necesario ");
            }
            if(!this.objproducto.desc){
                this.errores.push("Debes seleccionar un Tamaño");
            }
            if(!this.objproducto.precio){
                this.errores.push("Debes elegir un tipo de Ridding")
            } 
            setTimeout(() => {
                this.errores=[];
            }, 3000); */
        },
        btnCancelar(){
            this.$emit('enviar',false)
        },

        guardarEimprimir(){
            console.log("listo para guardar")
            /* Aqui falta poner el turno de fin del ticket y buscar el numero siguiente de ticket*/
            console.log(this.ticket)
            const URLPlugin = "http://localhost:8000"
            const nombreImpresora ="EPSON TM-T20II Receipt" /* $listaDeImpresoras.value; */
            this.imprimirTicket(nombreImpresora, URLPlugin,this.ticket)
        },

        imprimirTicket:async(nombreImpresora, URLPlugin, data)=> {
            const conector = new ConectorPluginV3(URLPlugin);
            conector.Iniciar();
            conector.Feed(8);
            conector.Corte(5);
            conector.EstablecerTamFuente(2, 2);
            conector.EstablecerAlineacion(ConectorPluginV3.ALINEACION_CENTRO)
            conector.EscribirTexto("Oscar Chiantore SRL\n");
            conector.EstablecerTamFuente(1, 1);
            conector.EscribirTexto("Ruta 17 km. 176\n");
            conector.EscribirTexto("3575-400209 - La Para - Cordoba\n\n");
            conector.EstablecerAlineacion(ConectorPluginV3.ALINEACION_DERECHA)
            conector.EscribirTexto("------------------------------------------------\n");
            conector.EstablecerTamFuente(2, 1);
            conector.EstablecerAlineacion(ConectorPluginV3.ALINEACION_CENTRO)
            conector.EscribirTexto("Servico de Bascula\n");
            conector.EstablecerTamFuente(1, 1);
            conector.EstablecerAlineacion(ConectorPluginV3.ALINEACION_IZQUIERDA)
            conector.EscribirTexto("------------------------------------------------\n\n");
            conector.EscribirTexto("Fecha y hora: " + (new Intl.DateTimeFormat("es-MX").format(new Date())));
            conector.Feed(1);
            conector.EscribirTexto("Ticket Nro. : 000001 \n");
            conector.EscribirTexto("Operador : (03)- Guillermo Chiantore \n\n");
            conector.EscribirTexto("------------------------------------------------\n");
            conector.EscribirTexto("Origen:\n");
            conector.EstablecerTamFuente(1, 2);
            conector.EscribirTexto(data.origen+"\n");
            conector.EstablecerTamFuente(1, 1);
            conector.EscribirTexto("------------------------------------------------\n");
            conector.EscribirTexto("Destino:\n");
            conector.EstablecerTamFuente(1, 2);
            conector.EscribirTexto(data.destino+"\n");
            conector.EstablecerTamFuente(1, 1);
            conector.EscribirTexto("------------------------------------------------\n");
            conector.EscribirTexto("Producto:\n");
            conector.EstablecerTamFuente(1, 2);
            conector.EscribirTexto(data.producto+"\n");
            conector.EstablecerTamFuente(1, 1);
            conector.EscribirTexto("------------------------------------------------\n");
            conector.EstablecerTamFuente(2, 1);
            conector.EstablecerAlineacion(ConectorPluginV3.ALINEACION_CENTRO)
            conector.EscribirTexto("Detalle del Peso\n");
            conector.EstablecerTamFuente(1, 1);
            conector.EstablecerAlineacion(ConectorPluginV3.ALINEACION_IZQUIERDA)
            conector.EscribirTexto("------------------------------------------------\n\n");
            conector.EstablecerTamFuente(1, 1);
            conector.EscribirTexto("Bruto..: "+data.bruto.peso+"kg "+data.bruto.fecha+" - " + data.bruto.hora+" "+ data.bruto.tipo+". ("+data.bruto.op.id+")");
            conector.Feed(1)
            conector.EscribirTexto("Tara...: "+data.tara.peso+"kg " +data.tara.fecha+" - " + data.tara.hora+" "+ data.tara.tipo+". ("+data.tara.op.id+")");
            conector.Feed(1)
            conector.EscribirTexto("---------------------");
            conector.Feed(1)
            conector.EscribirTexto("Neto......: "+data.neto+"kg");
            conector.Feed(2);
            conector.EstablecerTamFuente(1, 1);
            conector.EscribirTexto("------------------------------------------------\n");
            conector.EstablecerTamFuente(2, 1);
            conector.EstablecerAlineacion(ConectorPluginV3.ALINEACION_CENTRO)
            conector.EscribirTexto("Datos del Transporte\n");
            conector.EstablecerTamFuente(1, 1);
            conector.EstablecerAlineacion(ConectorPluginV3.ALINEACION_IZQUIERDA)
            conector.EscribirTexto("------------------------------------------------\n");
            conector.EscribirTexto("Dominio Chasis..: "+data.chasis+"\n");
            conector.EscribirTexto("Dominio Acoplado: "+data.acoplado+"\n");
            conector.EscribirTexto("Datos del Chofer: "+data.chofer+"\n");
            conector.EscribirTexto("------------------------------------------------\n\n");
            conector.EscribirTexto("Condicion: Cotado\n");
            conector.EscribirTexto("------------------------------------------------\n");
            conector.EstablecerTamFuente(2, 1);
            conector.EstablecerAlineacion(ConectorPluginV3.ALINEACION_DERECHA)
            conector.EscribirTexto("Total a Pagar: $ 9999.99\n");
            conector.EstablecerTamFuente(1, 1);
            conector.EstablecerAlineacion(ConectorPluginV3.ALINEACION_IZQUIERDA)
            conector.EscribirTexto("------------------------------------------------\n\n");
            conector.EstablecerTamFuente(1, 1);
            conector.EstablecerAlineacion(ConectorPluginV3.ALINEACION_CENTRO)
            conector.EscribirTexto("****Comprobante no valido como factura****\n");
            conector.EscribirTexto("****Exija su factura al Operador****\n");
            conector.Feed(8);
            conector.Corte(5);
            conector.Pulso(48, 60, 120)


            const respuesta = await conector
                .imprimirEn(nombreImpresora);
            if (respuesta === true) {
                alert("Impreso correctamente");
            } else {
                alert("Error: " + respuesta);
            }
        },    
    },
    computed: {
        showErrors() {
            let formErrores=this.errores.join(" <---> ");
            return formErrores;
        },
        checkModo(){
            return this.getModo()
        },
        
        validaPesoBruto()
        {
            console.log("Entra a Validar")
            if (parseInt(this.bruto)>parseInt(this.ticket.tara.peso) 
                && parseInt(this.bruto)>=1000 && parseInt(this.bruto))
            {
                console.log("Devuelve 1")
                return 1
            }else{
                console.log("devuelve 0")
                return 0
            } 
        },
        validaPesoTara()
        {
            if (parseInt(this.tara)<parseInt(this.ticket.bruto.peso) 
                && parseInt(this.tara)>=1000)
            {
                return 1
            }else{
                return 0
            } 
        },

        
    },    
}
</script>

<style>
</style>