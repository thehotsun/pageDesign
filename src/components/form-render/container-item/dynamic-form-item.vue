<template>
  <container-item-wrapper :widget="widget" v-show="!widget.options.hidden">
    <!-- <VFPreview ref='VFPreview' :primaryKeyValue='primaryKeyValue' :isDisabled='onlyRead' :hasSubmit='false'
      :formId='formId' @submit="onSubmit" @cancel="expose_hideDialog"></VFPreview>

    <VFRuntime @updateOtherComp="updateOtherComp" ref="VFRuntime" :primaryKeyValue='primaryKeyValue'
      :isDisabled='onlyRead' :hasSubmit='false' :formId='formId' @submit="onSubmit" @cancel="expose_hideDialog">
    </VFRuntime> -->
    <div class="aaaa">form</div>
  </container-item-wrapper>
</template>

<script>
import emitter from '@/utils/emitter'
import i18n from "../../../utils/i18n"
import refMixin from "../../../components/form-render/refMixin"
import ContainerItemWrapper from './container-item-wrapper'
import containerItemMixin from "./containerItemMixin";

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
      /* 必须用dispatch向指定父组件派发消息！！ */
      console.log('dynamic-form-item, updateOtherComp');
      this.dispatch('VFormRender', 'updateOtherComp',
        [this.widget.options.eventUpdateOtherComp, 'form'])
    },
    refreshData (params) {
      console.log(params, 'formrefreshData');
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
