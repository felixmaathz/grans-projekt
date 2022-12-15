<template>
  <body>
  PRESENTERA RESULTATET FÖR SPELET
  <br>
  <div v-for="user in userList"
       v-bind:key="user">
    {{user.username}}
    {{user.endScore}}


  </div>

  <button v-on:click="terminateGame()">
    END GAME
  </button>
  </body>
</template>

<script>
// @ is an alias to /src
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'HostResultView',
  data: function () {
    return {
      question: "",
      data: {},
      uiLabels: {},
      lang: "",
      userList: [],
      gameId:""

    }
  },
  created: function () {
    this.gameId = this.$route.params.id
    socket.emit('joinPoll', this.gameId)
    socket.on("dataUpdate", (update) => {
      this.data = update.a;
      this.question = update.q;
    });
    socket.on("newQuestion", update => {
      this.question = update.q;
      this.data = {};
    });
    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
    socket.on('returnScore', (user)=>{
      this.userList = user
      this.sortList(this.userList)
    })
    socket.emit('getScore', this.gameId)
    socket.on('returnAllScores',(user)=>{
      this.userList = user
      this.sortList(this.userList)
    })
    socket.on('gameTerminated', ()=>{
      console.log("...redirecting")
      this.redirectUserHome()
    })
  },
  methods:{
    sortList: function(list){
      list.sort((a, b) => parseFloat(b.endScore) - parseFloat(a.endScore));
    },
    terminateGame: function(){
      socket.emit('terminateGame', this.gameId)
    },
    redirectUserHome: function(){
      this.$router.push({path: '/'})
    },
  }

}
</script>
