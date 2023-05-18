<template>
  <container-item-wrapper :widget="widget" v-show="!widget.options.hidden">
    <!-- <table-render @updateOtherComp="updateOtherComp" ref="tableRender"></table-render> -->
    <div class="aaaa">table</div>
  </container-item-wrapper>
</template>

<script>
import emitter from '@/utils/emitter'
import i18n from "../../../utils/i18n"
import refMixin from "../../../components/form-render/refMixin"
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
  inject: ['refList', 'sfRefList', 'globalModel'],
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
    setTimeout(() => this.updateOtherComp(), 2000)
  },
  beforeDestroy () {
    this.unregisterFromRefList()
  },
  methods: {
    updateOtherComp () {
      console.log('dynamic-table-item, updateOtherComp');
      /* 必须用dispatch向指定父组件派发消息！！ */
      this.dispatch('VFormRender', 'updateOtherComp',
        [this.widget.options.eventUpdateOtherComp, 'table'])
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
