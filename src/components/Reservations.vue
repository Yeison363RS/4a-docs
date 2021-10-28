<template>
<div class="tableD">
    <h2 class="titleTable">Mis reservaciones</h2>
        <table v-if="loaded">
            <thead>
                <tr>
                    <th>Titulo del tour</th>
                    <th>Costo</th>
                    <th>Numero de horas reservadas</th>
                    <th>Nombre del turista</th>
                    <th>N° Telefono</th>
                    <th>fecha y hora de reserva</th>
                </tr>
            </thead>
            <tbody>
                <tr  v-for="reser in datas" :key="reser.id">
                    <td>{{reser.tour.title}}</td>
                    <td>{{reser.tour.costo}}</td>
                    <td>{{reser.numberHours}}</td>
                    <td>{{reser.tourist.name}} {{reser.tourist.surname}}</td> 
                    <td>{{reser.tourist.telephone}}</td>
                    <td>{{reser.time}}</td> 
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: "LoadReservation",
    data:function(){
        return{
            datas:null,
            loaded:false
        }
    },
    methods:{
        chargeReservations:function(){
            let userId = localStorage.getItem("idUser");
            axios.get(`http://127.0.0.1:8000/reservations/${userId}/`, {
          headers: {},
        })
        .then((result) => {
        this.datas=result.data;
        this.loaded=true;
        })
        .catch(() => {
          this.$emit("logOut");
        });
        }
    },
    created: function () {
    this.chargeReservations();
  },
}
</script>