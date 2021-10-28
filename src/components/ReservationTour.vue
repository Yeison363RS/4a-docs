<template>
    <div class="details">
        <h2>{{title}}</h2>
        <ul>       
            <li><b>
                Valor del tour: </b> <i>{{costo}}</i>
            </li>
        <div class="background-details">
            <li><h3>Descripcion del tour</h3></li>
            <ul>
                <li><p>{{description}}</p></li>
                <li>Tipo de turismo: <i>{{typeTour}}</i> </li>
            </ul>
        </div>

        <div class="background-details">
            <li><h3>Informacion del guia</h3></li>
            <ul>
                <li>Numero telefonico: <i>{{telephone}}</i> </li>
                <li>Lugar del tour: <i>{{namePlace}}</i> </li>   
            </ul>
        </div>
        </ul>
    <form v-on:submit.prevent="addReservation">

        <p> Seleccione fecha y hora de la reservacion:
            <br>
            <input type="datetime-local" v-model="reservation.time" >
        </p>
        <p>ingrese el numero de horas de servicio que quiere reservar:
            <br> 
            <input type="number" v-model="reservation.numberHours" >
        </p>
        <button type="submit">Reservar</button>
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
        axios.get(`https://tourguide-be.herokuapp.com/tour/${idTour}/`, {
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
    color:#000;
}
</style>