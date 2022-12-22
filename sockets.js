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

  socket.on('getQuizzes', function(gameId) {
    socket.join(gameId)
    console.log("getting quizes")
    io.to(gameId).emit('returnQuizzes', data.getQuizzes())
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


  socket.on('createGame', function(d){
    console.log("game created")
    data.createGame(d)
  })

  socket.on('createCollabGame', function(d){
    data.createCollabGame(d)
  })

  socket.on('addCollabQuestion', function (d){
    socket.join(d.gameId)
    io.to(d.gameId).emit("collabQuestionAdded",data.addCollabQuestion(d.question))
  })

  socket.on('deleteCollabQuestion', function(d){
    socket.join(d.gameId)
    io.to(d.gameId).emit('collabQuestionDeleted', data.deleteCollabQuestion(d.index))
  })

  socket.on('getQuestions', function(gameId){
    socket.join(gameId)
    io.to(gameId).emit('returnQuestions', data.getQuestions())
  })

  socket.on('joinGame', function(d){
    socket.join(d.joinGameId)           //Join the room
    data.joinGame(d)
    io.to(d.joinGameId).emit('userJoined', data.getUsers())
  })

  socket.on('leaveGame', function(d){
    socket.join(d.gameId)
    io.to(d.gameId).emit('userLeft',data.leftGame(d.username))
  })

  socket.on('terminateGame', function (gameId){
    console.log("Terminating game: "+gameId)
    socket.join(gameId)
    data.terminateGame()
    io.to(gameId).emit('gameTerminated')
  })

  socket.on('getUsers', function(gameId){
    console.log("getting users")
    io.to(gameId).emit('returnUsers', data.getUsers())
    socket.emit('returnUsers', data.getUsers())
  })

  socket.on('totalScore', function(d){
    console.log(d.theUser + d.theScore)
    socket.join(d.theGameId)
    io.to(d.theGameId).emit('returnScore', data.getTotalScore(d))
  })

  socket.on('getScore', function(gameId){
    socket.join(gameId)
    io.to(gameId).emit('returnAllScores', data.getUsers())
  })


  socket.on('totalScore', function(d){
    console.log(d)
  })
}

module.exports = sockets;