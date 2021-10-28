<template>

    <div class="greetings">
        <h2>¡Bienvenido  {{nameUser}} !</h2>
    </div>
    <div class="contain">
        <img class="images" src="../assets/imHome1.jpg">
        <img class="images"  src="../assets/imHome2.jpg">
        <img class="images" src="../assets/imHome3.jpg">
        <img class="images"  src="../assets/imHome4.jpg">
    </div>
</template>


<script>

export default {
    name: "Home",

    data: function(){
        return {
            nameUser: localStorage.getItem('name') || ""
        }
    }
}

</script>


<style>
    .greetings{
        margin: 0;
        padding: 0%;
        width: 100%;
    
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .greetings h1{
        font-size:30px;
        color: #283747;
    }

    .greetings span{
        color: crimson;
        font-weight: bold;
    }
    .contain {
    display: grid;
    grid-template-columns:1fr 1fr;
    grid-gap: 3px;
    }
    .images{
        height: 32vh;
        width: 65vh;
    }
</style>