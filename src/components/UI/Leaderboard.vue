<template>
	<div class="container">
		Leaderboard
		<div class="players" v-for="(player, index) in $store.state.database" :key="index">
			{{ player.name }}
			{{ player.wins }}
			{{ player.loss }}
		</div>
	</div>
</template>


<script>
import firebase from 'firebase'
// import { DB } from 'main.js'

export default {
	data: function () {
		return {
			database: 'aff'
		}
	},
	mounted () {
		var database = []
		// var player = {name: 'rhamana2', wins: 17, loss: 5, tie: 3}
		// firebase.firestore().collection('players').doc().set(player)
		setTimeout( () => {
			firebase.firestore().collection('players').get().then( (data) => {
			data.forEach( player => {
				console.log(player.data())
				database.push(player.data())
			})
			this.$store.commit('setDatabase', database)
			// this.database = database
		})
		}, 2000)



	}
}
</script>


<style scoped>
	.container {
		background:rgba(0, 255, 187, 0.333);
		margin:100px auto;
		height:600px;
		width:1100px;
	}
</style>