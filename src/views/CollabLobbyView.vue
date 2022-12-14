<template>
  <body>
  <div>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <div class="backButtonDiv">
      <button class="backButton" v-on:click="this.$router.go(-1)">
            <span class="material-symbols-outlined">
              arrow_back
            </span>
      </button>
    </div>
    <h1>{{uiLabels.joinId}}  {{this.gameId}}</h1>
  </div>

  <div class="pageGrid">
    <div class="userListWrapper">
      <h2>{{uiLabels.connectedPlayers}}</h2>
      <UserComponent v-for="user in this.connectedUsers"
                     v-bind:user="user"
                     v-bind:key="user">
      </UserComponent>
    </div>


    <div class="questionToolWrapper">
      <h3>{{uiLabels.addQuestions}}</h3>
      <input class="questionInput" type="text"
             v-model="questionObject.questionText" v-bind:placeholder="uiLabels.typeHere" autofocus>

      <div  class="answerButtonsWrapper">
        <button v-on:click="chooseAnswer(true)" class="answerButton true"
                :class="{selected: trueSelected}">
          {{uiLabels.true}}
        </button>
        <button v-on:click="chooseAnswer(false)" class="answerButton false"
                :class="{selected: falseSelected}">
          {{uiLabels.false}}
        </button>

      </div>

      <button class="questionButtons" v-on:click="validateForm();addQuestion()">
        {{uiLabels.addYourQuestion}}
      </button>
    </div>



    <div class="questionListWrapper">
      <h2>{{uiLabels.theQuestions}}</h2>
      <div class="questionList" v-for="(question,index) in questionList"
           v-bind:key="question">

        <div class="questionWrapper">
          <button v-on:click="deleteQuestion(index)" class="deleteButton">
                <span
                    class="material-symbols-outlined X">
                  DELETE
                </span>
          </button>
          <div class="question">
            {{uiLabels.theQuestion +(index+1)}}<br>
          </div>
        </div>
      </div>
    </div>
  </div>
  </body>
</template>

<script>
import io from 'socket.io-client';
import UserComponent from "@/components/UserComponent";
const socket = io();


export default {
  name: "CollabLobbyView",
  components: {
    UserComponent
  },
  data: function () {
    return {
      gameId:"",
      questionObject: {questionText: "", questionAnswer: undefined},
      questionList: [],
      trueSelected: false,
      falseSelected: false,
      userIsHost: false,

      uiLabels: {},
      lang: "",
      connectedUsers:[],
      myUsername:""
    }
  },
  created: function () {
    this.myUsername=this.$route.params.nick;
    this.gameId=this.$route.params.id;
    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels

    })

    socket.emit('joinPoll',this.gameId)

    socket.emit('getQuestions',this.gameId)
    socket.on('returnQuestions', (questions)=>{
      this.questionList=questions
    })

    socket.emit('getUsers', this.gameId)
    socket.on('returnUsers', (users)=>{
      this.connectedUsers = users
    })

    socket.on('userJoined', (users) => {
      console.log('user joined')
      this.connectedUsers = users
    })

    socket.on('collabQuestionAdded', (questions)=>{
      console.log("question added"+questions)
      this.questionList=questions})

    socket.on('collabQuestionDeleted', (questions)=>{
      console.log("question removed"+questions)
      this.questionList=questions})

    socket.on('gameTerminated', ()=>{
      this.redirectUserHome()
    })

  },
  methods: {
    redirectUserHome: function(){
      this.$router.push({path: '/'})
    },
    validateForm: function () {
      if (this.questionObject.questionAnswer === undefined ||
          this.questionObject.questionText === "") {
        return this.formValidation=false;
      }
      else {
        return this.formValidation = true;
      }
    },
    chooseAnswer: function(answer) {
      if(answer){
        this.questionObject.questionAnswer=true
        this.trueSelected=!this.trueSelected
        this.falseSelected=false;
      }else{
        this.questionObject.questionAnswer=false
        this.falseSelected=!this.falseSelected;
        this.trueSelected=false;
      }
    },
    addQuestion: function () {
      if(this.formValidation===true) {
        const question = Object.assign({}, this.questionObject)
        socket.emit('addCollabQuestion', {question: question,gameId: this.gameId} )
      }
      this.questionObject.questionText= "";
      this.questionObject.questionAnswer =  undefined;
      this.falseSelected=false;
      this.trueSelected=false;
    },
    deleteQuestion: function (index) {
      socket.emit('deleteCollabQuestion', {gameId: this.gameId, index: index})
    },
  }
}
</script>

<style scoped>
/**{*/
/*  outline: 1px solid greenyellow;*/
/*}*/

body{
  background: #EF233C;
  background: radial-gradient(circle, #EF233C 35%, #D80032 90%);
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  font-family: "Silkscreen", cursive;
}

h1{
  color: #00C3BA;
  font-size: 4vw;
  margin-bottom: 0;
  /*-webkit-text-stroke: 0.01vw black;*/
  text-shadow: 4px 2px black;
}

.pageGrid{
  display: flex;
  width: 100%;
  height: 85%;

}

.backButtonDiv{

  position: absolute;

}



.backButton{
  font-family: "Press Start 2P",cursive;
  color: #FEF9CC;
  background-color: #00C3BA;
  /*-webkit-text-stroke: 1px black;*/
  cursor: pointer;
  width: 10vw;
  height: 10vh;
  margin-left: 20px;
  font-size: 0.9vw;
  text-shadow: 2px 2px #1F6E77;
  /*border-radius: 4vw;*/
  box-shadow: inset -0.35em -0.35em #268b96;
  border-color: #2B211B;
  border-width: 0.4vw;
  border-style: solid ;
  /*transition-duration: 0.15s;*/
}
.backButton:hover {
  background-color: #31a6b2;
  box-shadow: inset -0.25em -0.25em #027a75;
  /*border-width: 0.3vw;*/
  color: #FEF9CC;
}

.material-symbols-outlined {
  font-size: 4vw ;
  font-variation-settings:
      'FILL' 1,
      'wght' 700,
      'GRAD' 200,
      'opsz' 48
}


.userListWrapper{

  justify-content: center;
  flex-wrap: wrap;
  width: 20%;
  margin-top: 20px;
  margin-left: 20px;
  overflow: auto;
  height: 85%;
  order:0;

  color: #2B211B;
  background-color: #FEF9CC;
  box-shadow: inset -0.5em -0.5em #c2bd8e;
  border-style: solid;
  border-width: 0.5vw;


}

.questionToolWrapper{
  display: grid;
  justify-items: center;
  width: 60%;
  height: 95%;
  order: 1;

  text-align: center;
}

h3{
  font-size: 2vw;
}

.questionInput{
  font-family: "Press Start 2P",cursive;
  border: none;
  color: #FEF9CC;
  background: transparent;
  width: 70%;
  height: 7vh;
  font-size: 2vw;
  border-bottom-style: solid;
  border-bottom-color: #2B211B;
  text-align:center;
}

::placeholder{
  color: #FEF9CC;
  opacity: 70%;
}

.answerButtonsWrapper{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4em;
  width: 50%;
  margin-top: 1em;
  margin-bottom: 1em;
}
.answerButton{
  width: 40%;
  margin: 1em;
  height: 90%;
  font-family: "Press Start 2P",cursive;
  color: #FEF9CC;
  /*-webkit-text-stroke: 1px black;*/
  cursor: pointer;
  font-size: 1vw;
  /*border-radius: 4vw;*/
  border-color: #2B211B;
  border-width: 0.3vw;
}

.answerButton.true{
  background-color: #3dda09;
  text-shadow: 2px 2px #2fa409;
  box-shadow: inset -0.25em -0.25em #2a9108;
  font-size: 1.4vw;
}

.answerButton.false{
  background-color: #ff0000;
  text-shadow: 2px 2px #bb0000;
  box-shadow: inset -0.25em -0.25em #bb0000;
  font-size: 1.4vw;
}
.answerButton.true:hover{
  box-shadow: inset -0.15em -0.15em #174d05;
  padding-right: 0.05em;
  padding-top: 0.15em;
  background-color: #299306;
  text-shadow: 2px 2px #174d05;
}

.answerButton.true.selected{
  box-shadow: inset -0.15em -0.15em #174d05;
  padding-right: 0.05em;
  padding-top: 0.15em;
  background-color: #299306;
  text-shadow: 2px 2px #174d05;
}

.answerButton.false:hover{
  box-shadow: inset -0.15em -0.15em #410000;
  padding-right: 0.05em;
  padding-top: 0.15em;
  background-color: #ad0101;
  text-shadow: 2px 2px #410000;
}

.answerButton.false.selected{
  box-shadow: inset -0.15em -0.15em #410000;
  padding-right: 0.05em;
  padding-top: 0.15em;
  background-color: #ad0101;
  text-shadow: 2px 2px #410000;
}



.questionButtons{
  font-family: "Press Start 2P",cursive;
  color: #FEF9CC;
  background-color: #00C3BA;
  /*-webkit-text-stroke: 1px black;*/
  cursor: pointer;
  width: 30vw;
  height: 10vh;
  margin: 20px;
  font-size: 1.8vw;
  text-shadow: 2px 2px #1F6E77;
  /*border-radius: 4vw;*/
  box-shadow: inset -0.15em -0.15em #268b96;
  border-color: #2B211B;
  border-width: 0.4vw;

  /*transition-duration: 0.15s;*/

}
.questionButtons:hover{
  padding-right: 0.05em;
  padding-top: 0.05em;
  background-color: #31a6b2;
  box-shadow: inset -0.1em -0.1em #027a75;
  /*border-width: 0.3vw;*/
  color: #FEF9CC;
}

.questionListWrapper{
  order:2;
  width: 20%;
  flex-wrap: wrap;
  margin-top: 20px;
  margin-right: 20px;
  overflow: auto;
  height: 85%;
  color: #2B211B;
  background-color: #FEF9CC;
  box-shadow: inset -0.5em -0.5em #c2bd8e;
  border-style: solid;
  border-width: 0.5vw;

}


.questionList{
  text-align: left;

}

.questionWrapper{
  display: flex;
  align-items: center;
  width: 90%;
  background-color: #00C3BA;
  border-style: solid;
  border-color: #1F6E77;
  margin: 1em;
}

.deleteButton{
  width: 2.5em;
  height: 2.5em;
  margin: 0.2em;
  padding-left: 0.2em;
  padding-bottom: 0.2em;
  order: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #FEF9CC;
  border: solid;
  box-shadow: inset -0.2em -0.2em #c2bd8e;

}

.deleteButton:hover{
  background-color: #FEF9CC;
  padding-right: 0.2em;
  padding-top: 0.2em;
  box-shadow: inset 0 0;
}
.material-symbols-outlined.X{
  font-size: 2vw;
  color: #ff0000;
  font-variation-settings:
      'FILL' 0,
      'wght' 400,
      'GRAD' 0,
      'opsz' 48
}


.question{
  width: 85%;

  word-wrap: break-word;
}
</style>