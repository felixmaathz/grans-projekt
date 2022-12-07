<template>
  <body>
<div>
  LOBBY
  <UserComponent v-for="user in this.connectedUsers"
                 v-bind:user="user"
                 v-bind:key="user.username">
  </UserComponent>

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
import UserComponent from "@/components/UserComponent";
const socket = io();

export default {
  name: "LobbyView",
  components: {
    UserComponent
  },

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
    socket.on('gameWillStart', function () {
      //this.$router.push({path: '/'})
      //router.go(-1)
      router.push({path:'/'})

    })
  },
}

</script>

<style scoped>

</style>