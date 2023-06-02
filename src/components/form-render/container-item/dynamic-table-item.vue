<template>
  <container-item-wrapper :widget="widget" v-show="!widget.options.hidden">
    <table-render ref="tableRender" :relate-id="widget.pageId" :form-code="widget.pageCode"
      :previewMode="previewMode"></table-render>
  </container-item-wrapper>
</template>

<script>
import emitter from '@/utils/emitter'
import i18n from "../../../utils/i18n"
import refMixin from "../refMixin.js"
import ContainerItemWrapper from './container-item-wrapper'
import containerItemMixin from "./containerItemMixin";

export default {
  name: "dynamic-table-item",
  componentName: 'ContainerItem',
  mixins: [emitter, i18n, refMixin, containerItemMixin],
  components: {
    ContainerItemWrapper,
  },
  props: {
    widget: Object,
  },
  inject: ['refList', 'sfRefList', 'globalModel', 'previewMode'],
  provide () {
    return {
      updateOtherRelateComp: this.updateOtherComp
    }
  },
  data () {
    return {
    }
  },
  computed: {
  },
  created () {
    this.initRefList()
  },
  mounted () {
  },
  beforeDestroy () {
    this.unregisterFromRefList()
  },
  methods: {
    updateOtherComp (data) {
      console.log('dynamic-table-item, updateOtherRelateComp');
      /* 必须用dispatch向指定父组件派发消息！！ */
      this.dispatch('VFormRender', 'updateOtherComp',
        [this.widget.options.eventUpdateOtherComp, data])
    },
    refreshData (params) {
      console.log(params, 'tablerefreshData');
      this.$refs.tableRender?.refreshData(params)
    }
  },
}
</script>

<style lang="scss" scoped>
.aaaa {
  width: 200px;
  height: 400px;
}
</style>
