<template>
  <div>
    <div>
      <div class = "questionText">
      {{question.questionText}}
        </div>
      <div class = "answerButtonsWrapper">
      <button v-on:click="chooseAnswer(true)" v-show="isAnswered===false" class="answerButton true"
              :class="{selected: trueSelected}"> {{uiLabels.true}}</button>
      <button v-on:click="chooseAnswer(false)" v-show="isAnswered===false" class="answerButton false"
              :class="{selected: falseSelected}"> {{uiLabels.false}}</button>

      </div>
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
       trueSelected: false,
       falseSelected: false,
       isAnswered: false,
     }
   },

  methods: {
    chooseAnswer: function(answer) {
      this.isAnswered = true;
      this.$emit('answer', answer)
      if(answer){
        this.trueSelected=true
        this.falseSelected=false;
      }else {
        this.falseSelected = false
        this.trueSelected = false;
      }



    },
  },
}

</script>


<style scoped>
.answerButtonsWrapper{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40em;
  width: 100%;
  margin-top: 1em;
  margin-bottom: 1em;
}
.answerButton{
  width: 40%;
  margin: 1em;
  height: 60%;
  font-family: "Press Start 2P",cursive;
  color: #FEF9CC;
  /*-webkit-text-stroke: 1px black;*/
  cursor: pointer;
  font-size: 1vw;
  /*border-radius: 4vw;*/
  border-color: #2B211B;
  border-width: 0.3vw;
  transition:opacity 3s;
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

.questionText {
  font-size: 3em;
}

</style>
