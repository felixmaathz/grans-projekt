function sockets(io, socket, data) {
  socket.emit('init', data.getUILabels());
  
  socket.on('pageLoaded', function (lang) {
    socket.emit('init', data.getUILabels(lang));
  });

  socket.on('switchLanguage', function(lang) {
    socket.emit('init', data.getUILabels(lang));
  });



  socket.on('createPoll', function(d) {
    console.log(d)
    socket.emit('pollCreated', data.createPoll(d));
  });

  socket.on('getQuizzes', function() {
    socket.emit('returnQuizzes', data.getQuizzes());
  })

  socket.on('removeQuiz',function(d){
    socket.emit("quizRemoved",data.removeQuiz(d))
  
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
    console.log("fyfan asså"+d)
  })

  socket.on('getQuizForEdit', function(){
    socket.emit('returnQuizForEdit', data.getQuizForEdit())
  })

  socket.on('replaceQuiz', function(d){
    socket.emit('quizReplaced', data.replaceQuiz(d))
  })

  socket.on('editQuestion', function(d) {
    data.editQuestion(d.pollId, d.index, {q: d.q, a: d.a});
    socket.emit('questionEdited', data.getAllQuestions(d.pollId));
  });

  socket.on('joinPoll', function(pollId) {
    socket.join(pollId);
    socket.emit('newQuestion', data.getQuestion(pollId))
    socket.emit('dataUpdate', data.getAnswers(pollId));
  });


  socket.on('runQuestion', function(d) {
    io.to(d.pollId).emit('newQuestion', data.getQuestion(d.pollId, d.questionNumber));
    io.to(d.pollId).emit('dataUpdate', data.getAnswers(d.pollId));
  });

  socket.on('submitAnswer', function(d) {
    data.submitAnswer(d.pollId, d.answer);
    io.to(d.pollId).emit('dataUpdate', data.getAnswers(d.pollId));
  });

  socket.on('resetAll', () => {
    data = new Data();
    data.initializeData();
  })



 
}

module.exports = sockets;