<!-- CSS OK for laptop -->
<template>
  <body>
    <div>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        <div class="backButtonDiv">
          <button class="backButton" v-on:click="this.$router.go(-1);userLeft()">
            <span class="material-symbols-outlined">
              arrow_back
            </span>
          </button>
        </div>
    <h1>LOBBY</h1>
      <div class="userListWrapper">
        <UserComponent v-for="user in this.connectedUsers"
                   v-bind:user="user"
                   v-bind:key="user.username">
         </UserComponent>
      </div>
    </div>
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
      myUsername: ""
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
  overflow: hidden;
  font-family: "Silkscreen", cursive;
}

.header{
  display: flex;
  justify-content: center;
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
  width: 10vw;
  height: 10vh;
  margin: 20px;
  font-size: 0.9vw;
  text-shadow: 2px 2px #1F6E77;
  /*border-radius: 4vw;*/
  box-shadow: inset -0.35em -0.35em #268b96;
  border-color: #2B211B;
  border-width: 0.4vw;
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
  font-size: 5vw;
  /*-webkit-text-stroke: 0.01vw black;*/
  text-shadow: 4px 2px black;
}


.userListWrapper{
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
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
  /*-webkit-text-stroke: 1px black;*/
  cursor: pointer;
  width: 10vw;
  height: 10vh;
  margin: 20px;
  font-size: 0.9vw;
  text-shadow: 2px 2px #1F6E77;
  /*border-radius: 4vw;*/
  box-shadow: inset -0.35em -0.35em #268b96;
  border-color: #2B211B;
  border-width: 0.4vw;
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

</style>