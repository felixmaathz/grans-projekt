'use strict';

const languages = ["en", "se"];

// Store data in an object to keep the global namespace clean
function Data() {
  this.finishedQuizzes = [];
  this.editThisQuiz = {};
  this.createdGame={gameId:"",connectedUsers: [], questions: []};
}

/***********************************************
For performance reasons, methods are added to the
prototype of the Data object/class
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
***********************************************/

Data.prototype.getUILabels = function (lang = "en") {
  const ui = require("./data/labels-" + lang + ".json");
  return ui;
}

Data.prototype.createPoll = function(gameId) {
  console.log(gameId)
  let finishedQuiz = {gameId: gameId,questionList:[]}
  // this.finishedQuizzes[gameId]=finishedQuiz
  this.finishedQuizzes.push(finishedQuiz)
  console.log(finishedQuiz)
  console.log(this.finishedQuizzes)
  return finishedQuiz
}

Data.prototype.addQuestion = function(gameId, q) {

  for(let i=0;i<this.finishedQuizzes.length;i++){
    if (this.finishedQuizzes[i].gameId===gameId){
      this.finishedQuizzes[i].questionList.push(q);
      console.log("question added to", gameId, q);
      console.log(this.finishedQuizzes[i].questionList)
    }else{
      console.log("Quiz not found")
    }
  }
}

Data.prototype.removeQuestion=function(gameId,index){
  console.log("remove"+gameId+index)
  for(let i=0;i<this.finishedQuizzes.length;i++){
    if (this.finishedQuizzes[i].gameId===gameId){
      this.finishedQuizzes[i].questionList.splice(index,1)
      console.log("removed question from "+gameId)
      console.log(this.finishedQuizzes[i].questionList)
      return(this.finishedQuizzes[i].questionList)
    }
  }
}

Data.prototype.getQuizzes= function (){
  return this.finishedQuizzes;
}

Data.prototype.removeQuiz=function(gameId){
  for(let i=0;i<this.finishedQuizzes.length;i++){
    if (this.finishedQuizzes[i].gameId===gameId){
      this.finishedQuizzes.splice(i,1)
      console.log("removed "+gameId)
      console.log(this.finishedQuizzes)
    }
  }
}

Data.prototype.editTheQuiz=function(quiz){
  this.editThisQuiz=quiz
  console.log("saved quiz for edit"+this.editThisQuiz)
}

Data.prototype.getQuizForEdit=function(){
  return this.editThisQuiz
}

Data.prototype.replaceQuiz=function(quiz){
  for(let i=0;i<this.finishedQuizzes.length;i++){
    if (this.finishedQuizzes[i].gameId===quiz.gameId){
      this.finishedQuizzes[i]=quiz
      console.log("quiz replaced "+quiz)
      this.editThisQuiz={}
    }
  }
}

Data.prototype.createGame=function (quiz){
  this.createdGame.gameId=quiz.gameId;
  this.createdGame.questions=quiz.questionList;
  console.log("Created game '"+quiz.gameId+"' successfully!")
}

Data.prototype.joinGame=function(user){

  if(user.joinGameId===this.createdGame.gameId){
    this.createdGame.connectedUsers.push(user)
    console.log("User '"+user.username+"' connected")
  }else{
    console.log("Game ID not found!")
  }
}

Data.prototype.getUsers=function(){
  return this.createdGame.connectedUsers;
}
// Data.prototype.createPoll = function(gameId, lang="en")
//   if (typeof this.finishedQuizzes[gameId] === "undefined") {
//     let poll = {};
//     poll.lang = lang;
//     poll.questions = [];
//     poll.answers = [];
//     poll.currentQuestion = 0;
//     this.finishedQuizzes[gameId] = poll;
//     console.log("poll created", gameId, poll);
//   }
//   return this.finishedQuizzes[gameId];
// }

// Data.prototype.addQuestion = function(gameId, q) {
//   const poll = this.finishedQuizzes[gameId];
//   console.log("question added to", gameId, q);
//   if (typeof poll !== 'undefined') {
//     poll.questionList.push(q);
//   }
// }

Data.prototype.editQuestion = function(gameId, index, newQuestion) {
  const poll = this.finishedQuizzes[gameId];
  if (typeof poll !== 'undefined') {
    poll.questions[index] = newQuestion;
  }
}

Data.prototype.getQuestion = function(gameId, qId=null) {
  const poll = this.finishedQuizzes[gameId];
  console.log("question requested for ", gameId, qId);
  if (typeof poll !== 'undefined') {
    if (qId !== null) {
      poll.currentQuestion = qId;
    }
    return poll.question[poll.currentQuestion];
  }
  return []
}

//Not needed as questionObject contains question and answer
Data.prototype.submitAnswer = function(gameId, answer) {
  const poll = this.finishedQuizzes[gameId];
  console.log("answer submitted for ", gameId, answer);
  if (typeof poll !== 'undefined') {
    let answers = poll.answers[poll.currentQuestion];
    if (typeof answers !== 'object') {
      answers = {};
      answers[answer] = 1;
      poll.answers.push(answers);
    }
    else if (typeof answers[answer] === 'undefined')
      answers[answer] = 1;
    else
      answers[answer] += 1
    console.log("answers looks like ", answers, typeof answers);
  }
}

Data.prototype.getAnswers = function(gameId) {
  const poll = this.finishedQuizzes[gameId];
  if (typeof poll !== 'undefined') {
    const answers = poll.answers[poll.currentQuestion];
    if (typeof poll.questions[poll.currentQuestion] !== 'undefined') {
      return {q: poll.questions[poll.currentQuestion].q, a: answers};
    }
  }
  return {}
}
module.exports = Data;



