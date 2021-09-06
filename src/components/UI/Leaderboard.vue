<template>
	<div class="container">

		<h2>Leaderboard <span>Firebase</span></h2> 
			<!-- {{ this.$store.state.database }} -->
		<div class="tags">
			<div class="tag player"></div>
			<div class="tag">Winrate</div>
			<div class="tag">Wins</div>
			<div class="tag">Loss</div>
			<div class="tag">Tie</div>
			<div class="tag">Rounds</div>
		</div>
		<br>
		<div class="players"  v-for="(player, index) in $store.state.database" :key="index">
			<div class="tag player"> {{ player.name }} </div>
			<div class="tag"> {{ (player.wins/player.roundsPlayed*100).toFixed(1) }}% </div>
			<div class="tag"> {{ player.wins }} </div>
			<div class="tag"> {{ player.loss }} </div>
			<div class="tag"> {{ player.tie }} </div>
			<div class="tag"> {{ player.roundsPlayed }} </div>
		</div>

	</div>
</template>


<script>
// import firebase from 'firebase'
import { onMounted } from '@vue/runtime-core'
import { useStore } from 'vuex'
// import { DB } from 'main.js'

export default {
	setup () {
		const store = useStore()
		let database = 'not fetched yet'
		onMounted( () =>  {
			store.dispatch('getDatabase')
		})
		return { database }
	},
}
</script>


<style scoped>
	.container {
		background:rgba(41, 62, 68, 0.97);
		margin:75px auto;
		/* height:600px; */
		max-width:800px;
		padding:24px;
		border: 2px solid #748fb8;
		border-radius:10px;
	}
	.tag {
		min-width:100px;
		margin:15px auto;
	}
	.tags {
		display:flex;
	}
	.players {
		display: flex;
	}
	.player {
		width:130px;
		font-size: 17px;
	}
	h2 {
		text-align: center;
	}
	span {
		font-size: 13px;
		color: #6c7777;
	}
</style>