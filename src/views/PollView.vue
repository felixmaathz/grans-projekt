<template>
  <body>

    {{points}}

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
            v-on:answer= "saveAnswer($event)"        >

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
      questionAnswerList: {
        q: "",
        a: []
      },
      pollId: "inactive poll",
      uiLabels: {},
      lang: "",
      activeIndex: 0,
      points: 0,
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
    })


  },
  methods: {
    /*submitAnswer: function (answer) {
      socket.emit("submitAnswer", {pollId: this.pollId, answer: answer})
    },*/
    nextQuestion: function() {
      if(this.activeIndex == this.selectedQuiz.questions.length-1) {
          console.log("slut på frågor")
          socket.emit('totalScore', this.points)
        return
      }
      else {
        this.activeIndex +=1;
      }
    },
    saveAnswer: function(event){
      console.log("kom fram"+ event)
      this.questionAnswerList.a.push(event)
      console.log(this.questionAnswerList.a)
      console.log(this.selectedQuiz.questions[0].questionAnswer)
      if(event=== this.selectedQuiz.questions[this.activeIndex].questionAnswer){
        console.log(" rätt svar")
        this.points += 1;
        console.log("poäng: " + this.points)
      }
      else{
        console.log(" fuck u")
      }
    },
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