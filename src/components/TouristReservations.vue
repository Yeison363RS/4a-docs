<template>
 <article id="section-TR">
    <div class="tableD">
        <div class="center">
            <h2 class="titleTable">Mis reservaciones Realizadas</h2>
        </div>
            <div id="table-all">
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
            </div>

            <div class="center">
                <br>
                <h3>Reservacion selecionada</h3>
                <h4>Nombre Tour: {{nameRes}}</h4>
                <h4>Hora y fecha de reservacion: {{timest}}</h4>
                <button  v-on:click="processCancel" class="btnSearch">Cancelar reservacion</button>
            </div>
        </div>
    </article>
</template>
<script>
import axios from "axios";
export default {
  name: "LoadReservationT",
  data: function () {
    return {
      datas: null,
      loaded: false,
      nameRes: "",
      timest: null,
      idReserv: null,
      isSelected: false,
    };
  },
  methods: {
    chargeReservations: function () {
      let userId = localStorage.getItem("idUser");
      axios
        .get(`https://tourguide-be.herokuapp.com/reservationsT/${userId}/`, {
          headers: {},
        })
        .then((result) => {
          this.datas = result.data;
          this.loaded = true;
        })
        .catch(() => {
          this.$emit("logOut");
        });
    },
    SelectionReser: function (reserv) {
      this.isSelected = true;
      this.nameRes = reserv.tour.title;
      this.timest = reserv.time;
      this.idReserv = reserv.id;
    },
    processCancel: function () {
    
      axios.delete(`https://tourguide-be.herokuapp.com/deleteR/${this.idReserv}/`, {
          headers: {},
        })
        .then((result) => {
            alert("Se a cancelado la reserva");
            this.chargeReservations();

        })
        .catch(() => {
          this.$emit("logOut");
        });
    },
  },
  created: function () {
    this.chargeReservations();
  },
};
</script>