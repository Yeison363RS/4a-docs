<template>
  <div class="container" id="container">
    <title>Registro Usuario</title>

    <div id="global">
      <div class="form-container sign-in-container">
        <form v-on:submit.prevent="processSignUp">
          <h1>Crear cuenta</h1>
          <br />
          <input type="text" v-model="user.name" placeholder="Nombre" />
          <input type="text" v-model="user.surename" placeholder="Apellido" />
          <input type="text" v-model="user.telephone" placeholder="Teléfono" />
          <input
            type="text"
            v-if="isTourist"
            v-model="user.placeResidence"
            placeholder="Dirección de domicilio"
          />
          <input
            type="text"
            v-if="isTourist"
            v-model="user.nacionality"
            placeholder="Nacionalidad"
          />
          <input
            type="text"
            v-if="!isTourist"
            v-model="user.name_agency"
            placeholder="Nombre Agencia"
          />
          <input
            type="text"
            v-if="!isTourist"
            v-model="user.description"
            placeholder="descripcion Personal"
          />
          <input
            type="text"
            v-if="!isTourist"
            v-model="user.facebook"
            placeholder="Facebook"
          />
          <input
            type="text"
            v-if="!isTourist"
            v-model="user.instagram"
            placeholder="Instagram"
          />

          <input type="email" v-model="user.email" placeholder="Correo" />
          <input
            type="password"
            v-model="user.password"
            placeholder="Contraseña"
          />

          <h4>Elige tu roll</h4>
          <div id="divset">
            <div class="radioButton">
              <input
                type="radio"
                @change="confirmTurist"
                name="color"
                checked
                value="Turista"
              />Turista
            </div>
            <div class="radioButton">
              <input
                type="radio"
                @change="confirmGuide"
                name="color"
                value="Guia"
              />
              Guia
            </div>
          </div>
          <br />
          <button type="submit">Registrarse</button>
        </form>
      </div>
    </div>
    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-right">
          <h1>¡Bienvenido de vuelta!</h1>
          <p>
            Para mantenerte conectado con nosotros, por favor usa tus datos de
            inicio de sesión
          </p>
          <button class="ghost" id="signIn" v-on:click="loadLogIn">
            Iniciar sesión
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "SignUp",
  data: function () {
    return {
      isTourist: true,
      mutationSignUp: null,
      user: {
        email: "",
        password: "",
        name: "",
        surename: "",
        telephone: "",
        type_user: "T",
        placeResidence: "",
        nacionality: "",
        score: 2,
        name_agency: "",
        description: "",
        facebook: "",
        instagram: "",
      },
    };
  },

  methods: {
    processSignUp: async function () {
      await this.$apollo
        .mutate(mutationSignUp)
        .then((result) => {
          let dataSignUp = getTokensLogin(result);
          this.$emit("completedSignUp", dataSignUp);
        })
        .catch((error) => {
          alert("Error: Fallo en el registro");
        });
    },
    getTokensLogin: function (result) {
      if (this.isTourist) {
        return {
          email: this.user.email,
          token_access: result.data.signUpTourist.access,
          token_refresh: result.data.signUpTourist.refresh,
        };
      } else {
        return {
          email: this.user.email,
          token_access: result.data.signUpGuide.access,
          token_refresh: result.data.signUpGuide.refresh,
        };
      }
    },
    loadLogIn: function () {
      this.$router.push({ name: "logIn" });
    },

    confirmTurist: function () {
      this.isTourist = true;
      this.user.type_user = "T";
      this.mutationSignUp = {
        mutation: gql`
          mutation ($userInput: TouristInput) {
            signUpTourist(userInput: $userInput) {
              access
              refresh
            }
          }
        `,
        variables: {
          userInput: this.getDatasTourist(),
        },
      };
    },
    getDatasTourist: function () {
      return {
        email: this.user.email,
        password: this.user.password,
        name: this.user.name,
        surename: this.user.surename,
        telephone: this.user.telephone,
        type_user: this.user.type_user,
        placeResidence: this.user.placeResidence,
        nacionality: this.user.nacionality,
      };
    },
    getDatasGuide: function () {
      return {
        email: this.user.email,
        password: this.user.password,
        name: this.user.name,
        surename: this.user.surename,
        telephone: this.user.telephone,
        type_user: this.user.type_user,
        score: this.user.score,
        name_agency: this.user.name_agency,
        description: this.user.description,
        facebook: this.user.facebook,
        instagram: this.user.instagram,
      };
    },
    confirmGuide: function () {
      this.isTourist = false;
      this.user.type_user = "G";
      this.mutationSignUp = {
        mutation: gql`
          mutation ($userInput: GuideInput) {
            signUpGuide(userInput: $userInput) {
              access
              refresh
            }
          }
        `,
        variables: {
          userInput: this.getDatasGuide(),
        },
      };
    },
  },
};
</script>
<style>
.radioButton {
  display: inline-block;
  margin: 20 20 20 20;
  border: 0px none;
}
#divset {
  border: 0px none;
  border-color: transparent;
  width: 50%;
  display: inline-block;
  align-items: justify;
  color: lightslategray;
}
#global {
  height: 400px;
  max-height: 400px;
  width: 500px;
  border: 1px solid #ddd;
  background: #f1f1f1;
  overflow-y: scroll;
}
h4 {
  margin: 0px;
}
</style>