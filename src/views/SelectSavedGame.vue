<template>
  <body>
  <div>
    <div>
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
      quizNames: "",
      gameId:""
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

.quizList{
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

</style>