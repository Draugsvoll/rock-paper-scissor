import { createStore } from 'vuex'

const store = createStore({
    state:{
        // individual hands
        villainScore: 0,
        heroScore: 0,
        winnerText: '.',
        handCounter: 0,

        // rounds
        heroRoundScore: 0,
        villainRoundScore: 0,
        roundsPlayed: 0,
        endOfRound: false,

        // playerImage
        displayNeutralHand: true,

        // database
        database: 'seogh'

    },
    getters:{},
    mutations:{
        // individual hands
        heroWon(state) {
            state.heroScore++
            state.handCounter++
            state.winnerText = 'You won the hand'
        },
        villainWon(state) {
            state.villainScore++
            state.handCounter++
            state.winnerText = 'You lost the hand'
        },
        tieGame(state) {
            state.tieScore++
            state.handCounter++
            state.winnerText = 'Tie '
        },
        resetWinnerText(state) {
            state.winnerText = '.'
        },
        resetScore(state) {
            state.heroScore = 0
            state.villainScore = 0
        },

        // Rounds
        heroWonRound(state) {
            state.roundsPlayed++
            state.heroRoundScore++
            state.winnerText = 'You won round ' + state.roundsPlayed
        },
        villainWonRound(state) {
            state.roundsPlayed++
            state.villainRoundScore++
            state.winnerText = 'Villain won round ' + state.roundsPlayed
        },
        tieRound(state) {
            state.roundsPlayed++
            state.winnerText = 'Round  ' + state.roundsPlayed + ' is a tie-game'
        },
        endOfRound(state) {
            state.endOfRound = true
        },
        isNewRound(state) {
            state.endOfRound = false
        },

        // image/display
        displayNeutralHand(state, display) {
            state.displayNeutralHand = display
        },
        
        // database
        setDatabase(state, data) {
            state.database = data
        },
    },
    actions:{

    },
})

export default store