<template>
  <body>

    <div>
      <div class="languageButtonDiv">
        <button class="languageButton" v-on:click="switchLanguage">{{uiLabels.changeLanguage}}</button>
      </div>

      <h1 class = "gameName">{{uiLabels.gameTitle}}</h1>
    </div>
    <div>
      <router-link v-bind:to="'/hostorjoin/'+lang"><button class="gameButtons">{{uiLabels.playTheGame}}</button></router-link>
        <br>
      <router-link v-bind:to="'/create/'+lang"><button class="gameButtons">{{uiLabels.createTheGame}}</button></router-link>

    </div>
<!--  <header>-->
<!--    <div v-bind:class="['hamburger', {'close': !hideNav}]" -->
<!--         v-on:click="toggleNav">-->
<!--    </div>-->
<!--    <div class="logo"><img src="/img/logo.png">Polly polling tool</div>-->
<!--  </header>-->
<!--  <ResponsiveNav v-bind:hideNav="hideNav">-->
<!--    <button v-on:click="switchLanguage">{{uiLabels.changeLanguage}}</button>-->
<!--    <router-link v-bind:to="'/create/'+lang">{{uiLabels.createPoll}}</router-link>-->
<!--    <a href="">Pricing</a>-->
<!--    <a href="">About</a>-->
<!--    <a href="">FAQ</a>-->
<!--  </ResponsiveNav>f-->
<!--  <label>-->
<!--    Write poll id: -->
<!--    <input type="text" v-model="id">-->
<!--  </label>-->
<!--  <router-link v-bind:to="'/poll/'+id">{{uiLabels.participatePoll}}</router-link>-->

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
      hideNav: true
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
    }
  }
}
</script>
<style scoped>
  header {
    background-color: gray;
    width: 100%;
    display: grid;
    grid-template-columns: 2em auto;
  }

  body{
    background: rgb(253,52,76);
    background: radial-gradient(circle, rgba(253,52,76,1) 35%, rgba(182,49,65,1) 90%);
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    font-family: "Trebuchet MS",serif;
  }

  h1{
    color: #00C3BA;
    -webkit-text-stroke: 0.3vw black;
  }

  .gameName{
    margin-top: 15vh;
    font-size: 10vw;
  }

  .gameButtons{
    font-family: "Trebuchet MS",serif;
    color: #FEF9CC;
    background-color: #1F6E77;
    /*-webkit-text-stroke: 1px black;*/
    cursor: pointer;
    width: 30vw;
    height: 10vh;
    margin: 20px;
    font-size: 3vw;
    border-radius: 4vw;
    border-color: #2B211B;
    border-width: 0.6vw;
    border-style: solid ;
    transition-duration: 0.15s;

  }
  button:hover{
    background-color: #00C3BA;
    border-width: 0.3vw;
    color: #FEF9CC;

  }

  .languageButtonDiv{
    width: 10vw;
    height: 10vh;

  }

  .languageButton{
    font-family: "Trebuchet MS", serif;
    cursor: pointer;
    width: 10vw;
    height: 10vh;
    margin: 2vw;
    font-size: 1.5em;
    border-radius: 4vw;
    border-color: #2B211B;
    border-width: 0.6vw;
    border-style: solid ;
    transition-duration: 0.15s;

  }

  .logo {
    text-transform: uppercase;
    letter-spacing: 0.25em;
    font-size: 2.5rem;
    color: white;
    padding-top:0.2em;
  }
  .logo img {
    height:2.5rem;
    vertical-align: bottom;
    margin-right: 0.5rem;
  }
  .hamburger {
    color:white;
    width:1em;
    display: flex;
    align-items: center;
    justify-content: left;
    padding:0.5rem;
    top:0;
    left:0;
    height: 2rem;
    cursor: pointer;
    font-size: 1.5rem;
  }

/*@media screen and (max-width:50em) {*/
/*  .logo {*/
/*    font-size: 5vw;*/
/*    display: flex;*/
/*    align-items: center;*/
/*    justify-content: center;*/
/*  }*/
/*  .hamburger::before {*/
/*    content: "☰";*/
/*  }*/
/*  .close::before {*/
/*    content: "✕";*/
/*  }*/
/*  .hide {*/
/*    left:-12em;*/
/*  }*/
/*}*/
</style>
