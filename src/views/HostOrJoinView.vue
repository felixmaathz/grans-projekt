<!-- CSS OK for laptop + phone -->
<template>
  <body>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <div class="backButtonDiv">
      <button v-on:click="this.$router.go(-1)" class="backButton"><span class="material-symbols-outlined">
      arrow_back</span></button>
    </div>

    <div class="buttons">

      <router-link v-bind:to="'/choosegamemode/'+lang"><button class="gameButtons">{{uiLabels.hostAGame}}</button></router-link>
      <br>
      <router-link v-bind:to="'/clientjoingame/'+lang"><button class="gameButtons">{{uiLabels.joinAGame}}</button></router-link>
    </div>
  </body>
</template>

<script>

import io from 'socket.io-client';
const socket = io();

export default {
  name: "HostOrJoinView",

  data: function () {
    return {
      uiLabels: {},
      lang: "",
    }
  },
  created: function () {
     this.lang = this.$route.params.lang;
     socket.emit("pageLoaded", this.lang);
     socket.on("init", (labels) => {
       this.uiLabels = labels
     })
  },
}
</script>

<style scoped>
body {
  background: #EF233C;
  background: radial-gradient(circle, #EF233C 35%, #D80032 90%);
  width: 100vw;
  height: 100vh;
  overflow: auto;
  font-family: "Silkscreen", cursive;
}
.buttons{
  margin-top: 20vh;
}

.gameButtons{
  font-family: "Press Start 2P",cursive;
  color: #FEF9CC;
  background-color: #00C3BA;
  /*-webkit-text-stroke: 1px black;*/
  cursor: pointer;
  min-width: 600px;
  width: fit-content;
  min-height: 15vh;
  height: fit-content;
  margin: 20px;
  font-size: 3.5em;
  text-shadow: 2px 2px #1F6E77;
  /*border-radius: 4vw;*/
  box-shadow: inset -0.15em -0.15em #268b96;
  border-color: #2B211B;
  border-width: 8px;
  border-style: solid ;
  /*transition-duration: 0.15s;*/
  }
.gameButtons:hover{
  padding-right: 0.05em;
  padding-top: 0.05em;
  background-color: #31a6b2;
  box-shadow: inset -0.1em -0.1em #027a75;
  /*border-width: 0.3vw;*/
  color: #FEF9CC;
}
.backButtonDiv{
  width: 10vw;
  height: 10vh;
  margin-right: 10vw;
}
.backButton{
  font-family: "Press Start 2P",cursive;
  color: #FEF9CC;
  background-color: #00C3BA;
  /*-webkit-text-stroke: 1px black;*/
  cursor: pointer;
  width: 10vw;
  height: 10vh;
  margin: 2vw;
  font-size: 0.9vw;
  text-shadow: 2px 2px #1F6E77;
  /*border-radius: 4vw;*/
  box-shadow: inset -0.35em -0.35em #268b96;
  border-color: #2B211B;
  border-width: 0.4vw;
  border-style: solid ;
  /*transition-duration: 0.15s;*/
}
.backButton:hover{
  background-color: #31a6b2;
  box-shadow: inset -0.25em -0.25em #027a75;
  /*border-width: 0.3vw;*/
  color: #FEF9CC;
}
.material-symbols-outlined {
  font-size: 4vw ;
  font-variation-settings:
      'FILL' 1,
      'wght' 700,
      'GRAD' 200,
      'opsz' 48
}
/* OPTIMIZATION FOR PHONE */
@media (max-width: 700px) {
  body {
    background: #EF233C;
    background: radial-gradient(circle, #EF233C 35%, #D80032 90%);
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    font-family: "Silkscreen", cursive;
  }
  .buttons{
    position: absolute;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    bottom: 25%;
  }
  .gameButtons{
    font-family: "Press Start 2P",cursive;
    color: #FEF9CC;
    background-color: #00C3BA;
    cursor: pointer;
    min-width: 90vw;
    width: fit-content;
    min-height: 20vh;
    height: fit-content;
    margin: 10px;
    font-size: 8vw;
    text-shadow: 2px 2px #1F6E77;
    box-shadow: inset -0.15em -0.15em #268b96;
    border-color: #2B211B;
    border-width: 10px;
    border-style: solid ;
  }
  .gameButtons:hover{
    padding-right: 0.05em;
    padding-top: 0.05em;
    background-color: #31a6b2;
    box-shadow: inset -0.1em -0.1em #027a75;
    color: #FEF9CC;
  }
  .backButtonDiv{
    width: 10vw;
    height: 10vh;
    margin-right: 10vw;
  }
  .backButton{
    font-family: "Press Start 2P",cursive;
    color: #FEF9CC;
    background-color: #00C3BA;
    cursor: pointer;
    min-width: 70px;
    width: fit-content;
    min-height: 70px;
    height: fit-content;
    margin: 5vw;
    font-size: 2vw;
    text-shadow: 2px 2px #1F6E77;
    box-shadow: inset -0.35em -0.35em #268b96;
    border-color: #2B211B;
    border-width: 5px;
    border-style: solid ;
  }
  .backButton:hover{
    background-color: #31a6b2;
    box-shadow: inset -0.25em -0.25em #027a75;
    color: #FEF9CC;
  }
  .material-symbols-outlined {
    font-size: 50px;
    color: #fef9cc;
    font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 48
  }
}

</style>