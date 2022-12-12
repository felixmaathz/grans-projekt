<template>
  <body>
    <div>
      HÄR SKA VI SPELA SPELET <br>
      Game Id: {{selectedQuiz.gameId}}<br>
      <p v-for="username in this.selectedQuiz.connectedUsers" v-bind:key="username">
      Deltagare: {{username.username}}</p><br>
      Frågor: <p v-for="question in this.selectedQuiz.questions" v-bind:key="question">
      {{question.questionText}} </p>

      <p>{{selectedQuiz.questions}}</p>

       <QuizComponent >

      </QuizComponent>
      </div>
<!--  <div>
    <ReorderQuestion />
    {{pollId}}
    <QuestionComponent v-bind:question="question"
              v-on:answer="submitAnswer"/>
  </div>-->
  <footer>
    <div style="margin: 2em">
      <button style="position:absolute; bottom:100px;" v-on:click="this.$router.go(-1)">{{uiLabels.goBack}}</button>
    </div>

  </footer>
  </body>
</template>

<script>
// @ is an alias to /src
//import QuestionComponent from '@/components/QuestionComponent.vue';
// import ReorderQuestion from '@/components/ReorderQuestion.vue';
import io from 'socket.io-client';
import QuizComponent from "@/components/QuizComponent";
const socket = io();

export default {
  name: 'PollView',
  components: {QuizComponent},
  //components: {
    //QuestionComponent,
    // ReorderQuestion
  //},
  data: function () {
    return {
      selectedQuiz: {},
      question: {
        q: "",
        a: []
      },
      pollId: "inactive poll",
      uiLabels: {},
      lang: "",
    }
  },
  created: function () {

    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    }),

        this.pollId = this.$route.params.id
    socket.emit('joinPoll', this.pollId)
    socket.on("newQuestion", q =>
        this.question = q
    )

    socket.emit('getSelectedQuiz');
    console.log("niklas har gjort rätt")
    socket.on('returnSelectedQuiz', (quizList) => {
      this.selectedQuiz = quizList
      console.log(this.selectedQuiz)
      console.log("det har kommit fram")
    })
  },
  methods: {
    submitAnswer: function (answer) {
      socket.emit("submitAnswer", {pollId: this.pollId, answer: answer})
    },
  }
}
</script>

<style>
.questions{

  border: solid;
  width: 300px;
  height: 50px;

}

</style>