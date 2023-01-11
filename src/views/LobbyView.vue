<!-- CSS OK for laptop -->
<template>
  <body>
    <div>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <h1>LOBBY: {{gameId}}</h1>
      <div class="userListWrapper">
        <UserComponent v-for="user in this.connectedUsers"
                   v-bind:user="user"
                   v-bind:key="user.username">
         </UserComponent>
      </div>
    </div>
    <button class="leaveGameButton" v-on:click="this.$router.go(-1);userLeft()">
      Leave
    </button>
  </body>
</template>

<script>
import io from 'socket.io-client';
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
      finishedQuiz:{},
      myUsername: "",
      gameId:""
    }
  },
  created: function () {


    socket.emit('getGameInfo')
    socket.on('returnGameInfo', (game)=>{
      this.finishedQuiz=game
      this.gameId=game.gameId
      console.log(this.gameId)
      // if(this.finishedQuiz.gameId===""){
      //   this.$router.go(-1)
      // }
      socket.emit('joinPoll', this.gameId)
    })
    this.myUsername = this.$route.params.nick;
    this.gameId = this.$route.params.id;
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
    socket.on('userLeft', (users) => {
      console.log('user left')
      this.connectedUsers = users
    })

    socket.on('gameTerminated', ()=>{
      console.log("Game terminated")
      this.redirectUserHome()
    })


    socket.on('gameWillStart', ()=> {
      this.redirectUser()
    })
  },
  methods:{
    redirectUserHome: function(){
      this.$router.push({path: '/'})
    },
    redirectUser: function(){
      this.$router.push({path: '/poll/'+this.gameId+'/'+this.myUsername+'/'+this.lang })
    },

    userLeft: function(){
      socket.emit('leaveGame',{username:this.myUsername,gameId: this.gameId})


    }

  }
}

</script>

<style scoped>
body{
  background: #EF233C;
  background: radial-gradient(circle, #EF233C 35%, #D80032 90%);
  width: 100vw;
  height: 100vh;
  font-family: "Silkscreen", cursive;
  overflow: auto;
}

h1{
  color: #00C3BA;
  font-size: 5vw;
  /*-webkit-text-stroke: 0.01vw black;*/
  text-shadow: 4px 2px black;
}

.leaveGameButton{
  font-family: "Press Start 2P",cursive;
  color: #FEF9CC;
  background-color: #ff0000;
  /*-webkit-text-stroke: 1px black;*/
  cursor: pointer;
  width: 30vw;
  height: 10vh;
  font-size: 1.8vw;
  text-shadow: 2px 2px #bb0000;
  /*border-radius: 4vw;*/
  box-shadow: inset -0.15em -0.15em #bb0000;
  border-color: #2B211B;
  border-width: 0.4vw;
  margin-top: 6vw;
}

.leaveGameButton:hover{
  box-shadow: inset -0.05em -0.05em #410000;
  padding-right: 0.05em;
  padding-top: 0.15em;
  background-color: #ad0101;
  text-shadow: 2px 2px #410000;
}
.userListWrapper{
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100vw;
}


/* OPTIMIZATION FOR PHONE */
@media (max-width: 700px) {
  body {
    background: #EF233C;
    background: radial-gradient(circle, #EF233C 35%, #D80032 90%);
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    font-family: "Silkscreen", cursive;
    position: relative;
  }

  h1{
    color: #00C3BA;
    overflow-wrap: break-word;
    font-size: 2em;
    text-shadow: 4px 2px black;
    margin-top: 15vh;

  }
  .userListWrapper{
    height: 40vw;
    flex-wrap: nowrap;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .leaveGameButton{
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    font-family: "Press Start 2P",cursive;
    color: #FEF9CC;
    background-color: #ff0000;
    cursor: pointer;
    width: 85vw;
    min-height: 12vh;
    height: fit-content;
    font-size: 2.2em;
    padding: 10px;
    text-shadow: 2px 2px #bb0000;
    box-shadow: inset -0.15em -0.15em #bb0000;
    border-color: #2B211B;
    border-width: 5px;
    margin-top: 10vw;
  }
  .leaveGameButton:hover{
    box-shadow: inset -0.15em -0.15em #410000;
    padding-right: 0.05em;
    padding-top: 0.15em;
    background-color: #ad0101;
    text-shadow: 2px 2px #410000;
  }
}


</style>