<template>
  <body>


  <div class="leaderboardWrapper">
    <div class="leaderboard">
      {{uiLabels.leaderboard}}
      <hr>
      <div v-for="user in userList"
           v-bind:key="user">
        {{user.username}}:
        {{user.endScore}}
        <img src="@/banana.png" alt="Banana" style = "width:15px; height:15px">
      </div>
    </div>
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
    socket.emit('joinPoll', this.pollId)
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
  },
  methods:{
    sortList: function(list){
      list.sort((a, b) => parseFloat(b.endScore) - parseFloat(a.endScore));
    },
  }

}
</script>

<style scoped>
.leaderboard{
  font-family: "Press Start 2P",cursive;
  height: 30em;
  width: 80em;
  align-items: center;
  background-color: #FEF9CC;
  border-style: solid;
  border-color: #1F6E77;
  margin: 1em;

}
.leaderboardWrapper {
  display:flex;
  justify-content: center;
}

</style>
