<template>
  <body>
  <div>
    PRESENTERA RESULTATET FÖR SPELET
    {{question}}
  </div>
  <BarsComponent v-bind:data="data"/>
  <footer>
    <div style="margin: 2em">
      <button style="position:absolute; bottom:100px;" v-on:click="this.$router.go(-1)">{{uiLabels.goBack}}</button>
    </div>
  </footer>
  </body>
</template>

<script>
// @ is an alias to /src
import BarsComponent from '@/components/BarsComponent.vue';
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'ResultView',
  components: {
    BarsComponent
  },
  data: function () {
    return {
      question: "",
      data: {},
      uiLabels: {},
      lang: "",

    }
  },
  created: function () {
    this.pollId = this.$route.params.id
    socket.emit('joinPoll', this.pollId)
    socket.on("dataUpdate", (update) => {
      this.data = update.a;
      this.question = update.q;
    });
    socket.on("newQuestion", update => {
      this.question = update.q;
      this.data = {};
    });
    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
  },
}
</script>
