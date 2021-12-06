<template>
  <article id="structure">
        <form v-on:submit.prevent="processCreateTour">
            <div id="main">
                <div id = "form">
                    <input type="text" id="name" class="from-input" autocomplete="off" v-model="tour.title" placeholder=" "/>
                    <label for="name" class="from-label">Titulo del tour</label>
                </div>
                <div id = "form">
                    <input type="text" id="name" class="from-input" autocomplete="off" v-model="tour.description" placeholder=" "/>
                    <label for="name" class="from-label">Descripcion del tour</label>
                </div>
                <div id = "form">
                    <input type="number" id="name" class="from-input" autocomplete="off" v-model="tour.costo"  placeholder=" "/>
                    <label for="name" class="from-label">Descripcion del Tour</label>
                </div>
            </div>
            
            <div id="seccion">
                <h3>{{ nameP }}</h3>
                <div id="seccion-select">
                    <select  name="Tipo de turismo" v-model="tour.typeTour">
                        <option value="Extremo">Extremo</option>
                        <option value="Tradicional">Tradicional</option>
                        <option value="Regular">Regular</option>
                        <option value="Natural">Natural</option>
                    </select>
                    <button type="submit">Agregar tour</button>
                </div>
            </div>
        </form>
        <br>
        <form v-on:submit.prevent="processcreatePlace">
                <div id="seccion-placeName">
                    <div id="form">
                        <input type="text" id="name" class="from-input" v-model="place.namePlace" placeholder=" " />
                        <label for="name" class="from-label">Nombre lugar</label>
                    </div>
                    <button type="submit" >Agregar Lugar</button>

            </div>
            <br>
        </form>
         <button id="button" v-on:click="chargePlaces">Buscar lugares</button>
                
            
            <div id="table-all">
                <table v-if="loaded" id="table">
                <thead>
                    <tr>
                        <th>codigoLugar</th>
                        <th>Nombre Lugar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="plac in datas" :key="plac.id">
                        <td>{{ plac.id }}</td>
                        <td @click="SelectionPlace(plac)">{{ plac.namePlace }}</td>
                    </tr>
                </tbody>
                </table>
              </div>
    </article>
</template>
<script>
import gql from "graphql-tag";
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
        costo: 0,
        typeTour: "Tradicional",
      },
      place: {
        namePlace: "",
      },
    };
  },
  methods: {
    validateLogin: async function(){
      await this.apollo
      .mutate({
        mutation: gql`
        mutation($refresh: String!){
          refreshToken(refresh: $refresh){
            access
          }
        }
      `,
      variables:{
        refresh:localStorage.getItem("token_refresh"),
      },
      }).then(result=>{
        localStorage.setItem("token_access",result.data.refreshToken.access);
        return true;
      }).catch((error)=>{
        return false;
      });
    },
    processCreateTour: async function () {
      this.tour.guide = localStorage.getItem("idUser");
      if(localStorage.getItem("token_access")===null || 
          localStorage.getItem("token_refresh")===null){
            this.$emit("logOut");
            return;
          }
      if(!validateLogin()){
        this.$emit("logOut");
        return;
      }
      await this.$apollo
      .mutate({
        mutation: gql`
          mutation($tourInput: TourInput!){
            createTour(tourInput: $tourInput)
            confirm
          }
        `,
        variables: {
          tourInput:this.tour,
        }
      }).then((result)=>{
        if (result.data.createTour.confirm) {
          alert("El tour se ha guardado!!");
        } else {
          alert("no se ha guardado");
        }
      }).catch((error)=>{
        console.log(error);
        alert("ERROR: Fallo en el registro.");
      });
    },
    SelectionPlace: function (pla) {
      this.tour.place = pla.id;
      this.nameP = pla.namePlace;
    },
    getQueryAllPlaces: function(){
      return {
        query: gql`
          query ($userId: Int!) {
            allPlaces(userId: $userId) {
              id
              namePlace
            }
          }
        `,
        variable: {
          userId: 2,
        },
      };
    },
    chargePlaces: async function () {
      await this.$apollo
        .query(getQueryAllPlaces())
        .then((result) => {
          this.datas=result.data.allPlaces;
        })
        .catch((error) => {
          console.log(error);
          alert("No ha sido posible cargar la lista de lugares");
        });
    },
    processcreatePlace: async function () {
      await this.$apollo
      .mutate({
        mutation: gql`
          mutation($placeInput: PlaceInput!){
            createPlace(placeInput: $placeInput)
            confirm
          }
        `,
        variables: {
          placeInput:this.place,
        }
      }).then((result)=>{
        alert("El lugar se ha guardado!!");
      }).catch((error)=>{
        console.log(error);
        alert("ERROR: Fallo en el registro del lugar.");
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