<template>
    <WaitingComponent
        v-show="isPopUpVisible"
        v-on:close="closePopUp"/>
  <body>

  {{uiLabels.theScore}} {{yourScore}}
    <div>
      HÄR SKA VI SPELA SPELET: {{selectedQuiz.gameId}}
      <br>

      <div class="progressBarWrapper">
        <div class="progressBar"
             v-if="remainingTime>1">
          <div class="progressBarFill">

          </div>
        </div>
      </div>

      <div
        v-for="(question, index) in this.selectedQuiz.questions" v-bind:question="question" :key="index">

      <QuestionComponent
          v-if="remainingTime>5"
          v-show= "index==activeIndex"
          v-bind:question="question"
          v-on:answer = "saveAnswer($event)">

      </QuestionComponent>
    </div>
      <div class="leaderboard"
           v-if="remainingTime<5">

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
  <button v-on:click="stopGame()">STOP</button>
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

      selectedAnswer: undefined,

      isPopUpVisible: true,
      progressWidth: 100,
      progressColor: "green",
      remainingTime:15,

      progressTimer: undefined,
      decreaseTimer: undefined,
      questionTimer: undefined,

      start: 0,
      end: 0,

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
    socket.on('returnSelectedQuiz', (quizList) => {
      this.selectedQuiz = quizList
    })


  },
  methods: {

    stopGame: function() {
      clearInterval(this.progressTimer)
      clearInterval(this.decreaseTimer)
      clearInterval(this.questionTimer)
    },

    timer: function(){
      this.progressTimer = setInterval(this.increaseProgressBar, 100)
      this.decreaseTimer = setInterval(this.decreaseTime,1000)
      this.questionTimer = setInterval(this.nextQuestion,15000)
    },
    increaseProgressBar: function (){
      if(this.remainingTime>-1){
        if(this.progressWidth>0){
          this.progressWidth-=1
        }
      }
      if(this.remainingTime<15 && this.remainingTime>10){
        this.progressColor="yellow"
      }
      if(this.remainingTime<10){
        this.progressColor="red"
      }

    },
    decreaseTime: function(){
      if(this.remainingTime>-1){
        this.remainingTime--
        console.log(this.remainingTime)
      }
      if(this.remainingTime===5){
        this.answeredQuestions.a.push(this.selectedAnswer)
        console.log(this.answeredQuestions.a)
        if(this.selectedAnswer === this.selectedQuiz.questions[this.activeIndex].questionAnswer) {
          this.yourScore=this.yourScore+(10000-this.end+this.start)
          console.log("rätt svar")
          console.log("Du har " + this.yourScore)
          socket.emit('totalScore', {theGameId: this.gameId, theUser: this.theUser, theScore: this.yourScore})
        }
        else{
          console.log("fel svar")
        }
      }

    },
    nextQuestion: function () {
      if (this.activeIndex === this.selectedQuiz.questions.length - 1) {
        console.log("slut på frågor")
        socket.emit('totalScore', {theGameId: this.gameId, theUser: this.theUser, theScore: this.yourScore})
        this.remainingTime=-1
        clearInterval(this.progressTimer)
        clearInterval(this.decreaseTimer)
        clearInterval(this.questionTimer)
        this.$router.push({path: '/result/'+this.gameId +'/'+this.lang})
      } else {
        this.start=Date.now()
        console.log("start timer "+this.start)
        this.remainingTime=15
        this.progressWidth=100
        this.activeIndex += 1;
      }
    },
    saveAnswer: function (event) {
      this.selectedAnswer=event
      console.log("Svaret " + event + " kom fram till pollview")
      this.end=Date.now()
      console.log("end timer "+this.end)
      // this.answeredQuestions.a.push(event)
      // console.log(this.answeredQuestions.a)


      // if(event === this.selectedQuiz.questions[this.activeIndex].questionAnswer) {
      //   console.log("rätt svar")
      //   this.yourScore +=1000
      //   console.log("Du har " + this.yourScore)
      // }
      // else{
      //   console.log("fel svar")
      // }
    },

    closePopUp: function () {
      this.isPopUpVisible = false;
      this.timer()
      this.start=Date.now()
    }
  },
}




</script>

<style scoped>

/**{*/
/*  outline: solid 1px greenyellow;*/
/*}*/

.progressBarWrapper{
  display: flex;
  justify-content: center;
}

.progressBar{
  justify-content: center;
  width: 40em;
  height: 40px;
  border-style: solid;
  border-color: #2B211B;
}

.progressBarFill{
  background-color: v-bind(progressColor);
  height: 100%;
  width: v-bind(progressWidth+"%");
  transition: width 150ms, background-color 5s;
  transition-timing-function: linear;
}

.leaderboard{
  height: 10em;
  width: 10em;
  background-color: #2B211B;
}

body {
  background: #268b96;
  background: radial-gradient(circle, #8af0ff 25%, #00a9bb 60%);
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  font-family: "Silkscreen", cursive;

}

</style>