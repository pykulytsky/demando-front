<template>
  <div class="table-item">
    <h3>{{index+1}}. {{member}}</h3>
    <h3>{{result}} pts</h3>
  </div>
</template>
<script>
export default {
  props: {
      member: String,
      result: String,
      index: Number
  },
};
</script>
<style>
.table-item {
  display: flex;
  justify-content: space-between;
  padding: 5px 20px;
  background-color: rgb(24, 24, 24);
  opacity: 0.5;
  margin-bottom: 10px;
  width: 90%;
}
</style>
