<template>
  <container-item-wrapper :widget="widget" v-show="!widget.options.hidden" ref="elCol" :style="customClass">
    <router-view></router-view>
  </container-item-wrapper>
</template>

<script>
import emitter from '@/utils/emitter'
import i18n from "../../../utils/i18n"
import refMixin from "@/components/form-render/refMixin"
import ContainerItemWrapper from './container-item-wrapper'
import containerItemMixin from "./containerItemMixin";
import filedCompHeightReactiveMixins from "../filedCompHeightReactiveMixins.js"
export default {
  name: "router-view-item",
  componentName: 'ContainerItem',
  mixins: [emitter, i18n, refMixin, containerItemMixin, filedCompHeightReactiveMixins],
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
    customClass () {
      return this.widget.options.customClass || ''
    },
  },
  mounted () {
  },
  beforeDestroy () {
    this.unregisterFromRefList()
  },
  methods: {
    updateOtherComp (params) {
      /* 必须用dispatch向指定父组件派发消息！！ */
      console.log('dynamic-form-item, updateOtherComp');
      this.dispatch('VFormRender', 'updateOtherComp',
        [this.widget.options.eventUpdateOtherComp, params])
    },
    refreshData (params) {
      console.log(params, 'formrefreshData');
      this.$refs.VFRuntime?.refreshData(params)
    }
  },
}
</script>

<style lang="scss" scoped>
.aaaa {
  width: 200px;
  height: 400px;
}

::v-deep .el-form-item--small.el-form-item {
  margin-bottom: 10px;
}
</style>
