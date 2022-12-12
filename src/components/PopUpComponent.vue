
<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal"
           role="dialog"

      >
        <header
            class="modal-header"
            id="modalTitle"
        >
          <slot name="header">
            {{uiLabels.chooseId}}
<!--           <button v-on:click="chosenId()"
                type="button"
                class="close"
                @click="$emit('close')"


            >
            confirm
            </button>-->
          </slot>
        </header>
        <section
            class="modal-body"
            id="modalDescription"
        >
          <slot name="body">
            <input type="text" v-model="chosenGameId" v-bind:placeholder="uiLabels.typeHere"
                   class="questionInput" minlength="3" maxlength="10" autofocus>


          </slot>

          <section>
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



<style>
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
  background: radial-gradient(circle, #EF233C 35%, #D80032 90%);
  width: 45%;
  height: 35%;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

.modal-header{
  padding: 1vw;
  display: flex;
  font-family: "Silkscreen", cursive;
}

.modal-header {
  border-bottom: 1px solid #eeeeee;
  font-size: 30px;
  color: #4AAE9B;
  justify-content: center;
}
.modal-body {
  position: relative;
  font-size: 30px;
  align-self: center;
  padding: 20px 10px;

}
.close {
  border: none;
  font-size: 3vw;
  margin-top:4vw;
  cursor: pointer;
  font-weight: bold;
  color: #4AAE9B;
  background: transparent;
}


.questionInput {
  font-family: "Press Start 2P", cursive;
  border: none;
  color: #FEF9CC;
  background: transparent;
  width: 60%;
  height: 7vh;
  font-size: 2vw;
  border-bottom-style: solid;
  border-bottom-color: #2B211B;
  text-align: center;

}

</style>