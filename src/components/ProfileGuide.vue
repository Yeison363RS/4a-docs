<template>
  <div id="pri" v-if="profileCharge">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <title>Mi perfil</title>
    </head>
    <article id="head">
      <div id="head-container">
        <div id="head-content">
          <img src="../assets/profile.jpg" />
          <div id="head-info">
            <h3 class="head-info">{{nameu}}</h3>
            <h3 class="head-info">{{type_user}} en Colombia</h3>
          </div>
        </div>

        <div id="head-link">
          <a href="#">{{email}} </a>
          
          <h3>telefono :{{telephone}}</h3>
        </div>
        <img />
      </div>
    </article>

    <article id="body">
      <div id="body-infoCert">
        <h3>Lincencias y Certificados</h3>
        <div id="body-certificates">
          <ul>
            <li>Certificado de natacion</li>
            <li>Certificado de primeros auxilios</li>
            <li>Certificados de idiomas nivel B1</li>
            <li>Certificado de manejo en alturas</li>
          </ul>
        </div>
      </div>
      <div id="body-info">
        <h3>Sobre mi</h3>
        <div id="body-aboutMe">
          <p>
            {{description}}
          </p>
          <p>Calificacion general {{score}}</p>
           <p>Nombre de la agencia {{nameAgency}}</p>
        </div>
        <div id="body-socialMedia">
          <a href="{{facebook}}"><img src="../assets/facebook.png" /></a>
          <a href="{{instagram}}"><img src="../assets/instagram.png" /></a>
          <a href="#"><img src="../assets/twitter.png" /></a>
          <a href="#"><img src="../assets/whatsapp.png" /></a>
        </div>
      </div>
    </article>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "ProfileGuide",
  data: function () {
    return {
        profileCharge:false,
        nameu: "",
        email: "",
        telephone: "",
        score:0,
        type_user:"",
        nameAgency:"",
        description:"",
        facebook:"",
        instagram:"",
    };
  },
  methods: {
    chargeProfile: async function () {
      if (
        localStorage.getItem("token_access") === null ||
        localStorage.getItem("token_refresh") === null
      ) {
        this.$emit("logOut");
        return;
      }
    await this.verifyToken();
      let token = localStorage.getItem("token_access");
      let userId = localStorage.getItem("idUser");
      axios
        .get(`https://tourguide-be.herokuapp.com/guide/${userId}/`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((result) => {
        this.nameu=localStorage.getItem("name") +" "+ result.data.surename;
        this.email=localStorage.getItem("email")
        this.telephone=result.data.telephone;
        this.score=result.data.score;
        this.nameAgency=result.data.name_agency;
        this.description=result.data.description;
        this.facebook=result.data.facebook;
        this.instagram=result.data.instagram
        this.type_user=localStorage.getItem("tourist")=="false" ? "Guia":"Turista";
        this.profileCharge=true;
        })
        .catch(() => {
          this.$emit("logOut");
        });
    },
    verifyToken: function () {
            return axios.post("https://tourguide-be.herokuapp.com/refresh/", {refresh: localStorage.getItem("token_refresh")}, {headers: {}})
				.then((result) => {
					localStorage.setItem("token_access", result.data.access);		
				})
				.catch(() => {
					this.$emit('logOut');
				});
        }
  },
  created: function () {
    this.chargeProfile();
  },
};
</script>
<style>
#pri {
  background: #fff;
}
</style>
