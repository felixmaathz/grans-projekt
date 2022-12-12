<template>
  <div>
    <div>
      <p> fråga 1</p>
      {{question.questionText}}
    </div>
  </div>
</template>
<script>
import io from 'socket.io-client';
const socket = io();

 export default {
  name: 'QuestionComponent',
  props: {
    question: Object
  },
   created: function(){

     this.lang = this.$route.params.lang;
     socket.emit("pageLoaded", this.lang);
     socket.on("init", (labels) => {
       this.uiLabels = labels

     })
     socket.emit('getSelectedQuiz');
     console.log("niklas har gjort rätt")
     socket.on('returnSelectedQuiz', (quizList) => {
       this.selectedQuiz = quizList
       console.log(this.selectedQuiz)
       console.log("det har kommit fram")
     })
   },
   data: function() {
     return {
       uiLabels: {},
       lang: "",
     }
   },

  methods: {
    answer: function (answer) {
      this.$emit("answer", answer);
    }
  }
}
</script>

<!--
<template>
<p>{{question.q}}</p>
<button v-for="a in question.a" v-on:click="answer(a)" v-bind:key="a">
  {{ a }}
</button>
</template>
<script>
export default {
  name: 'QuestionComponent',
  props: {
    question: Object
  },
  emits: ["answer"],
  methods: {
    answer: function (answer) {
      this.$emit("answer", answer);
    }
  }
}
</script>-->
