<template>
	<div class="containerr">

		<!-- Display Action -->
		<div class="current-action" v-bind:class="{ hide: player.currentAction==='neutral' }">
			{{ player.currentAction }}
		</div>
		
		<!-- IMAGE -->
		<div class="rock" v-if=" player.currentAction == 'neutral'">
			<i class="fas fa-fist-raised fa-2x"></i>
		</div>
		<div class="paper" v-if=" player.currentAction == 'paper'">
			<i ref="paper" class="fas fa-hand-paper fa-2x"></i>
		</div>
		<div class="neutral" v-if=" player.currentAction == 'rock'">
			<i class="fas fa-hand-rock fa-2x"></i>
		</div>
		<div class="scissor" v-if=" player.currentAction == 'scissor'">
			<i class="fas fa-hand-peace fa-2x"></i>
		</div>

		<!-- BUTTONS -->
		<div  class="buttons ">
			<button @click="playHand('rock')">Rock</button>
			<button @click="playHand('paper')">Paper</button>
			<button @click="playHand('scissor')">Scissor</button>
		</div>

	</div>
</template>


<script>
// import { useStore } from 'vuex'

export default {
	data () {
		return {
			actions: ['rock', 'paper', 'scissor'],
		}
	},
	props: ['player'],
	methods: {
		determineWinner (heroAction, villainAction) {
			var winner;
			// TIE GAME
			if (heroAction == villainAction) {
				winner = 'tie'
			} else {

				// USED ROCK
				if (heroAction == 'rock') {
					if (villainAction == 'scissor') {
						winner = 'hero'
					} else {
						winner = 'villain'
					}
				}

				// USED PAPER
				if (heroAction == 'paper') {
					if (villainAction == 'rock') {
						winner = 'hero'
					} else {
						winner = 'villain'
					}
				}

				// USED SCISSOR
				if (heroAction == 'scissor') {
					if (villainAction == 'paper') {
						winner = 'hero'
					} else {
						winner = 'villain'
					}
				}
			}
			this.updateScore(winner)
		},
		// Randomize villain action
		random () {
			return Math.floor(Math.random() * 3);
		},
		playHand (heroAction) {
			// delay for animation purposes
			this.$store.commit('resetWinnerText')
			const ref = this
			

			setTimeout(function(){
				var villainAction = ref.actions[ref.random()]
				ref.$emit('actions_used', {heroAction: heroAction, villainAction: villainAction})
				ref.determineWinner(heroAction, villainAction)
			}, 500)
		},
		updateScore (winner) {
			// check for winner of round (round finished)
			const heroScore = this.$store.state.heroScore			
			const villainScore = this.$store.state.villainScore	
			const tieScore = this.$store.state.tieScore	
			var roundFinished = false
			
			if ( heroScore === 2) {
				// hero won round
				roundFinished = true
				this.$store.commit('heroWonRound')
			}
			if ( villainScore === 2 ) {
				// villain won round
				roundFinished = true
				this.$store.commit('villainWonRound')
			}
			if ( tieScore === 3 ) {
				// tie-game
				roundFinished = true
				this.$store.commit('tieRound')
			}


			if ( !roundFinished ) {
				if (winner == 'tie') {
					this.$store.commit('tieGame')
				} else if (winner == 'hero') {
					this.$store.commit('heroWon')
				} else {
					this.$store.commit('villainWon')
				}
			}
		}
	},
}
</script>


<style css scoped>
	i {
		
	}
	.paper, .rock, .scissor, .neutral {
		font-size:100px;
	}
	.hide {
		color:rgba(255, 255, 255, 0);
	}
	.active {
		display:none;
	}
	.containerr {
		background:rgba(255, 0, 0, 0.5);
		width:300px;
		height:300px;
		margin:10px;
		display:flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}
	.img-container {
		border:1px solid pink;
		width:300px;
		height:300px;
	}
	img {
		object-fit: cover;
		width:75px;
		height:75px;
	}
	.left {
		/* background-image: url('../.././assets/lefthand.png'); */
		background-image: url('../.././assets/logo.png');
		object-fit: cover;
		height:100px;
		width:100px;
	}
	.right {
		background-image: url('../.././assets/righthand.png');
		object-fit: cover;
		height:100px;
		width:100px;
	}
</style>