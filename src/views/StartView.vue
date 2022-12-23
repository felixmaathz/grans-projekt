<!-- CSS OK for laptop + phone -->
<template>
  <body>

      <div>
        <div class="languageButtonDiv">
          <button class="gameButtons language" v-on:click="switchLanguage">
            {{uiLabels.changeLanguage}}
          </button>
        </div>

        <h1 class = "gameName">{{uiLabels.gameTitle}}</h1>
      </div>

    <div>
      <router-link v-bind:to="'/hostorjoin/'+lang">
        <button class="gameButtons">
          {{uiLabels.playTheGame}}
        </button>
      </router-link><br>
      <router-link v-bind:to="'/create/'+lang">
        <button class="gameButtons">
          {{uiLabels.createTheGame}}
        </button>
      </router-link>
    </div>
  </body>
</template>

<script>
// import ResponsiveNav from '@/components/ResponsiveNav.vue';
import io from 'socket.io-client';
const socket = io();


export default {
  name: 'StartView',
  components: {
    // ResponsiveNav
  },
  data: function () {
    return {
      uiLabels: {},
      id: "",
      lang: "en",
      hideNav: true,
    }
  },
  created: function () {
    socket.emit("switchLanguage", this.lang)
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })



  },
  methods: {
    switchLanguage: function() {
      if (this.lang === "en")
        this.lang = "sv"
      else
        this.lang = "en"
      socket.emit("switchLanguage", this.lang)
    },
    toggleNav: function () {
      this.hideNav = ! this.hideNav;
    },
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Silkscreen&display=swap');
  header {
    background-color: gray;
    width: 100%;
    display: grid;
    grid-template-columns: 2em auto;
  }
  body{
    background: #EF233C;
    background: radial-gradient(circle, #EF233C 35%, #D80032 90%);
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    font-family: "Silkscreen", cursive;
  }
  h1{
    color: #00C3BA;
    text-shadow: 5px 5px black;
  }
  .gameName{
    margin-top: 15vh;
    font-size: 7vw;
  }
  .gameButtons{
    font-family: "Press Start 2P",cursive;
    color: #FEF9CC;
    background-color: #00C3BA;
    /*-webkit-text-stroke: 1px black;*/
    cursor: pointer;
    width: 30vw;
    height: 10vh;
    margin: 20px;
    font-size: 3vw;
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
    color: #FEF9CC;
  }
  .languageButtonDiv{
    width: 10vw;
    height: 10vh;
    margin-left: 1vw;
    margin-top: -7.3vw;
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

/* OPTIMIZATION FOR PHONE */
@media (max-width: 700px) {
  header {
    background-color: gray;
    width: 100%;
    display: grid;
    grid-template-columns: 2em auto;
  }
  body{
    background: #EF233C;
    background: radial-gradient(circle, #EF233C 35%, #D80032 90%);
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    font-family: "Silkscreen", cursive;
  }
  h1{
    color: #00C3BA;
    text-shadow: 5px 5px black;
  }
  .gameName{
    margin-top: 10vh;
    font-size: 15vw;
  }
  .gameButtons{
    font-family: "Press Start 2P",cursive;
    color: #FEF9CC;
    background-color: #00C3BA;
    cursor: pointer;
    width: 70vw;
    height: 15vh;
    margin: 20px;
    font-size: 10vw;
    text-shadow: 2px 2px #1F6E77;
    box-shadow: inset -0.15em -0.15em #268b96;
    border-color: #2B211B;
    border-width: 0.15em;
    border-style: solid ;
  }
  .gameButtons:hover{
    padding-right: 0.05em;
    padding-top: 0.05em;
    background-color: #31a6b2;
    box-shadow: inset -0.1em -0.1em #027a75;
    color: #FEF9CC;
  }
  .languageButtonDiv{
    width: 10vw;
    height: 10vh;
    margin: 1vw;
    margin-top: -26.55vw;
  }
  .gameButtons.language{
    border-width: 0.6vw;
    width: 40vw;
    height: 10vh;
    font-size: 4vw;
    margin-left: 54vw;
    box-shadow: inset -0.35em -0.35em #268b96;
  }
  .gameButtons.language:hover{
    box-shadow: inset -0.2em -0.2em #027a75;
    padding-right: 0.15em;
    padding-top: 0.2em;
  }
}
</style>
