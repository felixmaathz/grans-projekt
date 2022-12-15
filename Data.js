'use strict';

const languages = ["en", "se"];

// Store data in an object to keep the global namespace clean
function Data() {
  this.finishedQuizzes = [{gameId:"123",questionList:[{questionText:"är detta kul?",questionAnswer:true},
      {questionText:"Är Hugo 210cm", questionAnswer:false}, {questionText:"Är Gabriel törstig?", questionAnswer:true}]}];

  this.editThisQuiz = {};
  this.createdGame={gameId:"",connectedUsers: [], questions: []};
  this.gameId ="";
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
  for(let i=0;i<this.finishedQuizzes.length;i++){
    if(this.finishedQuizzes[i].gameId===gameId){
      return false;
    }
  }
  let finishedQuiz = {gameId: gameId,questionList:[]}
  // this.finishedQuizzes[gameId]=finishedQuiz
  this.finishedQuizzes.push(finishedQuiz)
  console.log(finishedQuiz)
  console.log(this.finishedQuizzes)
  return true
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

Data.prototype.getSelectedQuiz= function (){
  return(this.createdGame)
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
  this.createdGame.connectedUsers=[]
  console.log("Created game '"+quiz.gameId+"' successfully!")
}

Data.prototype.createCollabGame = function(user){
  this.createdGame.connectedUsers=[]
  this.createdGame.gameId=user.joinGameId
  this.createdGame.connectedUsers.push(user)
  this.createdGame.questions=[]
  console.log("Created collaborative game: "+user.joinGameId)
}

Data.prototype.addCollabQuestion = function(question){
  this.createdGame.questions.push(question)
  console.log("Added question: "+question.questionText)
  return this.createdGame.questions
}

Data.prototype.deleteCollabQuestion = function(index){
  console.log("Deleted question at index: "+index)
  this.createdGame.questions.splice(index,1)
  return this.createdGame.questions
}

Data.prototype.terminateGame = function (){
  this.createdGame.gameId=""
  this.createdGame.connectedUsers=[]
  this.createdGame.questions=[]
  console.log("Game terminated")
}

//Dom här två gör typ samma sak, ta bort den ena kanske?
Data.prototype.getQuestions = function(){
  console.log("Getting questions")
  return this.createdGame.questions
}

Data.prototype.getGameInfo=function(){
  console.log("Returning game"+this.createdGame.gameId)
  return this.createdGame
}

Data.prototype.joinGame=function(user){

  if(user.joinGameId===this.createdGame.gameId){
    this.createdGame.connectedUsers.push(user)
    console.log("User '"+user.username+"' connected")
  }else{
    console.log("Game ID not found!")
  }
}



Data.prototype.leftGame=function(user){
  for(let i=0;i<this.createdGame.connectedUsers.length;i++) {
    if (this.createdGame.connectedUsers[i].username === user) {
      this.createdGame.connectedUsers.splice(i,1)
      console.log("player" + this.createdGame.connectedUsers, "left!")
      console.log(this.createdGame.connectedUsers[i])
      return (this.createdGame.connectedUsers)
    }


  }
}

Data.prototype.getUsers=function(){
  return this.createdGame.connectedUsers;
}

Data.prototype.getTotalScore=function(d) {
  for(let i=0; i<this.createdGame.connectedUsers.length;i++) {
    console.log("name: "+this.createdGame.connectedUsers[i].username)
    if(this.createdGame.connectedUsers[i].username===d.theUser){
      this.createdGame.connectedUsers[i].endScore = d.theScore
      console.log("Score: "+this.createdGame.connectedUsers[i].endScore)
    }
  }
  return this.createdGame.connectedUsers
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



