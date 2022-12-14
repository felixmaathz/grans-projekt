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
            v-if="remainingTime>5"
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

  <!-- <div>


     <QuestionComponent v-bind:question="question"
               v-on:answer="submitAnswer"/>
   </div>
   <div style="margin: 2em">
       <button style="position:absolute; bottom:100px;" v-on:click="this.$router.go(-1)">{{uiLabels.goBack}}</button>
     </div>-->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

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
      yourScore: 0,
      theUser: "",
      gameId: "",

      isPopUpVisible: true,

      remainingTime:15
    }
  },


  created: function () {
    this.lang = this.$route.params.lang;
    this.theUser = this.$route.params.nick;
    this.gameId = this.$route.params.id;
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
    })


  },
  methods: {

    timer: function(){
      if(this.remainingTime>-1){
        setInterval(this.decreaseTime,1000)
      }
      setInterval(this.nextQuestion,15000)
    },
    decreaseTime: function(){
      this.remainingTime--
    },
    nextQuestion: function () {
      if (this.activeIndex === this.selectedQuiz.questions.length - 1) {
        console.log("slut på frågor")
        socket.emit('totalScore', {theGameId: this.gameId, theUser: this.theUser, theScore: this.yourScore})
      } else {
        this.remainingTime=15
        this.activeIndex += 1;
      }
    },
    saveAnswer: function (event) {
      console.log("Svaret " + event + " kom fram till pollview")
      this.answeredQuestions.a.push(event)
      console.log(this.answeredQuestions.a)
    },

    closePopUp: function () {
      this.isPopUpVisible = false;
      this.timer()
    }
  },
}




</script>

<style>

</style>