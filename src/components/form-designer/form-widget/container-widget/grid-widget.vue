<!--
/**
 * author: vformAdmin
 * email: vdpadmin@163.com
 * website: https://www.vform666.com
 * date: 2021.08.18
 * remark: 如果要分发VForm源码，需在本文件顶部保留此文件头信息！！
 */
-->

<template>
  <container-wrapper :designer="designer" :widget="widget" :parent-widget="parentWidget" :parent-list="parentList"
    :index-of-parent-list="indexOfParentList" ref="containerWrapper">

    <el-row :gutter="widget.options.gutter" class="grid-container" :class="[selected ? 'selected' : '', customClass]"
      @click.native.stop="selectWidget(widget)" style="margin: 2px">
      <template v-for="(colWidget, colIdx) in widget.cols">
        <PageDesignGrid-col-widget :widget="colWidget" :designer="designer" :key="colWidget.id" :parent-list="widget.cols"
          :index-of-parent-list="colIdx" :parent-widget="widget" :parent-container-wrapper="$refs['container-wrapper']"
          :col-height="widget.options.colHeight"></PageDesignGrid-col-widget>
      </template>
    </el-row>

  </container-wrapper>
</template>

<script>
import i18n from "@/utils/i18n"
import GridColWidget from "@/components/form-designer/form-widget/container-widget/grid-col-widget"
import containerMixin from "@/components/form-designer/form-widget/container-widget/containerMixin"
import ContainerWrapper from "@/components/form-designer/form-widget/container-widget/container-wrapper"
import refMixinDesign from "@/components/form-designer/refMixinDesign"
import config from "@/defaultConfig/girdHeight"

export default {
  name: "PageDesignGrid-widget",
  componentName: 'ContainerWidget',
  mixins: [i18n, containerMixin, refMixinDesign],
  inject: ['refList'],
  components: {
    ContainerWrapper,
    'PageDesignGrid-col-widget': GridColWidget
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

    colHeight () {
      return this.widget.options.colHeight
    },

  },
  watch: {
    colHeight: {
      immediate: true,
      async handler (val) {
        await this.$nextTick()
        const dom = this.$refs.containerWrapper?.$el;
        console.log(val, dom, this.$refs.containerWrapper, 'colHeight');
        if (dom) {
          dom.style.height = val ? this.formatterWidthOrHeightStyle(val) : config.girdHeight
          dom.style['overflow-y'] = 'auto';
        }
      },
    }
  },
  created () {
    this.initRefList()
  },
  mounted () {
    //
  },
  methods: {
    // 格式化高度宽度
    formatterWidthOrHeightStyle (length) {
      length = length.trim()
      if (/^\d+$/.test(length)) {
        return `${length}px`
      } else if (/^\d+(px)$/.test(length)) {
        return length
      } else if (/^\d+(%)$/.test(length)) {
        return length
      } else {
        console.warn('栅格列统一高度输入的格式不正确！');
        return ''
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.el-row.grid-container {
  min-height: 40px;
  //line-height: 48px;
  padding: 6px !important;
  box-sizing: border-box;
  outline: 1px dashed #336699;
  height: calc(100% - 4px);
  overflow: auto;

  .form-widget-list {
    min-height: 28px;
  }

}

.grid-container.selected,
.grid-cell.selected {
  outline: 2px solid $--color-primary !important;
}
</style>
