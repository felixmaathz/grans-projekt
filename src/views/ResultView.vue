<!-- CSS OK for laptop + phone -->
<template>
  <body>


  <div class="leaderboardWrapper">
    <div class="leaderboard">
      {{uiLabels.leaderboard}}
      <hr>
      <div v-for="(user, index) in userList"
           v-bind:key="user">
        <p v-if="index === 0" >
          <img src="https://th.bing.com/th/id/OIP._o8RqUE8s3mu6UxN-D0zvQAAAA?pid=ImgDet&w=157&h=157&c=7&dpr=1,5"
               alt="first"
               style=" width: 15px; height: 15px">
          {{user.username}}:
          {{user.endScore}}
          <img src="@/banana.png" alt="Banana" style = " width:15px; height:15px">
        </p>
        <p v-if="index === 1">
          <img src="https://th.bing.com/th/id/OIP.SwxOZo0lXM-jHd-GyP1RMgAAAA?pid=ImgDet&w=157&h=157&c=7&dpr=1,5"
               alt="first"
               style=" width: 15px; height: 15px">
          {{user.username}}:
          {{user.endScore}}
          <img src="@/banana.png" alt="Banana" style = " width:15px; height:15px">
        </p>
        <p v-if="index === 2">
          <img src="https://th.bing.com/th/id/OIP.bm-qVXZUPlRDXyLyLCaIuwAAAA?pid=ImgDet&w=157&h=157&c=7&dpr=1,5"
               alt="first"
               style=" width: 15px; height: 15px">
          {{user.username}}:
          {{user.endScore}}
          <img src="@/banana.png" alt="Banana" style = " width:15px; height:15px">
        </p>
        <p v-if="index >2 ">
          {{user.username}}:
          {{user.endScore}}
          <img src="@/banana.png" alt="Banana" style = " width:15px; height:15px">
        </p>
      </div>
    </div>
  </div>


  <div class="endGameDiv">
    <router-link v-bind:to="'//'">
    <button class="endGameButton" >
      {{uiLabels.leaveGame}}
    </button>
      </router-link>
  </div>


  </body>
</template>

<script>


import io from 'socket.io-client';
const socket = io();

export default {
  name: 'ResultView',

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
      this.redirectUserHome()
    })
  },
  methods:{
    sortList: function(list){
      list.sort((a, b) => parseFloat(b.endScore) - parseFloat(a.endScore));
    },
    redirectUserHome: function(){
      this.$router.push({path: '/'})
    },
  }

}
</script>

<style scoped>
body {
  background: url("https://i.imgur.com/eTXACsr.gif");
  /*background: radial-gradient(circle, #00a9bb 25%, #477998 80%);*/
  width: 100vw;
  height: 100vh;
  overflow: auto;
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

.endGameDiv{
  width: 10vw;
  height: 10vh;
  margin-left: 85vw;
  margin-top: -2vw;
}

.endGameButton{
  width: 10vw;
  height: 10vh;
  background-color: #ff0000;
  font-family: "Press Start 2P",cursive;
  text-shadow: 2px 2px #bb0000;
  box-shadow: inset -0.25em -0.25em #bb0000;
  font-size: 1.4vw;
}

.endGameButton:hover{
  box-shadow: inset -0.15em -0.15em #410000;
  padding-right: 0.05em;
  padding-top: 0.15em;
  background-color: #ad0101;
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
    height: 35em;
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
  .endGameDiv{
    display:flex;
    text-align: center;
    margin-left: 23%;
  }

  .endGameButton{
    width: 55vw;
    height: 10vh;
    background-color: #ff0000;
    font-family: "Press Start 2P",cursive;
    text-shadow: 2px 2px #bb0000;
    box-shadow: inset -0.25em -0.25em #bb0000;
    font-size: 6vw;
  }

  .endGameButton:hover{
    box-shadow: inset -0.15em -0.15em #410000;
    padding-right: 0.05em;
    padding-top: 0.15em;
    background-color: #ad0101;
  }
}
</style>
