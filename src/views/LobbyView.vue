<template>
  <body>
<div>
  LOBBY
  <div v-for="user in this.connectedUsers"
       v-bind:key="user">
    {{user.username}}
  </div>
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
import router from "@/router";
const socket = io();

export default {
  name: "LobbyView",


  data: function () {
    return {
      uiLabels: {},
      lang: "",
      connectedUsers: [],
      gameId: "",
      nick: "",

    }
  },
  created: function () {
    this.gameId = this.$route.params.id;
    this.nick = this.$route.params.nick;
    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels

    })

    socket.on('userJoined', (users) => {
      console.log('user joined')
      this.connectedUsers = users

    })
    socket.on('gameWillStart', function () {
      router.push({path: '/'})

    })
  },
}










</script>

<style scoped>

</style>