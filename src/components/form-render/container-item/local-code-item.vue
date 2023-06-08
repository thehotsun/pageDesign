<template>
  <container-item-wrapper :widget="widget" v-show="!widget.options.hidden">
    <component :key="widget.options.componentId" ref="localCodeComp" v-if="relateComponent" :is="relateComponent">
    </component>
  </container-item-wrapper>
</template>

<script>
import emitter from '@/utils/emitter'
import i18n from "../../../utils/i18n"
import refMixin from "../refMixin.js"
import ContainerItemWrapper from './container-item-wrapper'
import containerItemMixin from "./containerItemMixin";

export default {
  name: "local-code-item",
  componentName: 'ContainerItem',
  mixins: [emitter, i18n, refMixin, containerItemMixin],
  components: {
    ContainerItemWrapper,
  },
  props: {
    widget: Object,
  },
  inject: ['refList', 'sfRefList', 'globalModel', 'previewMode', 'componentList'],
  provide () {
    return {
      updateOtherRelateComp: this.updateOtherComp
    }
  },
  data () {
    return {
      relateComponent: null
    }
  },
  watch: {
    'widget.componentId': {
      immediate: true,
      handler (val) {
        if (val) {
          this.getComponent(val)
        }
      }
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
    getComponent (val) {
      this.relateComponent = this.componentList.find(
        (item) => item.id === val
      )?.component;
    },
    updateOtherComp (data) {
      console.log('local-code-item, updateOtherRelateComp');
      /* 必须用dispatch向指定父组件派发消息！！ */
      this.dispatch('VFormRender', 'updateOtherComp',
        [this.widget.options.eventUpdateOtherComp, data])
    },
    refreshData (params) {
      console.log(params, 'localCodeComprefreshData');
      this.$refs.localCodeComp?.refreshData(params)
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
