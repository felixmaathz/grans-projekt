<template>
  <body>
  <br>

      <div class="leaderboardWrapper">
        <div class = "leaderboard">
          {{uiLabels.leaderboard}}
          <hr>
          <div v-for="user in userList"
               v-bind:key="user">
          {{user.username}}
          {{user.endScore}}
          <img src="@/banana.png" alt="Banana" style = "width:15px; height:15px">
          </div>
        </div>
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

<style scoped>
body{
background: url("https://i.imgur.com/eTXACsr.gif");
/*background: radial-gradient(circle, #00a9bb 25%, #477998 80%);*/
width: 100vw;
height: 100vh;
overflow: hidden;
font-family: "Silkscreen", cursive;
}
.leaderboard{
  font-family: "Press Start 2P",cursive;
  height: 35em;
  width: 25em;
  align-items: center;
  background-color: #FEF9CC;
  border-style: solid;
  border-color: #1F6E77;
  margin: 2em;
  padding-top: 1em;
  margin-top: 5em;

}
.leaderboardWrapper {
  display:flex;
  justify-content: center;
}

/* OPTIMIZATION FOR PHONE */
@media (max-width: 700px){
  body {
    background: url("https://i.imgur.com/eTXACsr.gif");
    /*background: radial-gradient(circle, #00a9bb 25%, #477998 80%);*/
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    font-family: "Silkscreen", cursive;
  }
  .leaderboard{
    font-family: "Press Start 2P",cursive;
    height: 40em;
    width: 80em;
    align-items: center;
    background-color: #FEF9CC;
    border-style: solid;
    border-color: #1F6E77;
    margin: 2em;
    padding-top: 1em;
    margin-top: 5em;

  }
  .leaderboardWrapper {
    display:flex;
    justify-content: center;
  }

}
</style>

