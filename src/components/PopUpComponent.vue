<!-- CSS OK for laptop + phone-->
<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal"
           role="dialog">
        <header class="modal-header"
                id="modalTitle">
          <slot name="header">
            {{uiLabels.chooseId}}
          </slot>
        </header>
        <section
            class="modal-body"
            id="modalDescription">
          <slot name="body">
            <input type="text" v-model="chosenGameId" v-bind:placeholder="uiLabels.typeHere"
                   class="questionInput" minlength="3" maxlength="15" autofocus>
          </slot>
          <section class="confirmButton">
            <slot>
              <button v-on:click="chosenId()"
                      type="button"
                      class="close"
                      @click="$emit('close')">

                      {{uiLabels.confirm}}
              </button>
            </slot>
          </section>

        </section>
      </div>
    </div>
  </transition>
</template>

<script>
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'PopUpComponent',

  data: function () {
    return {
      chosenGameId: "",
      uiLabels: {},
      lang: ""
    }
  },
  created: function () {

    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
  },
  methods: {
    chosenId: function(){
      this.$emit('chosenGameId', this.chosenGameId);
    }
  }
};
</script>

<style scoped>

.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);
}
.modal {
  background: #EF233C;
  background: radial-gradient(circle, #EF233C 50%, #D80032 100%);
  width: 50%;
  height: 50%;
  min-height:45%;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
}


.modal-header{
  padding: 0.8vw;
  display: flex;
  font-family: "Silkscreen", cursive;
  color: #00C3BA;
  font-size: 4vw;
  margin-bottom: 1vw;
  /*-webkit-text-stroke: 0.01vw black;*/
  text-shadow: 4px 2px black;
}
.modal-header {
  border-bottom: 0.07em solid #4AAE9B;
  font-size: 3vw;
  color: #4AAE9B;
  justify-content: center;
}
.modal-body {
  position: relative;
  font-size: 0.5em;
  align-self: center;
  padding: 20px 10px;
  margin-top: 1em;
}

.close {
  font-family: "Press Start 2P", cursive;
  color: #FEF9CC;
  background-color: #00C3BA;
  /*-webkit-text-stroke: 1px black;*/
  cursor: pointer;
  min-width: 20vw;
  width: fit-content;
  height: 10vh;
  margin: 40px;
  font-size: 3vw;
  text-shadow: 2px 2px #1F6E77;
  /*border-radius: 4vw;*/
  box-shadow: inset -0.15em -0.15em #268b96;
  border-color: #2B211B;
  border-width: 0.4vw;
  border-style: solid;
  /*transition-duration: 0.15s;*/


}

.questionInput {
  margin-top: 1vh;
  font-family: Silkscreen;
  color: black;
  border: none;
  background: transparent;
  width: 60%;
  height: 7vh;
  font-size: 2vw;
  border-bottom-style: dotted;
  border-bottom-color: #4AAE9B;
  text-align: center;
}

/* OPTIMIZATION FOR PHONE */
@media (max-width: 700px) {
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(5px);
  }
  .modal {
    background: #EF233C;
    background: radial-gradient(circle, #EF233C 50%, #D80032 100%);
    width: 90%;
    height: 55%;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }
  .modal-header{
    padding: 1vw;
    display: flex;
    font-family: "Silkscreen", cursive;
    font-size: 8vw;
    color: #00C3BA;
    justify-content: center;
  }
  .modal-body {
    position: relative;
    font-size: 10em;
    align-self: center;
    margin-top: -10vw;
  }
  .close {
    font-size: 10vw;
    cursor: pointer;
    background: #00C3BA;;
    font-family: Silkscreen;
    border-color: #2B211B;
    border-width: 1vw;
  }
  .questionInput {
    font-family: Silkscreen;
    color: black;
    border: none;
    background: transparent;
    width: 80%;
    height: 6vh;
    font-size: 8vw;
    border-bottom-style: dotted;
    border-bottom-color: #4AAE9B;
    text-align: center;
  }
}
</style>