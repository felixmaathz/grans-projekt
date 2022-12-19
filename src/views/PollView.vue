<template>
    <WaitingComponent
        v-show="isPopUpVisible"
        v-on:close="closePopUp"/>
  <body>

    <div>
      <br>

      <div class="progressBarWrapper">
        <button v-on:click="stopGame()">STOP</button>
        {{uiLabels.theScore}} {{yourScore}}<br>
        {{uiLabels.gameRunning}} {{selectedQuiz.gameId}}
        <div class="progressBar"
             v-if="remainingTime>=progressBarVisible">
          <div class="progressBarFill">

          </div>
        </div>
      </div>

      <div
        v-for="(question, index) in this.selectedQuiz.questions" v-bind:question="question" :key="index">

      <QuestionComponent
          v-if="remainingTime>=questionVisible"
          v-show= "index==activeIndex"
          v-bind:question="question"
          v-on:answer = "saveAnswer($event)">

      </QuestionComponent>
    </div>
      <div class="leaderboardWrapper">
      <div v-if="remainingTime<leaderBoardVisible" class="leaderboard">
        {{uiLabels.leaderboard}}
        <hr>
        <div v-for="user in userList"
             v-bind:key="user">
          {{user.username}}:
          {{user.endScore}}
          <img src="@/banana.png" alt="Banana" style = "width:15px; height:15px">
          </div>
        </div>
      </div>
  </div>

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

      selectedAnswer: undefined,

      isPopUpVisible: true,
      progressWidth: 100,
      progressColor: "green",
      remainingTime:17,

      progressTimer: undefined,
      decreaseTimer: undefined,
      questionTimer: undefined,

      progressBarVisible: 5,
      questionVisible: 7,
      leaderBoardVisible: 5,

      start: 0,
      end: 0,

      userList:[]

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
    socket.emit('joinPoll', this.gameId)
    socket.on("newQuestion", q =>
        this.question = q
    )

    socket.emit('getSelectedQuiz');
    socket.on('returnSelectedQuiz', (quizList) => {
      this.selectedQuiz = quizList
    })

    socket.on('returnAllScores', (user)=>{
      console.log("Updated leaderboard")
      this.userList=user
      console.log("HEj"+JSON.stringify(this.userList))
      this.sortList(this.userList)
      })

    socket.on('gameTerminated', ()=>{
      this.redirectUserHome()
    })


  },
  methods: {

    sortList: function(list){
      list.sort((a, b) => parseFloat(b.endScore) - parseFloat(a.endScore));
    },

    redirectUserHome: function(){
      this.$router.push({path: '/'})
    },

    stopGame: function() {
      clearInterval(this.progressTimer)
      clearInterval(this.decreaseTimer)
      clearInterval(this.questionTimer)
    },

    timer: function(){
      this.progressTimer = setInterval(this.increaseProgressBar, 100)
      this.decreaseTimer = setInterval(this.decreaseTime,1000)
      this.questionTimer = setInterval(this.nextQuestion,17000)
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
      if(this.remainingTime<=5){
        socket.emit('getScore')
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
          socket.emit('totalScore', {theGameId: this.gameId, theUser: this.theUser, theScore: this.yourScore})
        }
      }

    },
    nextQuestion: function () {
      //Resetting parameters
      this.selectedAnswer = undefined;
      this.progressColor = "green";


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
        this.remainingTime=17
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
  flex-wrap: wrap;
  width: 50vw;
  margin: auto;
  background-color: #fef9cc;
  border-color: #2B211B;
  border-width: 0.3vw;
  border-style: solid;
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
  height: 20em;
  width: 15em;
  align-items: center;
  background-color: #FEF9CC;
  border-style: solid;
  border-color: #1F6E77;
  margin: 1em;

}
.leaderboardWrapper {
  display:flex;
  justify-content: center;
}

body {
  background: url("https://i.imgur.com/eTXACsr.gif");
  /*background: radial-gradient(circle, #00a9bb 25%, #477998 80%);*/
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  font-family: "Silkscreen", cursive;

}

</style>