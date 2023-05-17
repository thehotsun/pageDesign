<template>
  <div class="pageDesign">
    <pageDesigner ref="vfDesignerRef">
    </pageDesigner>
  </div>
</template>

<script>
import pageDesigner from './components/page-designer/index.vue'
export default {
  name: 'App',
  components: {
    pageDesigner
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
