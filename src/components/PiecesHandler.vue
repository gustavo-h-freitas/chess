<template>
  <div>
    <ChessPiece
      v-for="piece in piecesPosition" 
      :key="piece.position"
      v-bind="piece"
    />
  </div>
</template>

<script>
import ChessPiece from './ChessPiece.vue'

export default {
  components: {
    ChessPiece
  },

  data: () => ({
    piecesPosition: []
  }),

  methods: {
    initialPiecesPosition () {
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
            this.piecesPosition.push({
              color,
              piece: 'pawn',
              position: `${row}${alphabet[position]}`
            })
          }

        } else {
          pieces[color].forEach((piece, index) => {
            this.piecesPosition.push({
              color,
              piece,
              position: `${row}${alphabet[index]}`
            })
          })
        }
      })
    }
  }, 

  created () {
    this.initialPiecesPosition()
  }
}
</script>

<style>

</style>