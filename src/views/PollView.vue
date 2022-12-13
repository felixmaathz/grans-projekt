<template>
  <div>
    <WaitingComponent
      v-show="isPopUpVisible"
      @close="closePopUp"/>

  </div>
  <body>
  {{uiLabels.theScore}} {{yourScore}}
    <div>
      HÄR SKA VI SPELA SPELET: {{selectedQuiz.gameId}}
      <br>

      Frågor nedan!!!
      <br>

      <div
        v-for="(question, index) in this.selectedQuiz.questions" v-bind:question="question" :key="index">

        <QuestionComponent

            v-show= "index==activeIndex"
            v-bind:question="question"
            v-on:answer = "saveAnswer($event)">

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
      <button v-on:click="nextQuestion()"> Next question</button>

    </div>

  </footer>
  </body>
</template>

<script>
// @ is an alias to /src
import QuestionComponent from '@/components/QuestionComponent.vue';
// import ReorderQuestion from '@/components/ReorderQuestion.vue';
import io from 'socket.io-client';
import WaitingComponent from '@/components/WaitingComponent.vue';
const socket = io();

export default {
  name: 'PollView',
  components: {WaitingComponent, QuestionComponent},
  //components: {
    //QuestionComponent,
    // ReorderQuestion
  //},
  data: function () {
    return {
      selectedQuiz: {},
      answeredQuestions: {
        q: "",
        a: []
      },
      pollId: "inactive poll",
      uiLabels: {},
      lang: "",
      activeIndex: 0,
      yourScore:0,
      theUser:"",
      gameId:"",

      isPopUpVisible: true


    }
  },


  created: function () {


    this.lang = this.$route.params.lang;
    this.theUser = this.$route.params.nick;
    this.gameId =this.$route.params.id;
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

    nextQuestion: function() {
      if(this.activeIndex == this.selectedQuiz.questions.length-1) {
          console.log("slut på frågor")
          socket.emit('totalScore', {theGameId: this.gameId, theUser: this.theUser, theScore:this.yourScore})
      }
      else {
        this.activeIndex +=1;
      }
    },
    saveAnswer: function(event) {
      console.log("Svaret "+event+ " kom fram till pollview")
      this.answeredQuestions.a.push(event)
      console.log(this.answeredQuestions.a)

      if(event === this.selectedQuiz.questions[this.activeIndex].questionAnswer) {
        console.log("rätt svar")
        this.yourScore +=1000
        console.log("Du har " + this.yourScore)
      }
      else{
        console.log("fel svar")
      }
    },
    closePopUp() {
      this.isPopUpVisible = false;
    }
  },
}
</script>

<style>
.questions{

  border: solid;
  width: 300px;
  height: 50px;

}


</style>