<template>
  <div id="app">
      <div id="inner">
        <div class="blyat-chat flex flex-center">
          <h1 v-if="!playing" @click="togglePlayback"><md-icon class="speaker cursor-pointer">volume_off</md-icon></h1>
          <h1 v-if="playing" @click="togglePlayback"><md-icon class="speaker cursor-pointer">volume_up</md-icon></h1>
          <router-link :to="{ name: 'login' }">
            <img src="./assets/img/blyat.png"/>
          </router-link>
          <router-link class="flex flex-center" :to="{ name: 'login' }">
            <h1 class="text-center" style="color: #ff2c29">BLYATCOIN</h1>
          </router-link>
        </div>
        <div class="pb-3 mx-auto flex justify-content-center">
          <img class="doors" src="./assets/img/hammer-left.png"/>
          <transition name="door" mode="out-in">
            <router-view/>
          </transition>
          <img class="doors" src="./assets/img/hammer-right.png"/>
        </div>
      </div>
      <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>
import {Howl, Howler} from 'howler'


export default {
  name: 'App',
  data () {
    return {
      player: null,
      playing: false
    }
  },
  methods: {
    togglePlayback() {
      if (this.playing) {
        this.player.pause()
        this.playing = false
      }
      else {
        this.player.play()
        this.playing = true
      }
    },
    initPlayer() {
      this.player = new Howl({
        src: ['../static/mp3/hymne-russia.mp3'],
        autoplay: true,
        loop: true,
        volume: 0.5
      });
    }
  },
  beforeMount() {
    this.initPlayer()
    this.playing = true
  }
  // created () {
  //   //  hook the progress bar to start before we move router-view
  //   this.$router.beforeEach((to, from, next) => {
  //     //  start the progress bar
  //     this.$Progress.start()
  //     //  continue to next page
  //     next()
  //   })
  //   //  hook the progress bar to finish after we've finished moving router-view
  //   this.$router.afterEach((to, from) => {
  //     //  finish the progress bar
  //     this.$Progress.finish()
  //   })
  // }
}
</script>

<!-- 
Ici on defini un component global qui contiendra nos vues
qui viennent du router (voir /router/index.js), qui seront liées
à d'autres components (voir components login/profile/register)

 -->