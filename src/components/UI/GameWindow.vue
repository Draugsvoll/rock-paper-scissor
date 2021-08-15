<template>
	<div class="container">

		<!-- SCOREBAORD -->
		<div class="scorewindow">
			<div class="round">Round</div>
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

		
	</div>
</template>


<script>
import Player from './Player.vue'

import { useStore } from 'vuex'

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
		actionsUsed (actions) {
			// reset winner text
			// this.winnerLastHand = '.'
			// show 'neutral' hand image
			this.hero.currentAction = 'neutral'
			this.villain.currentAction = 'neutral'

			this.hero.currentAction = actions.heroAction
			this.villain.currentAction = actions.villainAction
		},
	},
	components: {
		Player
	},
}
</script>


<style css scoped>
	.container {
		background:rgba(255, 255, 0, 0.333);
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
		justify-content: space-between;
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
		font-size: 35px;
	}
	.current-round {
		display:flex;
		flex-direction: column;
		justify-content: center;
		width:200px;
	}
	.winner-text {
		margin-top:45px;
		text-align: center;
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
	}
	.tie {
		visibility: hidden;
	}
	.round {
		margin:auto auto;
		font-size:28px;
	}
</style>