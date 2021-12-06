<template>
  <div id="prin">
    <h2 class="titleTable">Buscador de Tours</h2>
    <div class="divpanesearch">
      <button v-on:click="chargeTours" class="btnSearch">Buscar</button>
    </div>
    <div class="tableD">
      <h4 class="textOption">Seleccione el tour de su interes</h4>
      <table>
        <thead>
          <tr>
            <th>Titulo del tour</th>
            <th>Costo</th>
            <th>Nombre Guia</th>
            <th>Lugar del tour</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="tourd in allTours"
            :key="tourd.id"
            @click="SelectionTour(tourd)"
          >
            <td>{{ tourd.title }}</td>
            <td>{{ tourd.costo }}</td>
            <td>{{ tourd.guidedatas.name }} {{ tourd.guidedatas.surename }}</td>
            <td>{{ tourd.placedatas.name }}</td>
          </tr>
        </tbody>
      </table>
      <br />
      <h3>{{ nameTour }}</h3>
      <button v-on:click="processReservation" class="btnSearch">
        Ver detalles
      </button>
    </div>
  </div>
</template>
<script>
import gql from 'graphql-tag';
export default {
    name: "SearchTour",
    data: function(){
        return {
            idTour:null,
            nameTour:"",
            allTours: []
        }
    },
    apollo:{
        allTours:{
            query:gql`
                query($tourId: Int!){
                    allTours(tourId: $tourId){
                        id
                        title
                        costo
                        description
                        guidedatas {
                            name
                            surename
                            telephone
                            id
                        }
                        placedatas {
                            name
                        }
                    } 
                }
            `,
            variables(){
                return{
                    tourId:1,
                };
            },
        }
    },
    methods: {
        SelectionTour: function(tourd){
        this.nameTour=tourd.title;
        this.idTour=tourd.id;  
        },
        processReservation: function(){
        localStorage.setItem("idTour",this.idTour);
        this.$router.push({name: "reservationTour"});
        }
    },
}
</script>
<style>
table {
  width: 100%;
  border: 1px solid #000;
}
td {
  width: 20%;
  text-align: left;
  vertical-align: top;
  border: 1px solid #babab5;
  border-collapse: collapse;
  padding: 0.3em;
  caption-side: bottom;
  background: #edfa87;
  color: #000;
}
thead {
  padding: 0.3em;
  color: #000;
  background: #f1f1df;
}

#prin {
  width: 100%;
  height: 100%;
  background-image: url("../assets/playa.jpg");
  align-items: center;
}
.titleTable {
  text-align: center;
  color: #fff;
}
.tableD {
  padding-top: 20px;
}
.divpanesearch {
  width: 100%;
  display: inline-block;
}
.btnSearch {
  text-align: center;
  float: right;
}
.textOption {
  color: #fff;
}
</style>