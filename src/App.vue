<template>
  <div class="container">
    <intro />
    <game-window></game-window>
    <leaderboard></leaderboard>
  </div>
</template>

<script>
import GameWindow from './components/UI/GameWindow.vue'
import Leaderboard from './components/UI/Leaderboard.vue'
import Intro from './components/UI/Intro.vue'

export default {
  name: 'App',
  components: {
    GameWindow,
    Leaderboard,
    Intro,
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap');
#app {
  color:white;
}
* {
	/* border:1px solid yellow; */
  font-family: 'Josefin Sans', sans-serif;
}
html{
background-color: #000000;
background-image: linear-gradient(147deg, #020e1a 0%, #2c3e50 74%);
}
</style>
