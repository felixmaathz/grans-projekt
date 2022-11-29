<template>
  <body>

  <div>

    <router-link v-bind:to="'/choosegamemode/'+lang"><button>{{uiLabels.hostAGame}}</button></router-link>
    <br>
    <router-link v-bind:to="'/clientjoingame/'+lang"><button>{{uiLabels.joinAGame}}</button></router-link>
  </div>

  <footer>
    <div style="margin: 2em">
      <button style="position:absolute; bottom:100px;" v-on:click="this.$router.go(-1)">{{uiLabels.goBack}}</button>
    </div>
  </footer>

  </body>
</template>

<script>

import io from 'socket.io-client';
const socket = io();

export default {
  name: "HostOrJoinView",

  data: function () {
    return {
      uiLabels: {},
      lang: "",
    }
  },
  created: function () {
     this.lang = this.$route.params.lang;
     socket.emit("pageLoaded", this.lang);
     socket.on("init", (labels) => {
       this.uiLabels = labels

     })
  },
}
</script>

<style scoped>

body {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: rgb(253,52,76);
  background: radial-gradient(circle, rgba(253,52,76,1) 35%, rgba(182,49,65,1) 90%);

}

</style>