<!-- CSS OK for laptop + phone -->
<template>
  <body>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <div class="backButtonDiv">
      <button v-on:click="this.$router.go(-1)" class="backButton"><span class="material-symbols-outlined">
      arrow_back</span></button>
    </div>

    <div style="margin-top:10vw">

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
  overflow: hidden;
  font-family: "Silkscreen", cursive;
}
.gameButtons{
  font-family: "Press Start 2P",cursive;
  color: #FEF9CC;
  background-color: #00C3BA;
  /*-webkit-text-stroke: 1px black;*/
  cursor: pointer;
  width: 28vw;
  height: 10vh;
  margin: 20px;
  font-size: 2vw;
  text-shadow: 2px 2px #1F6E77;
  /*border-radius: 4vw;*/
  box-shadow: inset -0.15em -0.15em #268b96;
  border-color: #2B211B;
  border-width: 0.4vw;
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
.gameButtons.language{
  width: 10vw;
  height: 10vh;
  font-size: 0.9vw;
  box-shadow: inset -0.35em -0.35em #268b96;
}
.gameButtons.language:hover{
  box-shadow: inset -0.2em -0.2em #027a75;
  padding-right: 0.15em;
  padding-top: 0.2em;
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
  .gameButtons{
    font-family: "Press Start 2P",cursive;
    color: #FEF9CC;
    background-color: #00C3BA;
    cursor: pointer;
    width: 18em;
    height: 5em;
    font-size: 5vw;
    text-shadow: 2px 2px #1F6E77;
    /*border-radius: 4vw;*/
    box-shadow: inset -0.15em -0.15em #268b96;
    border-color: #2B211B;
    border-width: 0.2em;
  }
  .gameButtons:hover{
    padding-right: 0.05em;
    padding-top: 0.05em;
    background-color: #31a6b2;
    box-shadow: inset -0.1em -0.1em #027a75;
    color: #FEF9CC;
  }
  .gameButtons.language{
    width: 10vw;
    height: 10vh;
    font-size: 0.9vw;
    box-shadow: inset -0.35em -0.35em #268b96;
  }
  .gameButtons.language:hover{
    box-shadow: inset -0.2em -0.2em #027a75;
    padding-right: 0.15em;
    padding-top: 0.2em;
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
    width: 20vw;
    height: 10vh;
    margin: 5vw;
    font-size: 2vw;
    text-shadow: 2px 2px #1F6E77;
    box-shadow: inset -0.35em -0.35em #268b96;
    border-color: #2B211B;
    border-width: 0.4em;
    border-style: solid ;
  }
  .backButton:hover{
    background-color: #31a6b2;
    box-shadow: inset -0.25em -0.25em #027a75;
    color: #FEF9CC;
  }
  .material-symbols-outlined {
    font-size: 16vw;
    color: #fef9cc;
    font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 48
  }
}

</style>