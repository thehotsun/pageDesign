<template>
  <container-wrapper :designer="designer" :widget="widget" :parent-widget="parentWidget" :parent-list="parentList"
    :index-of-parent-list="indexOfParentList" ref="elCol">
    <div class="form-container" :class="[selected ? 'selected' : '', customClass]" @click.stop="selectWidget(widget)">
      <VFPreview ref='VFPreview' :isDisabled='true' :hasSubmit='false' :formId="widget.pageId"></VFPreview>
    </div>

  </container-wrapper>
</template>

<script>
import i18n from "@/utils/i18n"
import containerMixin from "@/components/form-designer/form-widget/container-widget/containerMixin"
import filedCompHeightReactiveMixins from "@/components/form-designer/form-widget/filedCompHeightReactiveMixins"
import ContainerWrapper from "@/components/form-designer/form-widget/container-widget/container-wrapper"
import refMixinDesign from "@/components/form-designer/refMixinDesign"

export default {
  name: "dynamic-form-widget",
  componentName: 'ContainerWidget',
  mixins: [i18n, containerMixin, refMixinDesign, filedCompHeightReactiveMixins],
  inject: ['refList'],
  components: {
    ContainerWrapper,
  },
  provide () {
    return {
      updateOtherRelateComp: () => { }
    }
  },
  props: {
    widget: Object,
    parentWidget: Object,
    parentList: Array,
    indexOfParentList: Number,
    designer: Object,
  },
  computed: {
    selected () {
      return this.widget.id === this.designer.selectedId
    },

    customClass () {
      return this.widget.options.customClass || ''
    },
  },

  created () {
    this.initRefList()
  },
  mounted () {
    //
  },
  methods: {


  }
}
</script>

<style lang="scss" scoped>
div.form-container {
  // padding: 5px;
  border: 1px dashed #336699;
  box-sizing: border-box;
  width: calc(100% - 4px);
  margin: 2px auto;
  height: calc(100% - 4px);
  overflow-y: auto;
}

.form-container.selected {
  outline: 2px solid $--color-primary !important;
  box-sizing: border-box;

}
</style>
