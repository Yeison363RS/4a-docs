<template>
 <article id="section-TR">
    <div class="tableD">
        <div class="center">
            <h2 class="titleTable">Mis reservaciones Realizadas</h2>
        </div>
            <div id="table-all">
            <table >
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
                    <tr  v-for="reser in reservationByIdTourist" :key="reser.id" @click="SelectionReser(reser)">
                        <td>{{reser.tourdatas.title}}</td>
                        <td>{{reser.tourdatas.costo}}</td>
                        <td>{{reser.numberHours}}</td>
                        <td>{{reser.tourdatas.nameGuide}}</td> 
                        <td>{{reser.tourdatas.telephone}}</td>
                        <td>{{reser.time}}</td> 
                    </tr>
                </tbody>
            </table>
            </div>

            <div class="center" v-if="isSelected">
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
import gql from "graphql-tag";
export default {
  name: "LoadReservationT",
  data: function () {
    return {
      reservationByIdTourist: [],
      nameRes: "",
      timest: null,
      idReserv: null,
      isSelected: false,
    };
  },
  apollo:{
    reservationByIdTourist:{
      query:gql`
        query ($touristId: Int!){
          reservationByIdTourist(touristId: $touristId){
            id
            numberHours
            time
            touristdatas {
              id
              name
            }
            tourdatas {
              nameGuide
              telephone
              title
              costo
              id
              description
            }
          }
        }
      `,
      variables(){
        return{
          touristId:localStorage.getItem("idUser")
        }
      }
    }
  },
  methods: {
    SelectionReser: function (reserv) {
      this.nameRes = reserv.tourdatas.title;
      this.timest = reserv.time;
      this.idReserv = reserv.id;
      this.isSelected = true;
    },

    processCancel: async function () {
      await this.$apollo
        .mutate({
          mutation:gql`
            mutation($reservationId: String!){
              deleteReservation(reservationId: $reservationId)
            }
          `,
          variables:{
            reservationId:this.idReserv
          },
        }).then((result)=>{
          console.log(result.data.deleteReservation);
          alert("Se a cancelado la reserva");
        }).catch((error)=>{
          console.log(error);
          alert("No se ha podido realizar la cncelacion de la reserva");
        });
    },
  },
};
</script>