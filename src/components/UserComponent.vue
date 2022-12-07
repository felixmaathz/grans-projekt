<template>
  <div>
    {{user.username}}<br>
    {{user.joinGameId}}
  </div>
</template>

<script>
import io from 'socket.io-client';
const socket = io();

export default {
  name: "UserComponent",
  props: {
    user: Object
  },
  data: function(){
  return{
    numberOfQuestions: 0,
    uiLabels: {},
    lang: "",
  }
},
  created: function(){
    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels

    })
  }
}
</script>

<style scoped>

</style>