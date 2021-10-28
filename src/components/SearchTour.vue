<template>
<div id="prin">
    <div>
        <!--<img src="@/assets/playa.jpg">-->
    </div>
    <h2 class="titleTable">Buscador de Tours</h2>
    <div class="divpanesearch">
    <button v-on:click="chargeTours" class="btnSearch">Buscar</button>
    </div>
    <div class="tableD">
        <h4 class="textOption">Seleccione el tour de su interes</h4>
    <table v-if="loaded">
        <thead>
            <tr>
                <th>Titulo del tour</th>
                <th>Costo</th>
                <th>Nombre Guia</th>
                <th>Lugar del tour</th>
            </tr>
        </thead>
        <tbody>
            <tr  v-for="tourd in datas" :key="tourd.id"  @click="SelectionTour(tourd)">
                <td>{{ tourd.title }}</td>
                <td>{{ tourd.costo }}</td>
                <td>{{ tourd.guide.name }} {{ tourd.guide.surename}}</td>
                <td>{{ tourd.place.name }}</td> 
            </tr>
        </tbody>
    </table>
    <br>
    <h3>{{nameTour}}</h3>
    <button  v-on:click="processReservation" class="btnSearch">Ver detalles</button>
    </div>
</div>
</template>
<script>
import axios from 'axios';
export default {
    name: "SearchTour",
    data: function(){
        return {
            idTour:null,
            nameTour:"",
            datas: null,
            loaded: false,
        }
    },
    methods: {
        chargeTours: function(){
             axios.get(`http://127.0.0.1:8000/all_tours/`,
              {headers: {}})
                .then((result) => {
                    this.datas = result.data;
                    this.loaded=true;
                    })
                .catch(() => {
                    this.$emit('logOut');
                });
        },
        SelectionTour: function(tourd){
        this.nameTour=tourd.title;
        this.idTour=tourd.id;  
        },
        processReservation: function(){
        localStorage.setItem("idTour",this.idTour);
        this.$router.push({name: "reservationTour"});
        }
    },
    created: function () {
        this.chargeTours();
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
   border: 1px solid #BABAB5;
   border-collapse: collapse;
   padding: 0.3em;
   caption-side: bottom;
   background: #EDFA87;
   color: #000;
}
thead{
    padding: 0.3em;
    color: #000;
    background: #F1F1DF;
}

#prin{
    width: 100%;  
    height: 100%;
    background-image: url("../assets/playa.jpg");
    align-items: center;
}
.titleTable{
    text-align: center;
    color:#fff
}
.tableD{
     padding-top: 20px;
}
.divpanesearch{
    width:100%;
    display : inline-block;
}
.btnSearch{
    text-align:center;
    float:right;
}
.textOption{
    color:#fff;
}
</style>