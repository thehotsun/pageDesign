<template>
  <container-item-wrapper :widget="widget" v-show="!widget.options.hidden">
    <VFRuntime ref='VFRuntime' :hasSubmit='false' :formId="widget.pageId" @updateOtherComp="updateOtherComp"></VFRuntime>
  </container-item-wrapper>
</template>

<script>
import emitter from '@/utils/emitter'
import i18n from "../../../utils/i18n"
import refMixin from "@/components/form-render/refMixin"
import ContainerItemWrapper from './container-item-wrapper'
import containerItemMixin from "./containerItemMixin";
console.log(refMixin, 'refMixindynamic-form-item');
export default {
  name: "dynamic-form-item",
  componentName: 'ContainerItem',
  mixins: [emitter, i18n, refMixin, containerItemMixin],
  components: {
    ContainerItemWrapper,
  },
  props: {
    widget: Object,
  },
  provide () {
    return {
      updateOtherRelateComp: this.updateOtherComp
    }
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
</style>
