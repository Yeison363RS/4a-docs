<template>
  <article id="section-Reservations">
    <div class="tableD">
      <div class="center">
        <h2 class="titleTable">Mis reservaciones</h2>
      </div>
      <div id="table-all">
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
            <tr v-for="reser in reservationByIdTourist" :key="reser.id">
              <td>{{ reser.tourdatas.title }}</td>
              <td>{{ reser.tourdatas.costo }}</td>
              <td>{{ reser.numberHours }}</td>
              <td>{{ reser.touristdatas.name }} {{ reser.touristdatas.surname }}</td>
              <td>{{ reser.touristdatas.telephone }}</td>
              <td>{{ reser.time }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </article>
</template>
<script>
import gql from "graphql-tag";
export default {
  name: "LoadReservation",
  data: function () {
    return {
      reservationByIdGuide: [],
    };
  },
  apollo:{
      reservationByIdGuide:{
           query: gql`
          query ($guideId: Int!) {
            reservationByIdGuide(guideId: $guideId) {
              id
              numberHours
              time
              touristdatas {
                id
                name
                surename
                telephone
                nacionality
              }
              tourdatas {
                id
                title
                costo
                description
                typeTour
                guide
                nameGuide
                telephone
              }
            }
          }
        `,
        variable: {
          guideId: 2,
        },
      }
  },
  created: function () {
      this.$apollo.queries.reservationByIdGuide.refetch();
  }
};
</script>