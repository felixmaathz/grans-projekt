<template>
  <div class="quizWrapper">
    <div class="gameIdBox">
      <span class="gameId">{{ quiz.gameId}}</span>
    </div>
    <div class="gameDescription">
      <p v-if="this.numberOfQuestions>1">{{this.numberOfQuestions+ " " + uiLabels.questions}}</p>
      <p v-if="this.numberOfQuestions===1">{{this.numberOfQuestions+ " " + uiLabels.oneQuestion}}</p>
    </div>
    <div class="gameDetails">
      <router-link v-bind:to = "'/hostpregame/'+lang"> <button class="playEditButtons">{{uiLabels.playAGame}}</button></router-link>
      <router-link v-bind:to = "'/editquiz/'+lang"> <button class="playEditButtons" v-on:click="exportGameId()">{{uiLabels.editTheGame}}</button></router-link>
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
    this.editGameID = this.quiz.gameId
    socket.emit('saveGameID', this.editGameID)

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
      editGameID: "",
    }
  },
  methods:{
    exportGameId: function(){
      socket.emit('editQuiz',this.editGameID)
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

.playEditButtons{
  width: 50%;
  font-size: 3.5vh;
}

.quizWrapper{
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 25vw;
  height: 20vh;
  margin: 25px;
  border-style: solid;
  position: relative;
}

.gameIdBox{
  border-style: solid;
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

  font-size: 3vh;
}
.gameDescription{
  height: 45%;
  bottom: 30%;
  border-style: solid;
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
  height: 30%;
  bottom: 0;
  display: flex;
  justify-content: center;

}



</style>