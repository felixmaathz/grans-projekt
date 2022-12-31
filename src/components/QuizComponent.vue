<!-- CSS OK for laptop + phone (Note: Header text too small and should be repositioned to right top -->
<!-- Belongs to SelectSavedGameView -->
<template>
  <div class="quizWrapper">
    <div class="gameIdBox">
      <span class="gameId">{{ quiz.gameId}} </span>
    </div>
    <div class="gameDescription">
      <p v-if="this.numberOfQuestions>1">{{this.numberOfQuestions+ " " + uiLabels.questionsMultiple}}</p>
      <p v-else-if="this.numberOfQuestions===1">{{this.numberOfQuestions+ " " + uiLabels.aQuestion}}</p>
    </div>
    <div class="gameDetails">
<!--      <router-link v-bind:to = "'/hostpregame/'+lang+id" style="width: 50%">-->
        <button class="playButton" v-on:click="createGame()">{{uiLabels.playAGame}}</button>
<!--      </router-link>-->

<!--      <router-link v-bind:to = "'/editquiz/'+lang" style="width: 50%">-->
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
       <div>
        <button class="editButton" v-on:click="editQuiz()" >
          <span class="material-symbols-outlined"> edit_note</span>
        </button>
       </div>
<!--      </router-link>-->
    </div>
  </div>

</template>

<script>
import io from 'socket.io-client';
const socket = io();


export default {

  name: "QuizComponent",
  props: {
    quiz: Object
  },
  created: function(){

    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels

    })
    this.numberOfQuestions=this.quiz.questionList.length;
  },
  data: function(){
    return{
    numberOfQuestions: 0,
      uiLabels: {},
      lang: "",
    }
  },
  methods: {
    editQuiz: function() {
      this.$emit("editThisQuiz", this.quiz)

    },
    createGame: function(){

      this.$emit("createGame", this.quiz)
    }
  }
}

</script>

<style scoped>
.quizListWrapper{
  display: flex;
  justify-content: center;
  padding: 10px;
  border-style: solid;
}
.playButton{
  font-family: "Press Start 2P",cursive;
  color: #FEF9CC;
  background-color: #00C3BA;
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
  margin-top: 4vw;
}
.playButton:hover{
  background-color: #31a6b2;
  box-shadow: inset -0.1em -0.1em #027a75;
  /*border-width: 0.3vw;*/
  color: #FEF9CC;
  padding-right: 0.05em;
  padding-top: 0.1em;
}
.editButton{
  font-family: "Press Start 2P",cursive;
  color: #FEF9CC;
  background-color: #ffc507;
  /*-webkit-text-stroke: 1px black;*/
  cursor: pointer;
  width: 6vw;
  height: 10vh;
  margin: 20px;
  font-size: 1.8vw;
  text-shadow: 2px 2px #b97f00;
  /*border-radius: 4vw;*/
  box-shadow: inset -0.15em -0.15em #b97f00;
  border-color: #2B211B;
  border-width: 0.4vw;
  margin-top: 4vw;
}
.editButton:hover{
  background-color: #e7a100;
  box-shadow: inset -0.1em -0.1em #b97f00;
  color: #FEF9CC;
  padding-right: 0.05em;
  padding-top: 0.05em;
}
.material-symbols-outlined {
  font-size: 4vw;
  font-variation-settings:
      'FILL' 0,
      'wght' 400,
      'GRAD' 0,
      'opsz' 48
}
.quizWrapper{
  background-color: #FEF9CC;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 26vw;
  height: 25vh;
  margin: 1vw;
  position: relative;
  border-style: solid;
  border-bottom-color: black;
  border-width: 0.5vw;
}
.gameIdBox{
  display: flex;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  top:8px;
  height: 20%;
  justify-content: center;
  order: 0;
  font-size: 3vh;
  font-family: "Press Start 2P",serif;
}
.gameDescription{
  height: 90%;
  bottom: 23%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  order: 1;
}
.gameDetails{
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  height: 75%;
  bottom: 0;
  display: flex;
  justify-content: center;
}
/* OPTIMIZATION FOR PHONE */
@media (max-width: 700px) {
  .playButton{
    font-family: "Press Start 2P",cursive;
    color: #FEF9CC;
    background-color: #00C3BA;
    /*-webkit-text-stroke: 1px black;*/
    cursor: pointer;
    width: 50vw;
    height: 14vh;
    margin: 20px;
    font-size: 7vw;
    text-shadow: 2px 2px #1F6E77;
    box-shadow: inset -0.15em -0.15em #268b96;
    border-color: #2B211B;
    border-width: 0.14em;
    margin-top: 4vw;
  }
  .playButton:hover{
    background-color: #31a6b2;
    box-shadow: inset -0.1em -0.1em #027a75;
    color: #FEF9CC;
    padding-right: 0.05em;
    padding-top: 0.1em;
  }
  .editButton{
    font-family: "Press Start 2P",cursive;
    color: #FEF9CC;
    background-color: #ffc507;
    cursor: pointer;
    width: 25vw;
    height: 14vh;
    margin: 2em;
    font-size: 1.8vw;
    text-shadow: 2px 2px #b97f00;
    box-shadow: inset -0.15em -0.15em #b97f00;
    border-color: #2B211B;
    border-width: 0.5em;
    margin-top: 4vw;
  }
  .editButton:hover{
    background-color: #e7a100;
    box-shadow: inset -0.1em -0.1em #b97f00;
    color: #FEF9CC;
    padding-right: 0.05em;
    padding-top: 0.05em;
  }
  .material-symbols-outlined {
    font-size: 15vw;
    font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 48
  }
  .quizWrapper{
    background-color: #FEF9CC;
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 85%;
    height: 25vh;
    margin: 2em;
    position: relative;
    border-style: solid;
    border-bottom-color: black;
    border-width: 0.4em;
  }
  .gameIdBox{
    display: flex;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    top:0;
    height: 20%;
    justify-content: center;
    order: 0;
    font-size: 4vh;
  }
  .gameDescription{
    height: 90%;
    bottom: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    order: 1;
    font-size: 5vw;
  }
  .gameDetails{
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    text-align: center;
    height: 75%;
    bottom: 0;
    display: flex;
    justify-content: center;
  }
}
</style>