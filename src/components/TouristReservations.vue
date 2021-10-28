<template>
<div class="tableD">
    <h2 class="titleTable">Mis reservaciones Realizadas</h2>
        <table v-if="loaded">
            <thead>
                <tr>
                    <th>Titulo del tour</th>
                    <th>Costo</th>
                    <th>Numero de horas reservadas</th>
                    <th>Nombre del guia</th>
                    <th>N° Telefono</th>
                    <th>fecha y hora de reserva</th>
                </tr>
            </thead>
            <tbody>
                <tr  v-for="reser in datas" :key="reser.id" @click="SelectionReser(reser)">
                    <td>{{reser.tour.title}}</td>
                    <td>{{reser.tour.costo}}</td>
                    <td>{{reser.numberHours}}</td>
                    <td>{{reser.tour.nameGuide}}</td> 
                    <td>{{reser.tour.telephone}}</td>
                    <td>{{reser.time}}</td> 
                </tr>
            </tbody>
        </table>
        <br>
        <h3>Reservacion selecionada</h3>
        <h4>Nombre Tour: {{nameTour}}</h4>
        <h4>Hora y fecha de reservacion: {{timest}}</h4>
    <button  v-on:click="processCancel" class="btnSearch">Cancelar reservacion</button>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: "LoadReservationT",
    data:function(){
        return{
            datas:null,
            loaded:false,
            nameTour:"",
            timest:null,
            isSelected:false
        }
    },
    methods:{
        chargeReservations:function(){
            let userId = localStorage.getItem("idUser");
            axios.get(`http://127.0.0.1:8000/reservationsT/${userId}/`, {
          headers: {},
        })
        .then((result) => {
        this.datas=result.data;
        this.loaded=true;
        })
        .catch(() => {
          this.$emit("logOut");
        });
        },
        SelectionReser:function(){

        },
        processCancel:function(){

        }
    },
    created: function () {
    this.chargeReservations();
  },
}
</script>