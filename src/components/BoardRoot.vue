<template>
  <div class="board">
    <div class="row" v-for="row in 8" :key="row">
      <div :id="`${row}${col}`" class="square" v-for="col of coordinates" :key="`${row}${col}`"/>
    </div>
  </div>
  <PiecesHandler />
</template>

<script>
import PiecesHandler from './PiecesHandler.vue'
export default {
  components: {
    PiecesHandler
  },

  data: () => ({
    coordinates: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
  })
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
  rotate: 180deg;
  position: relative;
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