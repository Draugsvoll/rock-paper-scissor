<template>
	<div class="container">

		<h2>Leaderboard</h2>
		<div class="tags">
			<div class="tag player">Player</div>
			<div class="tag">Wins</div>
			<div class="tag">Loss</div>
			<div class="tag">Tie</div>
		</div>
		<div class="players" v-for="(player, index) in $store.state.database" :key="index">
			<div class="tag player">  {{ index+1}}. {{ player.name }} </div>
			<div class="tag"> {{ player.wins }} </div>
			<div class="tag"> {{ player.loss }} </div>
			<div class="tag"> {{ player.tie }} </div>
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
		background:rgba(5, 68, 87, 0.973);
		margin:75px auto;
		/* height:600px; */
		max-width:800px;
		padding:5px;

	}
	.tag {
		min-width:100px;
	}
	.tags {
		display:flex;
	}
	.players {
		display: flex;
	}
	.player {
		width:200px;
	}
	h2 {
		text-align: center;
	}
</style>