<template>
  <div class="hello">
    <button @click="imprimir()">IMPRIMIR</button>
  </div>
</template>

<script>
import {ConectorPluginV3} from "@/assets/js/conector.js"
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods:{
    imprimir(){
        const URLPlugin = "http://192.168.100.106:8000"/* "http://localhost:8000" */
        const nombreImpresora ="EPSON TM-T20II Receipt" /* $listaDeImpresoras.value; */
        this.imprimirHolaMundo(nombreImpresora, URLPlugin)
    },

    imprimirHolaMundo:async(nombreImpresora, URLPlugin)=> {
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
            conector.EscribirTexto("Mezzadra Sergio\n");
            conector.EstablecerTamFuente(1, 1);
            conector.EscribirTexto("------------------------------------------------\n");
            conector.EscribirTexto("Destino:\n");
            conector.EstablecerTamFuente(1, 2);
            conector.EscribirTexto("Bugia Gabriel\n");
            conector.EstablecerTamFuente(1, 1);
            conector.EscribirTexto("------------------------------------------------\n");
            conector.EscribirTexto("Producto:\n");
            conector.EstablecerTamFuente(1, 2);
            conector.EscribirTexto("Soja\n");
            conector.EstablecerTamFuente(1, 1);
            conector.EscribirTexto("------------------------------------------------\n");
            conector.EstablecerTamFuente(2, 1);
            conector.EstablecerAlineacion(ConectorPluginV3.ALINEACION_CENTRO)
            conector.EscribirTexto("Detalle del Peso\n");
            conector.EstablecerTamFuente(1, 1);
            conector.EstablecerAlineacion(ConectorPluginV3.ALINEACION_IZQUIERDA)
            conector.EscribirTexto("------------------------------------------------\n\n");
            conector.EstablecerTamFuente(1, 1);
            conector.EscribirTexto("Bruto.....: 45.000kg 07/02/2023 - 10:38 AUT.(01)");
            conector.Feed(1)
            conector.EscribirTexto("Tara......: 15.000kg 07/02/2023 - 10:38 MAN.(03)");
            conector.Feed(1)
            conector.EscribirTexto("---------------------");
            conector.Feed(1)
            conector.EscribirTexto("Neto......: 30.000kg 07/02/2023 - 10:38 OBS. ");
            conector.Feed(2);
            conector.EstablecerTamFuente(1, 1);
            conector.EscribirTexto("------------------------------------------------\n");
            conector.EstablecerTamFuente(2, 1);
            conector.EstablecerAlineacion(ConectorPluginV3.ALINEACION_CENTRO)
            conector.EscribirTexto("Datos del Transporte\n");
            conector.EstablecerTamFuente(1, 1);
            conector.EstablecerAlineacion(ConectorPluginV3.ALINEACION_IZQUIERDA)
            conector.EscribirTexto("------------------------------------------------\n");
            conector.EscribirTexto("Dominio Chasis: AA 456 GD\n");
            conector.EscribirTexto("Dominio Acoplado: AA 456 GD\n");
            conector.EscribirTexto("Dominio Chofer: Gimenez Fernando\n");
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
