<template>
  <div id="app" class="app">
    <div class="header">
      <h1>MiGuia.com</h1>
      <nav>
        <button v-if="loadedUser " v-on:click="loadHome">Inicio</button>
        <button v-if="loadedUser && tourist=='true'" v-on:click="loadSearch">Buscar Tours</button>
        <button v-if="loadedUser && tourist=='true'">Reservaciones</button>
        <button v-if="loadedUser && tourist=='false'" v-on:click="loadAddTour">Crear Tour</button>
        <button v-if="loadedUser && tourist=='false'" v-on:click="loadProfileGuide" >Perfil</button>
        <button v-if="loadedUser" v-on:click="logOut">Cerrar Sesión</button>
      </nav>
    </div>

    <div class="main-component">
      <router-view
        v-on:completedLogIn="completedLogIn"
        v-on:completedSignUp="completedSignUp"
      >
      </router-view>
    </div>

    <div class="footer">
      <h1>G2 Misión TIC</h1>
    </div>
  </div>
</template>
<script>
import jwt_decode from "jwt-decode";
import axios from 'axios';

export default {
  name: "App",

  data: function () {
    return {
      tourist: false,
      is_auth: false,
      loadedUser:false,
    };
  },

  components: {},

  methods: {

    verifyAuth:   function () {
      this.is_auth = localStorage.getItem("isAuth") || false;
      this.loadedUser=localStorage.getItem("loadedUser") || false;
      this.tourist=localStorage.getItem("tourist") || false;
      //this.is_auth=false;
     // this.$emit("logOut");
      if (this.is_auth == false) {
        this.$router.push({ name: "logIn" });
      }else{
        this.$router.push({ name: "home" });
      } 
    },

    getDatas: function () {
      if (localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null) {
        this.$emit("logOut");
        return;
      }
      
      let token = localStorage.getItem("token_access");
      let userId = jwt_decode(token).user_id.toString();
      axios.get(`https://tourguide-be.herokuapp.com/user/${userId}/`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((result) => {
          localStorage.setItem("name",result.data.name);
          localStorage.setItem("email",result.data.email);
          this.tourist = result.data.type_user=="T" ? 'true':'false';
          this.loadedUser=true;
          localStorage.setItem("loadedUser",this.loadedUser);
          localStorage.setItem("tourist",this.tourist);
        })
        .catch(() => {
          this.$emit("logOut");
        });
      this.verifyAuth();
    },
    loadLogIn: function () {
      this.$router.push({ name: "logIn" });
    },

    loadSignUp: function () {
      this.$router.push({ name: "signUp" });
    },

    completedLogIn: function (data) {
      localStorage.setItem("token_access", data.token_access);
      localStorage.setItem("idUser",jwt_decode(data.token_access).user_id.toString());
      localStorage.setItem("token_refresh", data.token_refresh);
      localStorage.setItem("isAuth", true);
      localStorage.setItem("email", data.email);
      alert("Autenticación Exitosa");
      this.getDatas();
      
    },
    completedSignUp: function (data) {
      alert("Registro Exitoso");
      this.completedLogIn(data);
    },

    loadHome: function () {
      this.$router.push({ name: "home" });
    },
    loadProfileGuide: function () {
      this.$router.push({ name:"profileG" });
    },
    loadSearch: function () {
      this.$router.push({ name: "search" });
    },

    logOut: function () {
      localStorage.clear();
      alert("Sesión Cerrada");
      this.verifyAuth();
    },
    loadAddTour:function(){
      this.$router.push({ name: "addTour" });
    },
  },

  created: function () {
    this.verifyAuth();
  },
};
</script>
<style scoped>
@import "./components/styles/normalize.css";
@import "./components/styles/all.css";
@import "./components/styles/styles.css";
@import "https://fonts.googleapis.com/css2?family=Roboto:wght@300;700&display=swap";
</style>
<style>
body {
  margin: 0 0 0 0;
}

.header {
  margin: 0%;
  padding: 0;
  width: 100%;
  height: 6vh;
  min-height: 60px;

  background-color: #00A867;
  color: #993B0F;

  display: inline-flex;
  justify-content: space-between;
  align-items: center;
}

.header h1 {
  width: 50%;
  font-size:40pt;
  text-align: center;
}

.header nav {
  height: 70%;
  width: 40%;

  display: inline-flex;
  justify-content: space-around;
  align-items: center;

  font-size: 20px;
}

.header nav button {
  color: #e5e7e9;
  background: #993B0F;
  border: 1px solid #e5e7e9;

  border-radius: 5px;
  padding: 10px 20px;
}

.header nav button:hover {
  color: #993B0F;
  background: #e5e7e9;
  border: 1px solid #e5e7e9;
}

.main-component {
  height: 75vh;
  margin: 0%;
  padding: 0%;
  position: relative;
  background: #00A867;
}

.footer {
  margin-top: 2vh;
  padding: 0;
  width: 100%;
  height: 5vh;
  min-height: 60px;
  background-color: #00A867;
  color: #e5e7e9;
}

.footer h2 {
  width: 100%;
  height: 60%;

  display: flex;
  justify-content: center;
  align-items: center;
}
#app {
  display: block;
  height: auto;
  margin: 0 0 0 0;
  padding: auto;
}
</style>
