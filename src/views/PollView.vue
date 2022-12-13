<template>
  <body>
    <div>
      HÄR SKA VI SPELA SPELET: {{selectedQuiz.gameId}}
      <br>

      Frågor nedan!!!
      <br>

      <div v-for="question in this.selectedQuiz.questions" v-bind:question="question"
           v-bind:key="question" >
        <QuestionComponent v-if="knapp"
                           v-bind:question="question"
                           v-bind:key="question" >
        </QuestionComponent>

      </div>
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
import QuestionComponent from '@/components/QuestionComponent.vue';
// import ReorderQuestion from '@/components/ReorderQuestion.vue';
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'PollView',
  components: {QuestionComponent},
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
      knapp:true,

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