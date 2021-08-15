import { createStore } from 'vuex'

const store = createStore({
    state:{
        // individual hands
        villainScore: 0,
        heroScore: 0,
        tieScore: 0,
        handsPlayed: 0,
        winnerText: '.',

        // rounds won
        heroRoundScore: 0,
        villainRoundScore: 0,
        roundsPlayed: 0,

    },
    getters:{},
    mutations:{
        // individual hands
        heroWon(state) {
            state.heroScore++
            state.handsPlayed++
            state.winnerText = 'You won 1111'
        },
        villainWon(state) {
            state.villainScore++
            state.handsPlayed++
            state.winnerText = 'You lost 2222'
        },
        tieGame(state) {
            state.tieScore++
            state.handsPlayed++
            state.winnerText = 'Tie 3333'
        },
        resetWinnerText(state) {
            state.winnerText = '.'
        },

        // Rounds
        heroWonRound(state) {
            console.log('inside store')
            state.heroScore = 0
            state.villainScore = 0
            state.heroRoundScore++
            state.winnerText = 'Hero won this round'
        },
        villainWonRound(state) {
            state.villainRoundScore++
            state.winnerText = 'Villain won this round'
        },
        tieRound(state) {
            state.winnerText = 'Tie-game this round'
        },
    },
    actions:{},
})

export default store