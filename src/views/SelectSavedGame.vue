<!-- CSS OK for laptop + phone (Note: Header text too small and should be repositioned to right top -->
<template>
  <body>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
  <div class="backButtonDiv">
    <button class="backButton" v-on:click="this.$router.go(-1)"><span class="material-symbols-outlined">
      arrow_back
    </span></button>
  </div>
  <div style="margin-top: 8vw;">
    <div class="chooseSavedGame">
      <h3>{{uiLabels.chooseOrEdit}}</h3>
      <div class="quizList">
        <QuizComponent v-for="quiz in this.listOfQuizzes"
                       v-bind:quiz="quiz"
                       v-bind:key="quiz.gameId"
                       v-on:editThisQuiz = editQuiz($event)
                       v-on:createGame = createGame($event)>
        </QuizComponent>
      </div>
    </div>
  </div>

  </body>
</template>

<script>
import QuizComponent from "@/components/QuizComponent";
import io from 'socket.io-client';
const socket = io();

export default {
  name: "SelectSavedGame",
  components: {
    QuizComponent
  },


  data: function () {
    return {
      listOfQuizzes: [],
      uiLabels: {},
      lang: "",
      quizNames: "",
      gameId:""
    }
  },
  created: function () {
    this.lang = this.$route.params.lang;
    this.gameId=this.$route.params.id;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels

    })
    socket.emit('getQuizzes');
    socket.on('returnQuizzes', (quizList) =>{
      this.listOfQuizzes=quizList
      console.log(this.listOfQuizzes)
    })
  },
  methods: {
    editQuiz: function (event) {
      this.gameId=event.gameId
      this.$router.push({path: '/editquiz/'+this.lang+'/'+this.gameId})
      socket.emit("editQuiz", event)
    },
    createGame: function (event) {
      this.gameId=event.gameId
      this.$router.push({path: '/hostpregame/'+this.lang+'/'+this.gameId})
      console.log("game created")
      socket.emit('createGame',event)
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
.quizList{
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  overflow: auto;
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
  margin: 2vw;
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
.chooseSavedGame{
  font-size: 2vw;
}
/* OPTIMIZATION FOR PHONE */
@media (max-width: 700px) {
  body{
    background: #EF233C;
    background: radial-gradient(circle, #EF233C 35%, #D80032 90%);
    width: 100%;
    height: 100vh;
    overflow: auto;
    font-family: "Silkscreen", cursive;
  }
  .quizList{
    justify-content: center;
    flex-wrap: wrap;
    flex-direction: column;
    overflow: auto;
  }
  . .backButtonDiv{
    width: 10vw;
    height: 10vh;
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
  .chooseSavedGame{
    font-size: 3vw;
  }
}
</style>