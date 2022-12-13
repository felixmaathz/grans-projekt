function sockets(io, socket, data) {
  socket.emit('init', data.getUILabels());
  
  socket.on('pageLoaded', function (lang) {
    socket.emit('init', data.getUILabels(lang));
  });

  socket.on('switchLanguage', function(lang) {
    socket.emit('init', data.getUILabels(lang));
  });

  socket.on('gameSoonToStart', function(gameId) {
    console.log("inne i sockets")
    io.to(gameId).emit("gameWillStart");
  });

  socket.on('joinPoll', function(gameId){
    console.log("Client connected to "+gameId)
    socket.join(gameId)
  })



  socket.on('createPoll', function(d) {
    console.log(d)
    socket.emit('pollCreated', data.createPoll(d));
  });

  socket.on('getQuizzes', function() {
    console.log("getting quizes")
    socket.emit('returnQuizzes', data.getQuizzes())
  })
  socket.on('getSelectedQuiz', function(){
    console.log("mottagit quiz")
    socket.emit('returnSelectedQuiz', data.getSelectedQuiz())
  })

  socket.on('getGameInfo', function(){
    console.log("getting game")
    socket.emit('returnGameInfo', data.getGameInfo())
  })

  socket.on('removeQuiz', function(d){
    socket.emit('quizRemoved', data.removeQuiz(d))
  })

  socket.on('addQuestion', function(d) {
    socket.emit('dataUpdate', data.addQuestion(d.gameId,d.q));
  });

  socket.on('removeQuestion', function(d){
    socket.emit('questionRemoved', data.removeQuestion(d.gameId,d.index))
  })

  socket.on('editQuiz', function(d){
    socket.emit('quizEdit', data.editTheQuiz(d))
  })

  socket.on('getQuizForEdit', function(){
    socket.emit('returnQuizForEdit', data.getQuizForEdit())
  })

  socket.on('replaceQuiz', function(d){
    socket.emit('quizReplaced', data.replaceQuiz(d))
  })

  // socket.on('editQuestion', function(d) {
  //   data.editQuestion(d.pollId, d.index, {q: d.q, a: d.a});
  //   socket.emit('questionEdited', data.getAllQuestions(d.pollId));
  // });

  socket.on('createGame', function(d){
    console.log("game created")
    socket.emit('gameCreated', data.createGame(d))
  })

  socket.on('joinGame', function(d){
    socket.join(d.joinGameId)           //Join the room
    data.joinGame(d)
    io.to(d.joinGameId).emit('userJoined', data.getUsers())
  })

  socket.on('getUsers', function(){
    socket.emit('returnUsers', data.getUsers())
  })

  socket.on('totalScore', function(d){
    console.log(d.theUser + d.theScore)
    socket.join(d.theGameId)
    io.to(d.theGameId).emit('returnScore', data.getTotalScore(d))


  })

/*  socket.on('chooseGameId', function(chosenGameId) {
    socket.join(chosenGameId)
  })

  socket.on('chosenGameId', function(chosenGameId){
    socket.join(chosenGameId)
    io.to(chosenGameId).emit('theChosenGameId')

  })*/

  // socket.on('runQuestion', function(d) {
  //   io.to(d.pollId).emit('newQuestion', data.getQuestion(d.pollId, d.questionNumber));
  //   io.to(d.pollId).emit('dataUpdate', data.getAnswers(d.pollId));
  // });

  // socket.on('submitAnswer', function(d) {
  //   data.submitAnswer(d.pollId, d.answer);
  //   io.to(d.pollId).emit('dataUpdate', data.getAnswers(d.pollId));
  // });
  //
  // socket.on('resetAll', () => {
  //   data = new Data();
  //   data.initializeData();
  // })



 
}

module.exports = sockets;