<template>
  <body>
<div>
hej
  //{{user.nick}}

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
  name: "LobbyView",
  props: {
    user: Object
  },

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
    this.id = this.$route.params.id;
    this.nick= this.$route.params.nick;
  },
}
</script>

<style scoped>

</style>