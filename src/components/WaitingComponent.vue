<!-- CSS OK for laptop + phone -->
<template>
  <body>
  <div id="GameID">
    {{uiLabels.loadingGame}} {{pollId}}
  </div>

  <div id="theGameWillStartIn">
    {{uiLabels.timeLeft}}
  </div>

  <p id="timer" class="timer">
    5
  </p>




  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />


  </body>
</template>

<script>
import io from 'socket.io-client';
const socket = io();

export default {
  name: "WaitingComponent",

  data: function () {
    return {
      pollId: "",
      lang: "",
      uiLabels: {}
    }
  },
  created: function () {
    this.pollId = this.$route.params.id;
    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
    this.thePopUp();
  },
  methods: {

    thePopUp: function () {
      const self = this;
      // Set the date we're counting down to
      var countDownDate = new Date().getTime() + 5500; // 10 seconds

      // Update the count down every 1 second
      var x = setInterval(function () {

        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the countdown date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="timer"
        document.getElementById("timer").innerHTML = seconds;

        // Change the color of the timer based on the remaining time
        if (seconds > 4) {
          document.getElementById("timer").style.color = "green";
        } else if (seconds > 3) {
          document.getElementById("timer").style.color = "yellow";
        } else {
          document.getElementById("timer").style.color = "red";
        }

        // If the countdown is finished, write some text
        if (distance < 0) {
          clearInterval(x);
          document.getElementById("timer").innerHTML = "Let's go"
          self.closePopUp()
        }
      }, 1000);
    },

    closePopUp: function() {
      setTimeout(() => {this.$emit('close')}, 3000);
    }
  },
}

</script>

<style scoped>

body {
  background: #268b96;
  background: radial-gradient(circle, #8af0ff 25%, #00a9bb 60%);
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  font-family: "Silkscreen", cursive;
  overflow-y: hidden;
}
#GameID {
  font-family: Silkscreen;
  font-size: 3em;
  margin-top: 4vh;
  color: white;
}
#theGameWillStartIn {
  font-size: 2em;
  font-family: Silkscreen;
  margin-top: 2vh;
  color: white;
}
#timer {
  font-size: 8em;
  font-weight: bold;
  font-family: Silkscreen;
}
.timer {
  font-size: 7em;
  font-weight: bold;
  font-family: Silkscreen;
  color: green;
}
.backButtonDiv{
  width: 10vw;
  height: 10vh;
  margin-right: 10vw;
}
.backButton{
  font-family: "Press Start 2P",cursive;
  color: #FEF9CC;
  background-color: red;
  /*-webkit-text-stroke: 1px black;*/
  cursor: pointer;
  width: 10vw;
  height: 10vh;
  margin-left: 50em;
  font-size: 0.9vw;
  text-shadow: 2px 2px #850000;
  /*border-radius: 4vw;*/
  box-shadow: inset -0.35em -0.35em #850000;
  border-color: #2B211B;
  border-width: 0.4vw;
  border-style: solid ;
  /*transition-duration: 0.15s;*/
}
.backButton:hover{
  background-color: #cc0000;
  box-shadow: inset -0.25em -0.25em #850000;
  /*border-width: 0.3vw;*/
  color: #FEF9CC;
}
.material-symbols-outlined {
  font-size: 5em;
  font-variation-settings:
      'FILL' 0,
      'wght' 400,
      'GRAD' 0,
      'opsz' 48
}

.close {
  font-family: "Press Start 2P", cursive;
  border: none;
  font-size: 2vw;
  margin-top:4vw;
  cursor: pointer;
  font-weight: bold;
  color: #4AAE9B;
  background: transparent;
}
/* OPTIMIZATION FOR PHONE */
@media (max-width: 700px) {
  body {
    background: #268b96;
    background: radial-gradient(circle, #8af0ff 25%, #00a9bb 60%);
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    font-family: "Silkscreen", cursive;
    overflow-y: hidden;
  }
  #GameID {
    font-family: Silkscreen;
    font-size: 3em;
    margin-top: 4vh;
    color: white;
  }
  #theGameWillStartIn {
    font-size: 2em;
    font-family: Silkscreen;
    margin-top: 2vh;
    color: white;
  }
  #timer {
    font-size: 6em;
    font-weight: bold;
    font-family: Silkscreen;
  }
  .timer {
    font-size: 7em;
    font-weight: bold;
    font-family: Silkscreen;
    color: green;
  }
  .backButtonDiv{
    width: 10vw;
    height: 10vh;
    margin-right: 10vw;
  }
  .backButton{
    font-family: "Press Start 2P",cursive;
    color: #FEF9CC;
    background-color: red;
    /*-webkit-text-stroke: 1px black;*/
    cursor: pointer;
    width: 10vw;
    height: 10vh;
    margin-left: 50em;
    font-size: 0.9vw;
    text-shadow: 2px 2px #850000;
    /*border-radius: 4vw;*/
    box-shadow: inset -0.35em -0.35em #850000;
    border-color: #2B211B;
    border-width: 0.4vw;
    border-style: solid ;
    /*transition-duration: 0.15s;*/
  }
  .backButton:hover{
    background-color: #cc0000;
    box-shadow: inset -0.25em -0.25em #850000;
    /*border-width: 0.3vw;*/
    color: #FEF9CC;
  }
  .material-symbols-outlined {
    font-size: 5em;
    font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 48
  }

  .close {
    font-family: "Press Start 2P", cursive;
    border: none;
    font-size: 2vw;
    margin-top:4vw;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }
}
</style>