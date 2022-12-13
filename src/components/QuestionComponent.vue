<template>
  <div>
    <div>
      {{question.questionText}}
      <button v-on:click="chooseAnswer(true)"> {{uiLabels.true}}</button>
      <button v-on:click="chooseAnswer(false)"> {{uiLabels.false}}</button>
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
   },

   data: function() {
     return {
       uiLabels: {},
       lang: "",
     }
   },

  methods: {
    /*answer: function (answer) {
      this.$emit("answer", answer);
    },*/
    chooseAnswer: function(answer) {
      this.$emit("answer", answer)
    },
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
