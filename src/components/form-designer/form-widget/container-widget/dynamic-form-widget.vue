<template>
  <container-wrapper :designer="designer" :widget="widget" :parent-widget="parentWidget" :parent-list="parentList"
    :index-of-parent-list="indexOfParentList">
    <div class="form-container" :class="[selected ? 'selected' : '', customClass]" @click.stop="selectWidget(widget)">
      <VFPreview ref='VFPreview' :isDisabled='true' :hasSubmit='false' :formId="widget.pageId"></VFPreview>
    </div>

  </container-wrapper>
</template>

<script>
import i18n from "@/utils/i18n"
import containerMixin from "@/components/form-designer/form-widget/container-widget/containerMixin"
import ContainerWrapper from "@/components/form-designer/form-widget/container-widget/container-wrapper"
import TableCellWidget from "@/components/form-designer/form-widget/container-widget/table-cell-widget"
import refMixinDesign from "@/components/form-designer/refMixinDesign"

export default {
  name: "dynamic-form-widget",
  componentName: 'ContainerWidget',
  mixins: [i18n, containerMixin, refMixinDesign],
  inject: ['refList'],
  components: {
    ContainerWrapper,
    TableCellWidget,
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
  watch: {
    //
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
  padding: 5px;
  border: 1px dashed #336699;
  box-sizing: border-box;
  min-height: 600px;
}

.table-container.selected {
  outline: 2px solid $--color-primary !important;
}
</style>
