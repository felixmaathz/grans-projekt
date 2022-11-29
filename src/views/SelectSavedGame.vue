<template>
  <body>
  <div>
    <div>
      <h3>{{uiLabels.chooseOrEdit}}</h3>
      <div class="quizList">
        <QuizComponent v-for="quiz in this.listOfQuizzes"
                       v-bind:quiz="quiz"
                       v-bind:key="quiz.gameId">
        </QuizComponent>
      </div>
    </div>
  </div>


  <footer>
    <div style="margin: 2em">
      <button style="position:absolute; bottom:100px;" v-on:click="this.$router.go(-1)">{{uiLabels.goBack}}</button>
    </div>
  </footer>
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
      listOfQuizzes: undefined,
      uiLabels: {},
      lang: "",
      quizNames: ""
    }
  },
  created: function () {
    this.lang = this.$route.params.lang;
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
}
</script>

<style scoped>

.quizList{
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

</style>