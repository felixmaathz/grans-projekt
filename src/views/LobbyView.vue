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
const socket = io();

export default {
  name: "LobbyView",

  data: function () {
    return {
      uiLabels: {},
      lang: "",
      connectedUsers: [],

    }
  },
  created: function () {

    //this.id = this.$route.params.id;
    //this.nick= this.$route.params.nick;
    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels

    })
    socket.emit('getUsers')
    socket.on('returnUsers', (users)=>{
      this.connectedUsers = users
    })

    socket.on('userJoined', (users) => {
      console.log('user joined')
      this.connectedUsers = users
    })
  },
}

</script>

<style scoped>

</style>