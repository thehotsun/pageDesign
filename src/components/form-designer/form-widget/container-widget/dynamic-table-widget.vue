<template>
  <container-wrapper :designer="designer" :widget="widget" :parent-widget="parentWidget" :parent-list="parentList"
    :index-of-parent-list="indexOfParentList" ref="elCol">
    <div class="table-container" :class="[selected ? 'selected' : '']" @click.stop="selectWidget(widget)" :style="customClass">
      <table-render :relate-id="widget.pageId" :form-code="widget.pageCode" :previewMode="true"></table-render>
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
  name: "dynamic-table-widget",
  componentName: 'ContainerWidget',
  mixins: [i18n, containerMixin, refMixinDesign, filedCompHeightReactiveMixins],
  inject: ['refList'],
  components: {
    ContainerWrapper,
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
  provide () {
    return {
      updateOtherRelateComp: () => { }
    }
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
div.table-container {

  // padding: 5px;
  border: 1px dashed #336699;
  box-sizing: border-box;
  width: calc(100% - 4px);
  margin: 2px auto;
  height: calc(100% - 4px);
  overflow-y: auto;
}

.table-container.selected {
  outline: 2px solid $--color-primary !important;
  box-sizing: border-box;
}
</style>
