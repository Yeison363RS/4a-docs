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
            <h3 class="head-info">
              {{ guideDetailById.name }} {{ guideDetailById.surename }}
            </h3>
            <h3 class="head-info">
              {{ guideDetailById.type_user }} en Colombia
            </h3>
          </div>
        </div>

        <div id="head-link">
          <a href="#">{{ guideDetailById.email }} </a>

          <h3>telefono :{{ guideDetailById.telephone }}</h3>
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
            {{ guideDetailById.description }}
          </p>
          <p>Calificacion general {{ guideDetailById.score }}</p>
          <p>Nombre de la agencia {{ guideDetailById.nameAgency }}</p>
        </div>
        <div id="body-socialMedia">
          <a href="{{guideDetailById.facebook}}"
            ><img src="../assets/facebook.png"
          /></a>
          <a href="{{guideDetailById.instagram}}"
            ><img src="../assets/instagram.png"
          /></a>
          <a href="#"><img src="../assets/twitter.png" /></a>
          <a href="#"><img src="../assets/whatsapp.png" /></a>
        </div>
      </div>
    </article>
  </div>
</template>
<script>
import gql from "graphql-tag";
export default {
  name: "ProfileGuide",

  data: function () {
    return {
      userId: localStorage.getItem("idUser"),
      guideDetailById: {
        id: "",
        password: "",
        name: "",
        surename: "",
        email: "",
        telephone: "",
        score: 0,
        type_user: "",
        name_agency: "",
        description: "",
        facebook: "",
        instagram: "",
      },
    };
  },
  apollo: {
    guideDetailById: {
      query: gql`
          query($userId: Int!){
            guideDetailById(userId: $userId){
              id
              password
              name
              surename
              email
              telephone
              score
              type_user
              name_agency
              description
              facebook
              instagram
            }
          }
      `,
      variables() {
        return {
          userId: this.userId,
        };
      },
    },
  },
};
</script>
<style>
#pri {
  background: #fff;
}
</style>
