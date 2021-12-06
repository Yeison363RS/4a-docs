<template>
    <div class="details">
        <h2>{{tourById.title}}</h2>
        <ul>       
            <li><b>
                Valor del tour: </b> <i>{{tourById.costo}}</i>
            </li>
        <div class="background-details">
            <li><h3>Descripcion del tour</h3></li>
            <ul>
                <li><p>{{tourById.description}}</p></li>
                <li>Tipo de turismo: <i>{{tourById.typeTour}}</i> </li>
            </ul>
        </div>

        <div class="background-details">
            <li><h3>Informacion del guia</h3></li>
            <ul>
                <li>Numero telefonico: <i>{{tourById.guidedatas.telephone}}</i> </li>
                <li>Nombre del guia: <i>{{tourById.guidedatas.name}}{{tourById.guidedatas.surename}}</i> </li>
                <li>Lugar del tour: <i>{{tourById.placedatas.namePlace}}</i> </li>   
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
import gql from 'graphql-tag';
export default {
    name: "Reservation",
    data:function(){
        return{
            tourById:{
                id:0,
                title:"",
                costo:"",
                description:"",
                typeTour:"",
                guidedatas :{
                    id:0,                    
                    name:"",
                    surename:"",
                    telephone:"",
                },
                placedatas :{
                name:""
                }
            },
            reservation:{
                numberHours: 0,
                tourId: "",
                touristId: "",
                time: ""
            }
        };
    },
    apollo:{
        tourById:{
            query:gql`
            query($tourId: Int!){
                tourById(tourId: $tourId){

                }
            }
            `,
            variables(){
                return{
                    tourId:localStorage.getItem("idTour")
                }
            },
        }
    },
    methods:{
        addReservation: async function(){
            this.reservation.tour = this.tourById.id;
            this.reservation.tourist=localStorage.getItem("idUser");
            await this.$apollo
            .mutate({
                mutation:gql`
                    mutation($reservationInput: ReservationInput){
                        createReservation(reservationInput: $reservationInput){
                            id
                            numberHours
                            time
                        }
                    }
                `,
                variables:{
                    reservationInput:this.reservation
                },
            })
            .then((result)=>{
                if(result.data.createReservation.id != ""){
                    alert("Se ha realizado la reserva del tour!!");
                    this.$emit("loadSearch");
                }
            }).catch((error)=>{
                console.log(error);
                alert("ERROR: Fallo en el registro.");
            });
        }
            
    },
}
</script>
<style>
.details{
    background: #CCB378;
    color:#000;
}
</style>