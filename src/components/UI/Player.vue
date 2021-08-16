<template>
	<div class="containerr">


		
		<!-- IMAGE -->
		<div class="rock" v-if=" $store.state.displayNeutralHand">
			<i class="fas fa-fist-raised fa-2x"></i>
		</div>
		<div class="paper" v-if=" player.currentAction == 'paper' && !$store.state.displayNeutralHand">
			<i ref="paper" class="fas fa-hand-paper fa-2x"></i>
		</div>
		<div class="neutral" v-if=" player.currentAction == 'rock' && !$store.state.displayNeutralHand">
			<i class="fas fa-hand-rock fa-2x"></i>
		</div>
		<div class="scissor" v-if=" player.currentAction == 'scissor' && !$store.state.displayNeutralHand">
			<i class="fas fa-hand-peace fa-2x"></i>
		</div>

				<!-- Display Action -->
		<div class="current-action" v-bind:class="{ hide: player.currentAction==='neutral' }">
			{{ player.currentAction }}
		</div>

		<!-- BUTTONS -->
		<div  class="buttons" v-bind:class="{ hide: player.name==='Villain' }">
			<button @click="playHand('rock')"><i class="fas fa-hand-rock fa-2x"></i></button>
			<button @click="playHand('paper')"><i ref="paper" class="fas fa-hand-paper fa-2x"></i></button>
			<button @click="playHand('scissor')"><i class="fas fa-hand-peace fa-2x"></i></button>
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
			this.$store.commit('resetWinnerText') // remove last hands winner announced
			this.$store.commit('displayNeutralHand', true)
			// reset score for current round
			if ( this.$store.state.endOfRound ) {
				this.$store.commit('resetScore')
				this.$store.commit('isNewRound')
			}

			// delay for animation purposes
			const ref = this
			setTimeout(function(){
				var villainAction = ref.actions[ref.random()]
				ref.$emit('actions_used', {heroAction: heroAction, villainAction: villainAction})
				ref.determineWinner(heroAction, villainAction)
			}, 500)
		},
		updateScore (winner) {
			// individual hands
			if (winner == 'tie') {
				this.$store.commit('tieGame')
			} else if (winner == 'hero') {
				this.$store.commit('heroWon')
			} else {
				this.$store.commit('villainWon')
			}
	
			// check if round is finished & determine winner	
			const handCounter = this.$store.state.handCounter
			const heroScore = this.$store.state.heroScore			
			const villainScore = this.$store.state.villainScore
			if ( ( (handCounter) % 3) === 0) {
				this.$store.commit('endOfRound')
				if (heroScore === villainScore) {
					// tie-game
					this.$store.commit('tieRound')
				} else if ( heroScore > villainScore ) {
					// hero won round
					this.$store.commit('heroWonRound')
				} else {
					// villain won round
					this.$store.commit('villainWonRound')
				}
			} 

			this.$store.commit('displayNeutralHand', false)
		}
	},
}
</script>


<style css scoped>

	.paper, .rock, .scissor, .neutral {
		font-size:100px;
		text-align: center;
	}
	.current-action {
		text-align: center;
	}
	.hide {
		color:rgba(255, 255, 255, 0);
		visibility: hidden;
	}
	.active {
		display:none;
	}
	.containerr > div {
		margin:18px 0;
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
	.buttons {
		display:flex;
		justify-content: space-around;
	}
	button {
		/* margin:40px 20px 0 0px; */
		background:rgba(255, 255, 255, 0);
		border:none;
		border-radius: 100%;
		/* outline:none; */
		color: #15a915;
		font-size:18px;
	}
	button:hover {
		cursor: pointer;
		border:none;
		/* outline:none; */
		color: #4be04b;

	}
</style>