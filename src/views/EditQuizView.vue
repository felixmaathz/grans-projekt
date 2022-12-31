<!-- CSS OK for laptop -->
<template>
  <body>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
  <div class="header">
    <div class="backButtonDiv">
      <button class="backButton" v-on:click="goBack()">
          <span class="material-symbols-outlined">
            arrow_back
          </span>
      </button>
    </div>
    <h1 class="header" >
      {{uiLabels.editTheGame}}: {{this.finishedQuiz.gameId}}
    </h1>

  </div>
  <div>

    <div class="pageGrid">
      <div class="questionToolWrapper">
        <h3>{{uiLabels.gameId}}: {{this.finishedQuiz.gameId}}</h3>
        <button class="removeButton" v-on:click="removeQuiz()">
                          <span
                              class="material-symbols-outlined Remove">
                  DELETE
                </span>
        </button>
        <input class="questionInput" type="text"
               v-model="questionObject.questionText" v-bind:placeholder="uiLabels.typeHere" autofocus>
        <div  class="answerButtonsWrapper">
          <!--          {{uiLabels.answer}}:-->
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


        <router-link v-bind:to="'//'">
          <button class="questionButtons" >
            {{uiLabels.playGame}}
          </button>
        </router-link>
      </div>

      <div class = "questionListWrapper">
        <h3>
          {{uiLabels.questionList}}
        </h3>

        <div class="questionList"
             v-for="(question,index) in finishedQuiz.questionList"
             v-bind:key="question">

          <div class="questionWrapper">
            <button v-on:click="deleteQuestion(index)"
                    class="deleteButton">
                <span
                    class="material-symbols-outlined X">
                  DELETE
                </span>
            </button>

            <div class="question">
              {{uiLabels.q + question.questionText}}<br>
              {{uiLabels.a +question.questionAnswer}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </body>
</template>

<script>
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'EditQuizView',
  data: function () {
    return {
      listOfQuizzes: undefined,
      gameId: "",
      finishedQuiz: {name: "", listOfQuestions: []},
      questionObject: {questionText: "", questionAnswer: undefined},
      formValidation: false,
      trueSelected: false,
      falseSelected: false,
      finishedQuizzes: [],
      isUnique: false,

      lang: "",

      question: "",
      answers: ["", ""],
      questionNumber: 0,
      data: {},
      uiLabels: {}
    }
  },
  created: function () {

    socket.emit('getQuizzes');
    socket.on('returnQuizzes', (quizList) =>{
          this.listOfQuizzes=quizList
    })

    socket.emit('getQuizForEdit');
    socket.on('returnQuizForEdit', (quizForEdit) =>{
      this.finishedQuiz=quizForEdit

      let object = JSON.stringify(this.finishedQuiz)
      console.log("saved"+object)
    })


    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
    socket.on("dataUpdate", (data) =>
        this.data = data
    )
    socket.on("pollCreated", (data) =>
        this.data = data)

  },

  methods: {
    // createPoll: function () {
    //   socket.emit("createPoll", {pollId: this.pollId, lang: this.lang })
    // },

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
        console.log(this.finishedQuiz.questionList)
        socket.emit("addQuestion", {gameId: this.finishedQuiz.gameId, q: question})
        this.finishedQuiz.questionList.push(question)
      }
      this.questionObject.questionText= "";
      this.questionObject.questionAnswer =  undefined;
      this.falseSelected=false;
      this.trueSelected=false;
    },
    // addAnswer: function () {
    //   this.answers.push("");
    // },
    // runQuestion: function () {
    //   socket.emit("runQuestion", {pollId: this.pollId, questionNumber: this.questionNumber})
    // },

    deleteQuestion: function (index) {
      socket.emit('removeQuestion', {gameId: this.finishedQuiz.gameId, index: index})
      this.finishedQuiz.questionList.splice(index,1)
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
    replaceQuiz: function (){
      if(this.finishedQuiz.questionList.length===0){
        socket.emit('removeQuiz',this.finishedQuiz.gameId)
        console.log("removed"+this.finishedQuiz.gameId)
      }else{
        socket.emit('replaceQuiz', this.finishedQuiz)
      }
      this.$router.go(-1)
    },
    goBack:function(){
      if(this.finishedQuiz.questionList.length===0){
        socket.emit('removeQuiz',this.finishedQuiz.gameId)
        console.log("removed"+this.finishedQuiz.gameId)
      }else{
        socket.emit('replaceQuiz', this.finishedQuiz)
      }
      this.$router.go(-1)
    },
    removeQuiz: function (){
      let confirmation = confirm("Are you sure you want to remove this game?")
      if(confirmation){
        socket.emit('removeQuiz',this.finishedQuiz.gameId)
        this.$router.go(-1)
      }
    }
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

.header{
  display: flex;
}

.backButtonDiv{
  width: 10vw;
  height: 10vh;
  margin-right: 10vw;

}

.backButton{
  font-family: "Press Start 2P",cursive;
  color: #FEF9CC;
  background-color: #00C3BA;
  /*-webkit-text-stroke: 1px black;*/
  cursor: pointer;
  width: 10vw;
  height: 10vh;
  margin: 2vw;
  font-size: 0.9vw;
  text-shadow: 2px 2px #1F6E77;
  /*border-radius: 4vw;*/
  box-shadow: inset -0.35em -0.35em #268b96;
  border-color: #2B211B;
  border-width: 0.4vw;
  border-style: solid ;
  /*transition-duration: 0.15s;*/
}
.backButton:hover{
  background-color: #31a6b2;
  box-shadow: inset -0.25em -0.25em #027a75;
  /*border-width: 0.3vw;*/
  color: #FEF9CC;
}

.removeButton{

  position: absolute;
  right:50px;
  top:50px;
  width: 70px;
  height: 70px;
  color: #FEF9CC;
  background-color: #ff0000;
  text-shadow: 2px 2px #2B211B;
  box-shadow: inset -5px -5px #bb0000;
  border-color: #2B211B;
  border-width: 5px;
  border-style: solid ;
}

.removeButton:hover{
  padding-right: 0.25em;
  padding-top: 0.25em;
  background-color: #bb0000;
  box-shadow: inset -0.05em -0.05em #860000;
}

.material-symbols-outlined {
  font-size: 4vw ;
  font-variation-settings:
      'FILL' 1,
      'wght' 700,
      'GRAD' 200,
      'opsz' 48
}

.material-symbols-outlined.Remove{
  color: #fef9cc;
  font-size: 40px;
}



h1{
  color: #00C3BA;
  font-size: 5vw;
  /*-webkit-text-stroke: 0.01vw black;*/
  text-shadow: 4px 2px black;
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
  text-align: center;
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

.pageGrid{
  padding: 20px;
  margin: 3vw;
  margin-top: -1vw;
  display: flex;
  flex-direction: row;
  width: 90em;
  height: 30em;

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
.questionListWrapper {
  color: #2B211B;
  background-color: #FEF9CC;
  order: 0;
  width:37vw;
  height: 30em;
  overflow: auto;
  border-style: solid;
  border-width: 0.5vw;
  box-shadow: inset -0.5em -0.5em #c2bd8e;
}

.questionToolWrapper{
  display: grid;
  justify-items: center;
  width: 60vw;
  height: 95%;
  order: 1;
  margin-left: 0%;
  margin-right: 5%;
  text-align: center;
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
  order: 0;
  word-wrap: break-word;
  font-size: 1.5vw;
}
/* OPTIMIZATION FOR PHONE */
@media (max-width: 700px) {
  body{
    background: #EF233C;
    background: radial-gradient(circle, #EF233C 35%, #D80032 90%);
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    font-family: "Silkscreen", cursive;
  }
  .header{
    display: flex;
    font-size: 10vw;
  }
  .backButtonDiv{
    width: 10vw;
    height: 10vh;
    margin-right: 10vw;
  }
  .backButton{
    font-family: "Press Start 2P",cursive;
    color: #FEF9CC;
    background-color: #00C3BA;
    cursor: pointer;
    width: 20vw;
    height: 10vh;
    margin: 5vw;
    font-size: 2vw;
    text-shadow: 2px 2px #1F6E77;
    box-shadow: inset -0.35em -0.35em #268b96;
    border-color: #2B211B;
    border-width: 0.2em;
    border-style: solid ;
  }
  .backButton:hover{
    background-color: #31a6b2;
    box-shadow: inset -0.25em -0.25em #027a75;
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
  h1{
    color: #00C3BA;
    font-size: 7vw;
    margin-bottom: 2vw;
    text-shadow: 4px 2px black;
  }
  h3{
    font-size: 4vw;
    margin-top: 0.3em;
  }
  .questionInput{
    font-family: "Press Start 2P",cursive;
    border: none;
    color: #FEF9CC;
    background: transparent;
    width: 70%;
    height: 7vh;
    font-size: 4vw;
    border-bottom-style: solid;
    border-bottom-color: #2B211B;
    text-align:center;
    margin-left: -4vw;
    margin-bottom: 2vw;
    margin-top: 2vw;
  }
  ::placeholder{
    color: #FEF9CC;
    opacity: 70%;
  }
  .answerButtonsWrapper{
    width: 22em;
    height: 5em;
    margin-top: 2em;
    margin-bottom: 0.5em;
    margin-left: -1.2em;
  }
  .answerButton{
    margin: 0.4em;
    width: 100%;
    height: 90%;
    font-family: "Press Start 2P",cursive;
    color: #FEF9CC;
    cursor: pointer;
    border-color: #2B211B;
    border-width: 0.2em;
  }
  .answerButton.true{
    background-color: #3dda09;
    text-shadow: 2px 2px #2fa409;
    box-shadow: inset -0.25em -0.25em #2a9108;
    font-size: 5vw;
  }
  .answerButton.false{
    background-color: #ff0000;
    text-shadow: 2px 2px #bb0000;
    box-shadow: inset -0.25em -0.25em #bb0000;
    font-size: 5vw;
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
  .pageGrid{
    padding: 20px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    height: 44em;
  }
  .questionButtons{
    font-family: "Press Start 2P",cursive;
    color: #FEF9CC;
    background-color: #00C3BA;
    cursor: pointer;
    width: 18em;
    height: 5em;
    margin-top: 0em;
    margin-left: 0;
    font-size: 5vw;
    text-shadow: 2px 2px #1F6E77;
    /*border-radius: 4vw;*/
    box-shadow: inset -0.15em -0.15em #268b96;
    border-color: #2B211B;
    border-width: 0.2em;
  }
  .questionButtons:hover{
    padding-right: 0.05em;
    padding-top: 0.05em;
    background-color: #31a6b2;
    box-shadow: inset -0.1em -0.1em #027a75;
    color: #FEF9CC;
  }
  .questionListWrapper {
    color: #2B211B;
    background-color: #FEF9CC;
    order: 0;
    width:88.4vw;
    overflow: auto;
    border-style: solid;
    border-width: 0.2em;
    box-shadow: inset -0.5em -0.5em #c2bd8e;
  }
  .questionToolWrapper{
    display: grid;
    justify-items: center;
    width: 85vw;
    height: 75%;
    order: 1;
    text-align: center;
    margin-bottom: 4vw;
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
    margin-top: -0.5em;
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
  .material-symbols-outlined{
    font-size: 16vw;
    color: #fef9cc;
    font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 48
  }
  .material-symbols-outlined.X{
    font-size: 2em;
    color: red;
    font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 48
  }
  .question{
    width: 85%;
    font-size: 4vw;
    order: 0;
    word-wrap: break-word;
  }
}
</style>
