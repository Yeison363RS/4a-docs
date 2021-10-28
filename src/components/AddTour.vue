<template>
  <form v-on:submit.prevent="processCreateTour">
    <input type="text" v-model="tour.title" placeholder="Titulo del tour" />
    <input
      type="text"
      v-model="tour.description"
      placeholder="Descripcion del Tour"
    />
    <input type="number" v-model="tour.costo" placeholder="Costo del tour" />
    <h4>{{ nameP }}</h4>
    <select name="Tipo de turismo" v-model="tour.typeTour">
      <option value="Extremo">Extremo</option>
      <option value="Tradicional">Tradicional</option>
      <option value="Regular">Regular</option>
      <option value="Natural">Natural</option>
    </select>
    <button type="submit">Agregar tour</button>
  </form>
  <div id="seachPlace">
        <button v-on:click="chargePlaces">Buscar lugares</button>
      <table v-if="loaded">
        <thead>
          <tr>
            <th>Nombre Lugar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="plac in datas" :key="plac.id">
            <td @click="SelectionPlace(plac)">{{ plac.namePlace }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  <br>
  <form v-on:submit.prevent="processcreatePlace">
    <input type="text" v-model="place.namePlace" placeholder="Nombre lugar" />
    <button type="submit">Agregar Lugar</button>
  </form>
</template>
<script>
import axios from "axios";
export default {
  name: "AddTour",
  data: function () {
    return {
      loaded: false,
      datas: null,
      nameP: "",
      typeT: "",
      tour: {
        place: 1,
        guide: 2,
        title: "",
        description: "",
        costo: "",
        typeTour: "Tradicional",
      },
      place: {
        namePlace: "",
      },
    };
  },
  methods: {
    processCreateTour: function () {
      this.tour.guide = localStorage.getItem("idUser");
      axios
        .post("https://tourguide-be.herokuapp.com/c_tour/", this.tour, { headers: {} })
        .then((result) => {
          if (result.data.confirm) {
            alert("El tour se ha guardado!!");
          } else {
            alert("no se ha guardado");
          }
        })
        .catch((error) => {
          console.log(error);
          alert("ERROR: Fallo en el registro.");
        });
    },
    SelectionPlace: function (pla) {
      this.tour.place = pla.id;
      this.nameP = pla.namePlace;
    },
    chargePlaces: function () {
      axios
        .get(`https://tourguide-be.herokuapp.com/all_places/`, { headers: {} })
        .then((result) => {
          this.datas = result.data;
          this.loaded = true;
        })
        .catch(() => {
          alert("No ha sido posible cargar la lista de lugares");
        });
    },
    processcreatePlace: function () {
      axios
        .post("https://tourguide-be.herokuapp.com/c_place/", this.place, { headers: {} })
        .then((result) => {
          if (result.data.confirm) {
            alert("El lugar se ha guardado!!");
          } else {
            alert("no se ha guardado");
          }
        })
        .catch((error) => {
          console.log(error);
          alert("ERROR: Fallo en el registro.");
        });
    },
  },
};
</script>
<style>
td {
  cursor: pointer;
}
td:hover{
    background: #CCB378;
}
</style>