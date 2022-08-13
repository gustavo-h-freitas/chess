<template>
  <div class="board">
    <div 
      v-for="row in 8" 
      :key="row"
      class="row"
    >
      <div 
        v-for="col of coordinates"
        :id="generateCoordinates(row, col)"
        :key="generateCoordinates(row, col)"
        class="square"
        @click="handlePositionSelect(`${row}${col}`)"
      />
    </div>
  </div>
  <PiecesHandler ref="PiecesHandler" />
</template>

<script>
import PiecesHandler from './PiecesHandler.vue'
export default {
  components: {
    PiecesHandler
  },

  data: () => ({
    coordinates: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
  }),

  methods: {
    generateCoordinates (row, col) {
      return `${row}${col}`
    },

    handlePositionSelect (position) {
      this.$refs.PiecesHandler.handleBoardClick(position)
    }
  }
}
</script>

<style>
.board {
  display: flex;
  width: min-content;
  height: auto;
  flex-direction: column;
  margin: 0 auto;
  border: 3px solid #222;
  box-shadow: 1px 2px 10px rgba(55, 55, 55, .5);
  position: relative;
  transform: rotate(180deg);
}

.row {
  display: grid;
  grid-template-columns: repeat(8, 50px);
}

.square{
  height: 50px;
}

.board>div:nth-child(odd)>div:nth-child(even),
.board>div:nth-child(even)>div:nth-child(odd){
  background-color:rgb(98, 98, 98); color:white;
}

.board>div:nth-child(1), .board>div>div:nth-child(1) {
  background-color: white;
}
</style>