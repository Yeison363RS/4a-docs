<template>
    <div class="details">
    <h3>{{title}}</h3>
    <label>Valor del tour: {{costo}}</label>
    <label>Descripcion del tour</label>
    <p>{{description}}</p>
    <label>Tipo de turismo: {{typeTour}}</label>
    <label>Informacion del guia</label>
    <label>Numero telefonico: {{telephone}}</label>
    <label>Lugar del tour: {{namePlace}}</label>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: "Reservation",
    datas:function(){
        return{
            title:"",
            costo:"",
            description:"",
            typeTour:"",
            nameGuide:"",
            telephone:"",
            namePlace:"",
            tourCharge:false
        };
    },
    methods:{
        chargeTour: async function () {
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