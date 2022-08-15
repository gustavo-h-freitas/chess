<template>
  <div>
    <ChessPiece
      v-for="(piece) in piecesPosition" 
      :key="piece.position"
      v-bind="piece"
      @select-piece="handleSelectPiece(piece)"
    />
  </div>
</template>

<script>
import ChessPiece from './ChessPiece.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    ChessPiece
  },

  data: () => ({
    selectedPiece: null
  }),

  computed: {
    ...mapGetters({
      piecesPosition: 'GET_POSITIONS',
      resetGame: 'GET_RESET_GAME'
    })
  },

  watch: {
    resetGame: {
      handler (newValue) {
        if (newValue) {
          this.initialPiecesPosition()
          this.$store.dispatch('resetGame', false)
        }
      }
    }
  },

  created () {
    this.initialPiecesPosition()
  },

  methods: {
    handleSelectPiece (piece) {
      this.selectedPiece = piece
    },

    handleBoardClick (position) {
      if (!this.selectedPiece) return

      const pieceIndex = this.piecesPosition.findIndex(({piece, color}) => this.selectedPiece.piece === piece && this.selectedPiece.color === color)
      this.$store.dispatch('movePiece', { index: pieceIndex, position, socketEmit: true })

      this.selectedPiece = null
    },

    initialPiecesPosition () {
      const innerPiecesPosition = []
      const rows = {
        '8': 'black',
        '7': 'black',
        '2': 'white',
        '1': 'white'
      }
      
      const pieces = {
        black: ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'],
        white: ['rook', 'knight', 'bishop', 'king', 'queen', 'bishop', 'knight', 'rook']
      }

      const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
      const pawnRows = ['2', '7']

      Object.entries(rows).forEach(([row, color]) => {
        if (pawnRows.includes(row)) {
          for (let position = 0; position < 8; position++) {
            innerPiecesPosition.push({
              color,
              piece: `pawn-${position}`,
              position: `${row}${alphabet[position]}`
            })
          }

        } else {
          pieces[color].forEach((piece, index) => {
            innerPiecesPosition.push({
              color,
              piece: `${piece}-${index}`,
              position: `${row}${alphabet[index]}`
            })
          })
        }
      })

      this.$store.dispatch('setPiecesPosition', innerPiecesPosition)
    }
  }
}
</script>

<style>

</style>