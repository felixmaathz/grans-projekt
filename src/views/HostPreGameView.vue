<template>
  <body>
 <div>
   {{uiLabels.hostPreGame}}

 </div>
<div v-for="user in this.connectedUsers"
      v-bind:key="user">
  {{user.username}}
</div>
 <div style="margin: 2em">
   <!--<button style="position:absolute; bottom:100px;" v-on:click="startGame()">Start</button>-->
   <button v-bind="'/poll/'+lang"></button>
 </div>

  <footer>
    <div>
      <button style="position:absolute; bottom:100px;" v-on:click="this.$router.go(-1)">{{uiLabels.goBack}}</button>
    </div>
  </footer>
  </body>
</template>

<script>
import io from 'socket.io-client';
const socket = io();

export default {
  name: "HostPreGameView",

  data: function () {
    return {
      uiLabels: {},
      lang: "",
      gameId:"",
      connectedUsers: []
    }
  },
  created: function () {
    this.gameId=this.$route.params.id
    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels

    })
    socket.on('userJoined', (users) =>{
      console.log('user joined')
      this.connectedUsers = users
    })
  },

}

</script>

<style scoped>

</style>