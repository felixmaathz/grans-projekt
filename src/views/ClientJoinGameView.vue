<template>

  <body>
  <div>


    <!-- view text-->
    <div>
      {{uiLabels.enterID}}
    </div>

    <!-- Text field where you enter nickname -->
    <form>
      <p>
        <label for="gameid"></label> <br>
        <input type="text" v-model="user.joinGameId" v-bind:placeholder="uiLabels.gameID">
      </p>
    </form>
  <div>
    {{uiLabels.userName}}
  </div>
    <form>
      <p>
        <label for="nickname"></label> <br>
        <input type="text" v-model="user.username" v-bind:placeholder="uiLabels.enterNick">

      </p>
    </form>

    <!-- Button for joining game -->
    <router-link v-bind:to="'/lobby/'+lang"><button v-on:click="joinGame()">{{uiLabels.joinGame}} </button></router-link>
  </div>
  <footer>
    <div style="margin: 2em">
      <button style="position:absolute; bottom:100px;" v-on:click="this.$router.go(-1)">{{uiLabels.goBack}}</button>
    </div>
  </footer>
  </body>
</template>

<script>
import io from 'socket.io-client';
const socket = io();

export default {
  name: "ClientJoinGameView",

  data: function () {
    return {
      user: {username:"", joinGameId: ""},
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
  methods:{
    joinGame: function(){
      console.log("HEJ")
      socket.emit('joinGame', this.user)
    }
  }
}



</script>

<style scoped>

</style>