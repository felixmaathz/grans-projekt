<template>
<div>
  <input placeholder="gameID" v-model="user.joinGameId">
</div>
  <div>
    <input placeholder="username" v-model="user.username">
  </div>
  <div>
    <router-link v-bind:to="'/collablobby/'+lang+'/'+user.joinGameId+'/'+user.username">
      <button  v-on:click="createCollabGame()">
        Create Game
      </button>
    </router-link>

  </div>
</template>

<script>
import io from 'socket.io-client';
const socket = io();

export default {
  name: "ChooseGameIdView",

  data: function () {
    return {
      user: {username:"", joinGameId: "", host: true},
      gameId:"",
      username:"",
      uiLabels: {},
      lang: "",
    }
  },
  created: function () {
    this.user.username=this.$route.params.nick;
    this.user.joinGameId=this.$route.params.id;
    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels

    })
  },
  methods:{
    createCollabGame: function(){
      console.log("Created collab game")
      socket.emit('createCollabGame', this.user)
    }
  }
}

</script>

<style scoped>

</style>