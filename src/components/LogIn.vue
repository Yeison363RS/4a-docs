<template>
 
    <div class="container" id="container">
        
    <title>Ingreso Usuario</title>

        <div class="form-container sign-in-container">
            <form v-on:submit.prevent="processLogInUser">
                <h1>Iniciar sesión</h1>
                <br>
                <input type="email" v-model="user.email" placeholder="Correo" />
                <input type="password" v-model="user.password" placeholder="Contraseña" />
                <br>
                <button type="submit" >Iniciar sesión</button>
            </form>
        </div>

        <div class="overlay-container">
            <div class="overlay">
                <div class="overlay-panel overlay-right">
                    <h1>¡Hola, viajero!</h1>
                    <p>Ingresa tus datos personales para empezar a viajar con nosotros</p>
                    <button class="ghost" id="signUp" v-on:click="loadSignUp" >Registrarse</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import axios from 'axios';

export default {
    name: "LogIn",
    data: function(){
        return {
            user: {
                email:"",
                password:""
            }
        }
    },
    methods: {
        processLogInUser: function(){
            axios.post(
                "https://tourguide-be.herokuapp.com/login/", 
                this.user,  
                {headers: {}}
                )
                .then((result) => {
                    let dataLogIn = {
                        email: this.user.email,
                        token_access: result.data.access,
                        token_refresh: result.data.refresh,
                    }
                    
                    this.$emit('completedLogIn', dataLogIn)
                })
                .catch((error) => {
                    
                    if (error.response.status == "401")
                        alert("ERROR 401: Credenciales Incorrectas.");
                    
                });
        },

        loadSignUp: function(){
        this.$router.push({name: "signUp"})
        },
    }
    
}
</script>
