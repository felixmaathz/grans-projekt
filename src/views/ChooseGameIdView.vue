<!-- CSS OK for laptop + phone -->
<template>
  <body>
  <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
  <div class="backButtonDiv">
    <button class="backButton"
            v-on:click="this.$router.go(-1)"><span
            class="material-symbols-outlined">
      arrow_back
    </span></button>
  </div>

  <div>
    <div class="enterGameID">
      {{uiLabels.enterID}}
    </div>

    <form>
      <p>
        <label for="gameid"></label> <br>
        <input type="text" v-model="user.joinGameId"
               v-bind:placeholder="uiLabels.gameId"
               class="questionInput" maxlength="10">
      </p>
      <div class="enterNick">
        {{uiLabels.userName}}
      </div>
      <p>
        <label for="nickname"></label> <br>
        <input type="text" v-model="user.username"
               v-bind:placeholder="uiLabels.enterNick"
               class="questionInput" maxlength="10">
      </p>
      <div>
          <button class="questionButtons"
                  v-on:click="validateForm()">
            {{uiLabels.createCoLabGame}}
          </button>
      </div>
    </form>

  </div>


  </body>
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
    validateForm: function (){
      if( this.user.username!==undefined && this.user.joinGameId!==undefined &&
          this.user.username!=="" && this.user.joinGameId!==""){
        this.createCollabGame()
      }else{
        alert(this.uiLabels.noIdOrUsername)
      }
    },
    createCollabGame: function(){
      console.log("Created collab game")
      socket.emit('createCollabGame', this.user)
      this.$router.push({path:'/hostcollablobby/'+this.lang+'/'+this.user.joinGameId+'/'+this.user.username })
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
.questionButtons{
  font-family: "Press Start 2P",cursive;
  color: #FEF9CC;
  background-color: #00C3BA;
  /*-webkit-text-stroke: 1px black;*/
  cursor: pointer;
  width: 30vw;
  height: 10vh;
  margin: 20px;
  font-size: 1.8vw;
  text-shadow: 2px 2px #1F6E77;
  /*border-radius: 4vw;*/
  box-shadow: inset -0.15em -0.15em #268b96;
  border-color: #2B211B;
  border-width: 0.4vw;

  /*transition-duration: 0.15s;*/
}
.questionButtons:hover{
  padding-right: 0.05em;
  padding-top: 0.05em;
  background-color: #31a6b2;
  box-shadow: inset -0.1em -0.1em #027a75;
  /*border-width: 0.3vw;*/
  color: #FEF9CC;
}
.questionInput{
  font-family: "Press Start 2P",cursive;
  border: none;
  color: #FEF9CC;
  background: transparent;
  width: 40%;
  height: 7vh;
  font-size: 2vw;
  border-bottom-style: solid;
  border-bottom-color: #2B211B;
  text-align:center;
}
::placeholder{
  color: #FEF9CC;
  opacity: 70%;
}
.enterGameID{
  margin-top: 6vw;
  font-size: 2vw;
}

.enterNick{
  font-size: 2vw;
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
/* OPTIMIZATION FOR PHONE */
@media (max-width: 700px) {
  body{
    background: #EF233C;
    background: radial-gradient(circle, #EF233C 35%, #D80032 90%);
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    font-family: "Silkscreen", cursive;
  }
  .questionButtons{
    font-family: "Press Start 2P",cursive;
    color: #FEF9CC;
    background-color: #00C3BA;
    /*-webkit-text-stroke: 1px black;*/
    cursor: pointer;
    width: 90vw;
    height: 10vh;
    margin: 20px;
    font-size: 6vw;
    text-shadow: 2px 2px #1F6E77;
    /*border-radius: 4vw;*/
    box-shadow: inset -0.15em -0.15em #268b96;
    border-color: #2B211B;
    border-width: 0.4vw;

    /*transition-duration: 0.15s;*/
  }
  .questionButtons:hover{
    padding-right: 0.05em;
    padding-top: 0.05em;
    background-color: #31a6b2;
    box-shadow: inset -0.1em -0.1em #027a75;
    /*border-width: 0.3vw;*/
    color: #FEF9CC;
  }
  .questionInput{
    font-family: "Press Start 2P",cursive;
    border: none;
    color: #FEF9CC;
    background: transparent;
    width: 70%;
    height: 7vh;
    font-size: 4vw;
    border-bottom-style: solid;
    border-bottom-color: #2B211B;
    text-align:center;
  }
  ::placeholder{
    color: #FEF9CC;
    opacity: 70%;
  }
  .enterGameID{
    margin-top: 5em;
    font-size: 6vw;
  }
  .enterNick{
    font-size: 6vw;
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
    border-width: 0.4em;
    border-style: solid ;
  }
  .backButton:hover{
    background-color: #31a6b2;
    box-shadow: inset -0.25em -0.25em #027a75;
    color: #FEF9CC;
  }
  .material-symbols-outlined {
    font-size: 16vw;
    color: #fef9cc;
    font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 48
  }
}
</style>