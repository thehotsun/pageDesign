<!--
/**
 * author: vformAdmin
 * email: vdpadmin@163.com
 * website: https://www.vform666.com
 * date: 2021.08.18
 * remark: 如果要分发VForm源码，需在本文件顶部保留此文件头信息！！
 */
-->

<template>
  <div class="container-grid-wrapper full-height">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "container-item-wrapper",
  props: {
    widget: {
      type: Object,
      required: true
    },
  },
  computed: {
    customClass () {
      return this.widget.options.customClass
    },

  }
}
</script>

<style lang="scss" scoped>
.container-grid-wrapper.full-height {
  height: 100%;
  overflow-y: auto;
}
</style>
