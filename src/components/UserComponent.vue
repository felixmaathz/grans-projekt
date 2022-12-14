<template>
  <div :style="{ backgroundColor: randomColor, color: textColor}" class="userWrapper">
    <div class="username">
      <span v-if="user.host===true">{{uiLabels.theHost}}</span>
      {{user.username}}
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';

const socket = io();

export default {
  name: "UserComponent",
  props: {
    user: Object,
  },
  data: function () {
    return {
      numberOfQuestions: 0,
      uiLabels: {},
      lang: "",
      randomColor: "#ffffff",
      textColor: "#000000"
    }
  },
  created: function () {
    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })

  this.randomColor=this.pickColor()
  this.textColor=this.pickTextColor(this.randomColor)

  },
  methods:{

    pickColor: function(){
      let colors = ["#A40E4C","#2C2C54","#ACC3A6","#8ef635","#F49D6E",
        "#F96900","#0047ff","#0496FF","#FFA630","#6699CC"]
      let colorIndex = Math.floor(Math.random() * (colors.length));


      return colors[colorIndex]
    },
    pickTextColor: function(color){
      // Variables for red, green, blue values
      var r, g, b, hsp;

      // Check the format of the color, HEX or RGB?
      if (color.match(/^rgb/)) {

        // If RGB --> store the red, green, blue values in separate variables
        color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

        r = color[1];
        g = color[2];
        b = color[3];
      }
      else {

        // If hex --> Convert it to RGB: http://gist.github.com/983661
        color = +("0x" + color.slice(1).replace(
            color.length < 5 && /./g, '$&$&'));

        r = color >> 16;
        g = color >> 8 & 255;
        b = color & 255;
      }

      // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
      hsp = Math.sqrt(
          0.299 * (r * r) +
          0.587 * (g * g) +
          0.114 * (b * b)
      );

      // Using the HSP value, determine whether the color is light or dark
      if (hsp>127.5) {

        return '#000000';
      }
      else {

        return '#ffffff';
      }
    }
  }
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Silkscreen:wght@400;700&family=VT323&display=swap');
/**{*/
/*  outline: solid 1px greenyellow;*/
/*}*/
.userWrapper{
  display: flex;
  justify-content: center;
  align-items: baseline;
  flex-wrap: wrap;
  overflow: hidden;
  width: 15vw;
  height: 5vw;
  margin: 1vw;
  font-family: 'VT323', monospace;
  border-style: solid;
  border-color: #2B211B;
  border-width: 0.3vw;


}

.username{
  width: 100%;
  font-size: 3em;
  word-wrap: break-word;
  margin: auto;
}


</style>