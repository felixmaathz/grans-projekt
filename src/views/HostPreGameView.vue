<template>
  <body>
 <div>
   {{uiLabels.hostPreGame}}
 </div>

 <div>
 <UserComponent v-for="user in this.connectedUsers"
                v-bind:user="user"
                v-bind:key="user.username">
 </UserComponent>
 </div>

 <router-link v-on:click="hostStartGame();" v-bind:to="'/result/'+gameId+'/'+lang">
   <button>
     {{uiLabels.startTheGame}}
   </button>
 </router-link>
  <footer>
    <div style="margin: 2em">
      <button style="position:absolute; bottom:100px;" v-on:click="this.$router.go(-1)">{{uiLabels.goBack}}</button>
    </div>
  </footer>
  </body>
</template>

<script>
import io from 'socket.io-client';

import UserComponent from "@/components/UserComponent";
const socket = io();

export default {
  name: "HostPreGameView",
  components: {
    UserComponent
  },


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
    socket.emit('getUsers')
    socket.on('returnUsers', (users)=>{
      this.connectedUsers = users
    })

    socket.on('userJoined', (users) =>{
      console.log('user joined')
      this.connectedUsers = users
    })
  },

  methods: {
    hostStartGame: function() {
      console.log("spelet kommer starta inom kort")
      socket.emit("gameSoonToStart", {gameId:this.gameId, nick:this.nick, lang:this.lang})

    }
  },
}

</script>

<style scoped>

</style>