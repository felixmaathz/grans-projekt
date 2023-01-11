<!-- CSS OK for laptop + phone -->
<template>
  <body>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
  <div class="header">
    <div class="backButtonDiv">
      <button class="backButton" v-on:click="this.$router.go(-1);terminateGame()"><span class="material-symbols-outlined">
      arrow_back
    </span></button>
    </div>
    <h1>{{uiLabels.gameId}}:<br>{{ this.gameId }}</h1>

  </div>
  <h2 class="connPlayers">{{uiLabels.connectedPlayer}}</h2>
 <div class="userListWrapper">

 <UserComponent v-for="user in this.connectedUsers"
                v-bind:user="user"
                v-bind:key="user.username">
 </UserComponent>
 </div>

 <router-link v-on:click="hostStartGame();" v-bind:to="'/hostresult/'+gameId+'/'+lang">
   <button class="startGameButton">
     {{uiLabels.startTheGame}}
   </button>
 </router-link>
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
    // socket.emit('getGameInfo')
    // socket.on('returnGameInfo', (game)=>{
    //   this.gameId=game.gameId
    //   console.log("Game recieved: "+this.gameId)
    //   socket.emit('joinPoll', this.gameId)
    // })
    this.gameId=this.$route.params.id
    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })


    socket.emit('joinPoll', this.gameId)
    socket.emit('getUsers')
    socket.on('returnUsers', (users)=>{
      this.connectedUsers = users
    })

    socket.on('userJoined', (users) =>{
      console.log('user joined')
      this.connectedUsers = users
    })

    socket.on('userLeft', (users) => {
      console.log('user left')
      this.connectedUsers = users
    })
  },

  methods: {
    terminateGame: function(){
      console.log("terminate")
      socket.emit('terminateGame',this.gameId)
    },
    hostStartGame: function() {
      console.log("spelet kommer starta inom kort")
      socket.emit("gameSoonToStart",this.gameId)
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
  overflow: auto;
  font-family: "Silkscreen", cursive;
}

.header{
  display: flex;
  justify-content: center;
  font-family: "Press Start 2P",cursive;

}

.backButtonDiv{
  width: 10vw;
  height: 10vh;
  margin-right: 10vw;
  left: 0;
  position: absolute;

}

.backButton{
  font-family: "Press Start 2P",cursive;
  color: #FEF9CC;
  background-color: #00C3BA;
  /*-webkit-text-stroke: 1px black;*/
  cursor: pointer;
  width: 7vw;
  height: 10vh;
  margin: 2vw;
  font-size: 0.9vw;
  text-shadow: 2px 2px #1F6E77;
  /*border-radius: 4vw;*/
  box-shadow: inset -0.35em -0.35em #268b96;
  border-color: #2B211B;
  border-width: 0.4em;
  border-style: solid ;
  /*transition-duration: 0.15s;*/
}
.backButton:hover{
  background-color: #31a6b2;
  box-shadow: inset -0.25em -0.25em #027a75;
  /*border-width: 0.3vw;*/
  color: #FEF9CC;
}

.material-symbols-outlined {
  font-size: 4vw ;
  font-variation-settings:
      'FILL' 1,
      'wght' 700,
      'GRAD' 200,
      'opsz' 48
}

h1{
  color: #00C3BA;
  font-size: 3.2em;
  /*-webkit-text-stroke: 0.01vw black;*/
  text-shadow: 4px 2px black;
}


.userListWrapper{
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.startGameButton{
  font-family: "Press Start 2P",cursive;
  color: #FEF9CC;
  background-color: #45af00;
  /*-webkit-text-stroke: 1px black;*/
  cursor: pointer;
  width: 30vw;
  height: 10vh;
  font-size: 1.8vw;
  text-shadow: 2px 2px #206c00;
  /*border-radius: 4vw;*/
  box-shadow: inset -0.15em -0.15em #206c00;
  border-color: #2B211B;
  border-width: 0.4vw;
  margin-top: 6vw;
}
.startGameButton:hover{
  box-shadow: inset -0.15em -0.15em #174d05;
  padding-right: 0.05em;
  padding-top: 0.15em;
  background-color: #299306;
  text-shadow: 2px 2px #174d05;
}
/* OPTIMIZATION FOR PHONE */
  @media (max-width: 700px) {
    body{
      background: #EF233C;
      background: radial-gradient(circle, #EF233C 35%, #D80032 90%);
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      font-family: "Silkscreen", cursive;
      position: relative;
    }
    .header{
      display: flex;
      justify-content: center;
    }
    .backButtonDiv{
      width: 10vw;
      height: 10vh;
      margin-right: 10vw;
    }
    .backButton{
      font-family: "Press Start 2P",cursive;
      color: #FEF9CC;
      background-color: #00C3BA;
      cursor: pointer;
      width: 20vw;
      height: 10vh;
      margin: 5vw;
      font-size: 2vw;
      text-shadow: 2px 2px #1F6E77;
      box-shadow: inset -0.35em -0.35em #268b96;
      border-color: #2B211B;
      border-width: 5px;
      border-style: solid ;
    }
    .backButton:hover{
      background-color: #31a6b2;
      box-shadow: inset -0.25em -0.25em #027a75;
      color: #FEF9CC;
    }
    .material-symbols-outlined {
      font-size: 8vw ;
      font-variation-settings:
          'FILL' 1,
          'wght' 700,
          'GRAD' 200,
          'opsz' 48
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

    .startGameButton{
      position: absolute;
      bottom: 10px;
      left: 0;
      right: 0;
      margin-left: auto;
      margin-right: auto;
      font-family: "Press Start 2P",cursive;
      color: #FEF9CC;
      background-color: #45af00;
      cursor: pointer;
      width: 85vw;
      min-height: 12vh;
      height: fit-content;
      font-size: 2.2em;
      padding: 10px;
      text-shadow: 2px 2px #206c00;
      box-shadow: inset -0.15em -0.15em #206c00;
      border-color: #2B211B;
      border-width: 5px;
      margin-top: 10vw;
    }
    .startGameButton:hover{
      box-shadow: inset -0.15em -0.15em #174d05;
      padding-right: 0.05em;
      padding-top: 0.15em;
      background-color: #299306;
      text-shadow: 2px 2px #174d05;
    }
    .connPlayers{
      font-size: 6vw;
      margin-top: -2vw;
    }
  }

</style>