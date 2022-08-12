<template>
  <div class="board">
    <div class="row" v-for="row in coordinates" :key="row">
      <div :id="`${row}${col}`" class="square" v-for="col of 8" :key="`${row}${col}`"/>
    </div>
  </div>
</template>

<script>
export default {
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
  background-color:black; color:white;
}

.board>div:nth-child(1), .board>div>div:nth-child(1) {
  background-color: white;
}
</style>