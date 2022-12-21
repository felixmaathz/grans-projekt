<template>
  <div class="questionComponentWrapper">

      <div class = "questionText">
      {{question.questionText}}
        </div>
      <div class = "answerButtonsWrapper">
      <button v-on:click="chooseAnswer(true)" class="answerButton true"
              :class="{selected: trueSelected, hide: falseSelected}" v-bind:disabled="isAnswered"> {{uiLabels.true}}</button>
      <button v-on:click="chooseAnswer(false)"  class="answerButton false"
              :class="{selected: falseSelected, hide: trueSelected}" v-bind:disabled="isAnswered"> {{uiLabels.false}}</button>
<!--      <div v-show="isAnswered===true" class="answerButton true fakeDivTrue"  :class="{selected: trueSelected}">-->
<!--        {{uiLabels.true}}-->
<!--      </div>-->
<!--        <div v-show="isAnswered===true" class="answerButton false fakeDivFalse"  :class="{selected: falseSelected}">-->
<!--          {{uiLabels.false}}-->
<!--        </div>-->
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

       questionColor: "#fef9cc",
       // falseFakeDivOpacity: 100,
       // trueFakeDivOpacity: 100,
     }
   },

  methods: {
    chooseAnswer: function(answer) {
      this.isAnswered = true;

      this.$emit('answer', answer)
      if(answer){
        this.trueSelected=true;
        this.falseSelected=false;
        // this.questionColor="#2a9108"
        // this.falseFakeDivOpacity=0

      }else {
        this.falseSelected=true;
        this.trueSelected=false;
        // this.questionColor="#bb0000"
        // this.trueFakeDivOpacity=0
      }



    },
  },
}

</script>


<style scoped>

.questionComponentWrapper{
  height: 85vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.answerButtonsWrapper{
  background-color: #291F1E;
  border-style: solid;
  border-color: #c2bd8e;
  border-width: 0.3vw;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20em;
  width: 80%;
  margin-top: 1em;
}

.answerButton.hide{
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s 1s, opacity 1s ease-out;
}

.answerButton{
  min-width: 40%;
  width: fit-content;
  height: 80%;
  margin: 2vw ;
  font-family: "Press Start 2P",cursive;
  color: #FEF9CC;
  /*-webkit-text-stroke: 1px black;*/
  cursor: pointer;
  font-size: 5em;
  /*border-radius: 4vw;*/
  border-color: #2B211B;
  border-width: 0.3vw;
  transition:opacity 3s;
}

.answerButton.true{
  background-color: #3dda09;
  text-shadow: 2px 2px #2fa409;
  box-shadow: inset -0.25em -0.25em #2a9108;

}

/*.answerButton.selected.fakeDivTrue{*/
/*  display: flex;*/
/*  justify-content: center;*/
/*  align-items: center;*/
/*  opacity: v-bind(trueFakeDivOpacity+"%");*/
/*}*/

/*.answerButton.selected.fakeDivFalse{*/
/*  display: flex;*/
/*  justify-content: center;*/
/*  align-items: center;*/
/*  opacity: v-bind(falseFakeDivOpacity+"%");*/

/*}*/


.answerButton.false{
  background-color: #ff0000;
  text-shadow: 2px 2px #bb0000;
  box-shadow: inset -0.25em -0.25em #bb0000;
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
  background-color: v-bind(questionColor);
  transition: background-color 1s;
  font-size: 3em;
  width: 80%;
  min-height: 4em;
  display: flex;
  justify-content:  center;
  align-items: center;
  border-style: solid;
  border-color: #2B211B;
  border-width: 0.3vw;
  margin-top:1em;
  text-shadow: 4px 4px #c2bd8e;
  color: #2B211B;
}
/* OPTIMIZATION FOR PHONE */
@media (max-width: 700px) {
  .questionComponentWrapper{
    height: 85vh;
    overflow: hidden;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .answerButtonsWrapper{
    background-color: #291F1E;
    border-style: solid;
    border-color: #c2bd8e;
    border-width: 0.3vw;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20em;
    width: 80%;
    margin-top: 1em;
  }

  .answerButton.hide{
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s 1s, opacity 1s ease-out;
  }

  .answerButton{
    min-width: 40%;
    width: fit-content;
    height: 80%;
    margin: 2vw ;
    font-family: "Press Start 2P",cursive;
    color: #FEF9CC;
    /*-webkit-text-stroke: 1px black;*/
    cursor: pointer;
    font-size: 6vw;
    /*border-radius: 4vw;*/
    border-color: #2B211B;
    border-width: 0.3vw;
    transition:opacity 3s;
  }

  .answerButton.true{
    background-color: #3dda09;
    text-shadow: 2px 2px #2fa409;
    box-shadow: inset -0.25em -0.25em #2a9108;

  }

  /*.answerButton.selected.fakeDivTrue{*/
  /*  display: flex;*/
  /*  justify-content: center;*/
  /*  align-items: center;*/
  /*  opacity: v-bind(trueFakeDivOpacity+"%");*/
  /*}*/

  /*.answerButton.selected.fakeDivFalse{*/
  /*  display: flex;*/
  /*  justify-content: center;*/
  /*  align-items: center;*/
  /*  opacity: v-bind(falseFakeDivOpacity+"%");*/

  /*}*/


  .answerButton.false{
    background-color: #ff0000;
    text-shadow: 2px 2px #bb0000;
    box-shadow: inset -0.25em -0.25em #bb0000;
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
    background-color: v-bind(questionColor);
    transition: background-color 1s;
    font-size: 3em;
    width: 80%;
    min-height: 4em;
    display: flex;
    justify-content:  center;
    align-items: center;
    border-style: solid;
    border-color: #2B211B;
    border-width: 0.3vw;
    margin-top:1em;
    text-shadow: 4px 4px #c2bd8e;
    color: #2B211B;
  }
}

</style>
