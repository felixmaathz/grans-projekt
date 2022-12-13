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
  <p id="timer" class="timer ">
    10
  </p>

  <!-- <div>


     <QuestionComponent v-bind:question="question"
               v-on:answer="submitAnswer"/>
   </div>
   <div style="margin: 2em">
       <button style="position:absolute; bottom:100px;" v-on:click="this.$router.go(-1)">{{uiLabels.goBack}}</button>
     </div>-->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
  <div class="backButtonDiv">
    <button class="backButton" v-on:click="this.$router.go(-1)">
        <span class="material-symbols-outlined">
          Close
        </span>
    </button>
  </div>
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

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the countdown date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="timer"
  document.getElementById("timer").innerHTML = seconds;

  // Change the color of the timer based on the remaining time
  if (seconds > 5) {
    document.getElementById("timer").style.color = "green";
  } else if (seconds > 3) {
    document.getElementById("timer").style.color = "yellow";
  } else {
    document.getElementById("timer").style.color = "red";
  }

  // If the countdown is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("timer").innerHTML = "Let's go!";
  }
}, 1000);
</script>

<style scoped>

body {
  background: #268b96;
  background: radial-gradient(circle, #8af0ff 25%, #00a9bb 60%);
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  font-family: "Silkscreen", cursive;
}
#GameID {
  font-family: Silkscreen;
  font-size: 3em;
  margin-top: 4vh;
}
#theGameWillStartIn {
  font-size: 2em;
  font-family: Silkscreen;
  margin-top: 2vh;
}
#timer {
  font-size: 7em;
  font-weight: bold;
  font-family: Silkscreen;
}
.timer {
  font-size: 7em;
  font-weight: bold;
  font-family: Silkscreen;
  color: green;
}
.backButtonDiv{
  width: 10vw;
  height: 10vh;
  margin-right: 10vw;
}
.backButton{
  font-family: "Press Start 2P",cursive;
  color: #FEF9CC;
  background-color: red;
  /*-webkit-text-stroke: 1px black;*/
  cursor: pointer;
  width: 10vw;
  height: 10vh;
  margin-left: 50em;
  font-size: 0.9vw;
  text-shadow: 2px 2px #850000;
  /*border-radius: 4vw;*/
  box-shadow: inset -0.35em -0.35em #850000;
  border-color: #2B211B;
  border-width: 0.4vw;
  border-style: solid ;
  /*transition-duration: 0.15s;*/
}
.backButton:hover{
  background-color: #cc0000;
  box-shadow: inset -0.25em -0.25em #850000;
  /*border-width: 0.3vw;*/
  color: #FEF9CC;
}
.material-symbols-outlined {
  font-size: 5em;
  font-variation-settings:
      'FILL' 0,
      'wght' 400,
      'GRAD' 0,
      'opsz' 48
}

</style>