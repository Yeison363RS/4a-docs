<template>
 
    <div class="container" id="container">
        
    <title>Registro Usuario</title>
    
        <div id="global">
        <div class="form-container sign-in-container" >
            <form v-on:submit.prevent="processSignUp">
                <h1>Crear cuenta</h1>
                                <br>
                <input type="text" v-model="user.name" placeholder="Nombre" />
                <input type="text" v-model="user.surename" placeholder="Apellido" />
                <input type="text" v-model="user.telephone" placeholder="Teléfono" />
                <input type="text" v-if="isTourist" v-model="user.placeResidence" placeholder="Dirección de domicilio" />
                <input type="text" v-if="isTourist" v-model="user.nacionality" placeholder="Nacionalidad" />
                <input type="text" v-if="!isTourist" v-model="user.name_agency" placeholder="Nombre Agencia" />
                <input type="text" v-if="!isTourist" v-model="user.description" placeholder="descripcion Personal" />
                <input type="text" v-if="!isTourist" v-model="user.facebook" placeholder="Facebook" />
                <input type="text" v-if="!isTourist" v-model="user.instagram" placeholder="Instagram" />

                <input type="email" v-model="user.email" placeholder="Correo" />
                <input type="password" v-model="user.password" placeholder="Contraseña" />

                
                <h4>Elige tu  roll</h4>
                <div id="divset">
                <div  class="radioButton"><input type="radio"  @change="confirmTurist" name="color" checked value="Turista">Turista</div>
                <div class="radioButton" ><input type="radio" @change="confirmGuide" name="color"  value="Guia"> Guia</div>
                </div>
                 <br>
                <button type="submit" >Registrarse</button>
            </form>
        </div>
        </div>
        <div class="overlay-container">
            <div class="overlay">
                <div class="overlay-panel overlay-right">
                    <h1>¡Bienvenido de vuelta!</h1>
                    <p>Para mantenerte conectado con nosotros, por favor usa tus datos de inicio de sesión</p>
                    <button class="ghost" id="signIn" v-on:click="loadLogIn" >Iniciar sesión</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import axios from 'axios';
export default {
    name: "SignUp", 
     data: function(){
            return {
                isTourist:true,
                urlCreate:"https://tourguide-be.herokuapp.com/tourist/",
                user: {
                    email: "",
                    password: "",
                    name: "",
                    surename: "",
                    telephone: "",
                    type_user:"T",
                    placeResidence: "",
                    nacionality: "",
                    score:2,
                    name_agency:"",
                    description:"",
                    facebook:"",
                    instagram:""
                }
            } 
    
    },

    methods: {
        processSignUp: async function(){
            await axios.post(
                this.urlCreate, 
                this.user,  
                {headers: {}}
            )
              .then((result) => {
                    let dataSignUp = {
                        email: this.user.email,
                        token_access: result.data.access,
                        token_refresh: result.data.refresh,
                    }
                    
                    this.$emit('completedSignUp', dataSignUp)
                })
                .catch((error) => {
                    console.log(error)
                    alert("ERROR: Fallo en el registro.");  
                });
        },

        loadLogIn: function(){
        this.$router.push({name: "logIn"})
        },

        confirmTurist: function(){
        this.isTourist=true;
        this.user.type_user="T";
        this.urlCreate="https://tourguide-be.herokuapp.com/tourist/";
        },
        confirmGuide: function(){
        this.isTourist=false;
        this.user.type_user="G";
        this.urlCreate="https://tourguide-be.herokuapp.com/guide/";
        }
        
    }
       
}
</script>
<style>
.radioButton{
    display: inline-block;
    margin: 20 20 20 20;
    border:0px none;
};
#divset{
    border:0px none;
    border-color:transparent;
    width: 50%;
    display :inline-block;
    align-items: justify;
    color:lightslategray;
};
#global {
	height: 400px;
    max-height: 400px;
	width: 500px;
	border: 1px solid #ddd;
	background: #f1f1f1;
	overflow-y: scroll;
}
h4{
    margin:0px;
}
</style>