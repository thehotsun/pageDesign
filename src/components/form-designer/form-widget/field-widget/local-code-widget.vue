<template>
  <container-wrapper :designer="designer" :widget="widget" :parent-widget="parentWidget" :parent-list="parentList"
    :index-of-parent-list="indexOfParentList">

    <div class="component-container" :class="[selected ? 'selected' : '', customClass]"
      @click.stop="selectWidget(widget)">
    </div>

  </container-wrapper>
</template>

<script>
import i18n from "@/utils/i18n"
import containerMixin from "@/components/form-designer/form-widget/container-widget/containerMixin"
import ContainerWrapper from "@/components/form-designer/form-widget/container-widget/container-wrapper"
import refMixinDesign from "@/components/form-designer/refMixinDesign"
export default {
  name: "local-code-widget",
  componentName: 'ContainerWidget',
  mixins: [i18n, containerMixin, refMixinDesign],
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
div.component-container {

  // padding: 5px;
  border: 1px dashed #336699;
  box-sizing: border-box;
  width: calc(100% - 4px);
  margin: 2px auto;
  height: 200px;
  // margin-bottom: 10px;
  background: #fff;
}

.component-container.selected {
  outline: 2px solid $--color-primary !important;
  box-sizing: border-box;
}
</style>
