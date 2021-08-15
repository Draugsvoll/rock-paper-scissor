<template>
  <div class="container">
    <home></home>
    <game-window></game-window>
    <leaderboard></leaderboard>
  </div>
</template>

<script>
import Home from './components/Home.vue'
import GameWindow from './components/UI/GameWindow.vue'
import Leaderboard from './components/UI/Leaderboard.vue'

export default {
  name: 'App',
  components: {
    Home,
    GameWindow,
    Leaderboard,
  },
  setup () {
  }
}
</script>

<style>
#app {
  color:white;
}
html{
  background:rgba(6, 6, 35, 0.687)

}
</style>
