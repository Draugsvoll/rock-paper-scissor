<template>
	<div class="container">

		<!-- SCOREBAORD -->
		<div class="scorewindow">
			<div class="round">Round {{ $store.state.roundsPlayed+1 }} </div>
			<div class="score">
				<div class="villain-win">
					<div class="">Villain</div>
					<div class="villain-score">{{ $store.state.villainRoundScore }}</div>
				</div>
				<div class="tie">
					<div class="">Tie</div>
					<div class="tie-score">{{ $store.state.tieScore }}</div>
				</div>
				<div class="hero-win">
					<div class="">You</div>
					<div class="hero-score">{{ $store.state.heroRoundScore }}</div>
				</div>
			</div>
		</div>

		<!-- PLAYERS CONTAINER -->
		<div class="playerContainer">
			<player :player="villain"></player>
			<!-- CURRENT ROUND-SCORE -->
			<div class="current-round">
				<div class="this-round-score">
					<div class="villain-this-round"> {{ $store.state.villainScore }} </div>
					<div > - </div>
					<div class="villain-this-round">{{ $store.state.heroScore }}</div>
				</div>
				<div class="winner-text" v-bind:class="{ hide: $store.state.winnerText=='.' }">{{ $store.state.winnerText }}</div>
			</div>
			<player :player="hero" v-on:actions_used="actionsUsed($event)"></player>
		</div>

		<!-- POST HIGH-SCORE TO LEADERBOARD -->
		<button @click="postScore()">Submit Score</button>
		<p class="info">Requires at least 3 rounds</p>
		
	</div>
</template>


<script>
import Player from './Player.vue'

import { useStore } from 'vuex'
import firebase from 'firebase'

export default {
	data () {
		return {
			// send props to Player classes
			hero: {name: 'Hero', hand: 'right', currentAction: 'neutral'},
			villain: {name: 'Villain', hand: 'left', currentAction: 'neutral'},

			// data for scoreboard indirectly updateed from store . Cant use state.store directly in elements,
			// because we want adelay (animation)
			heroRoundScore: 0,
			villainRoundScore: 0,
			villainScore: 0,
			heroScore: 0,
		}
	},
	mounted () {
		const store = useStore()
		this.hero.name = store.state.heroCurrentAction
	},
	methods: {
		// update graphics after actions chosen
		actionsUsed (actions) {
			this.hero.currentAction = 'neutral'
			this.villain.currentAction = 'neutral'

			this.hero.currentAction = actions.heroAction
			this.villain.currentAction = actions.villainAction
		},
		postScore() {
			firebase.database().ref('/').push({
				scoredata: { roundsPlayed: 10,  wins: 7, loss: 2, tie: 1, name: 'mitt navn'},
			});
			// const dbRef = firebase.database().ref();
		}
	},
	components: {
		Player
	},
}
</script>


<style css scoped>
	.container {
		margin:auto auto;
		width:900px;
		display:flex;
		flex-direction: column;
	}
	.hide {
		color:rgba(255, 255, 255, 0);
	}
	.playerContainer {
		display: flex;
		justify-content: space-around;
	}
	.playerContainer > div {
		width:204px;
	}
	.scorewindow {
		display:flex;
		flex-direction: column;
		width:100%;
	}
	.score {
		display: flex;
		width:100%;
		justify-content: space-around;
		font-size: 28px;
		text-align: center;
	}
	.score > div {
		width:204px;
		margin: 30px 0 20px 0;
	}
	.current-round {
		display:flex;
		flex-direction: column;
		justify-content: center;
		width:200px;
	}
	.winner-text {
		margin-top:75px;
		text-align: center;
		font-size: 19px;
	}
	.this-round-score {
		display: flex;
		justify-content: center;
	}
	.this-round-score > div {
		width:50px;
		text-align: center;
		font-size: 35px;
	}
	.villain-score, .tie-score, .hero-score {
		text-align: center;
		margin-top: 10px;
	}
	.hero-score {
		color: #15b615;
	}
	.villain-score {
		color:red;
	}
	.tie {
		visibility: hidden;
	}
	.round {
		margin:auto auto;
		font-size:28px;
		text-decoration: underline;
	}
	button {
		border-radius: 6px;
		padding:10px;
		max-width:120px;
		margin:auto auto;
		margin-top:75px;
		background:rgb(198, 205, 226);
	}
	button:hover {
		cursor: pointer;
		background:rgb(255, 255, 255);
	}
	.info {
		margin:10px auto;
		font-size: 12px;
		color:rgb(216, 216, 216);
	}
</style>