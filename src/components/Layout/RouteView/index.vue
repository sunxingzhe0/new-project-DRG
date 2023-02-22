<template>
  <div class="route-view">
    <slot></slot>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.route-view {
  flex: 1;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
}
</style>
