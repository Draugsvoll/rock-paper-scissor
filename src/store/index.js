import { createStore } from 'vuex'
import firebase from 'firebase'

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
        database: 'wsgjaagawgawgawghereger'

    },
    getters:{},
    mutations:{
        // individual hands
        heroWon(state) {
            state.heroScore++
            state.handCounter++
            state.winnerText = 'You won '
        },
        villainWon(state) {
            state.villainScore++
            state.handCounter++
            state.winnerText = 'You lost '
        },
        tieGame(state) {
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
        insertDatabase(state, database) {
            console.log('inside mutation ', database)
            state.database = database
        },
    },
    actions:{
        getDatabase: ({ commit }) => {
            var database = []
            firebase.firestore().collection('players').get().then( (data) => {
                console.log('inside firebase function')
                data.forEach( player => {
                    // console.log(player.data())
                    database.push(player.data())
                })
            })
            commit('insertDatabase', database)
        }
    },
})

export default store