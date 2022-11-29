<template>
  <body>

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
  name: "JoinView",

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

</style>