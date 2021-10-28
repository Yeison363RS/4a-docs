<template>
    <div class="details">
    <h3>{{title}}</h3>
    <label>Valor del tour: {{costo}}</label>
    <br>
    <label>Descripcion del tour:</label>
    <p>{{description}}</p>
    <label>Tipo de turismo: {{typeTour}}</label>
    <br>
    <label>Lugar del tour: {{namePlace}}</label>
    <br>
    <label><strong> Informacion del guia</strong></label>
    <br>
    <label>Nombre: {{nameGuide}}</label>
    <br>
    <label>Numero telefonico: {{telephone}}</label>
    <form v-on:submit.prevent="addReservation">

        <p> Seleccione fecha y hora de la reservacion:
            <br>
            <input type="datetime-local" v-model="reservation.time" >
        </p>
        <p>ingrese el numero de horas de servicio que quiere reservar:
            <br> 
            <input type="number" v-model="reservation.numberHours" >
        </p>
        <input type="submit">
    </form>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: "Reservation",
    data:function(){
        return{
            title:"",
            costo:"",
            description:"",
            typeTour:"",
            nameGuide:"",
            telephone:"",
            namePlace:"",
            tourCharge:false,
            reservation:{
                tour:"",
                tourist:"",
                numberHours:0,
                time:""
            }
        };
    },
    methods:{
        chargeTour: function () {
        let idTour = localStorage.getItem("idTour");
        axios.get(`http://127.0.0.1:8000/tour/${idTour}/`, {
            headers: {},
            })
            .then((result) => {
            this.title=result.data.title;
            this.costo=result.data.costo;
            this.description=result.data.description;
            this.typeTour=result.data.typeTour;
            this.nameGuide=result.data.guide.name+" "+result.data.guide.surename;
            this.telephone=result.data.guide.telephone;
            this.namePlace=result.data.place.name;
            this.tourCharge=true;
            })
            .catch(() => {
            this.$emit("logOut");
            });
        },
        addReservation: function(){
            this.reservation.tour = localStorage.getItem("idTour");
            this.reservation.tourist=localStorage.getItem("idUser");
            axios.post("https://tourguide-be.herokuapp.com/c_reservation/", this.reservation, { headers: {} })
        .then((result) => {
          if (result.data.confirm) {
            alert("Se ha realizado la reserva del tour!!");
            this.$router.push({name: "search"});
          } else {
            alert("no se realizado la reserva :( ");
          }
        })
        .catch((error) => {
          console.log(error);
          alert("ERROR: Fallo en el registro.");
        });
        }
    },
    created: function () {
        this.chargeTour();
    },
}
</script>
<style>
.details{
    background: #CCB378;
}
</style>