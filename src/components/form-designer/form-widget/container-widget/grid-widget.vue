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
          :gird-height="widget.options.colHeight" :index-of-parent-list="colIdx" :parent-widget="widget"
          :parent-container-wrapper="$refs.containerWrapper" @updateLatestHeight="updateLatestHeight"
          ref="cols"></PageDesignGrid-col-widget>
      </template>
    </el-row>

  </container-wrapper>
</template>

<script>
import i18n from "@/utils/i18n"
import GridColWidget from "@/components/form-designer/form-widget/container-widget/grid-col-widget"
import containerMixin from "@/components/form-designer/form-widget/container-widget/containerMixin"
import ContainerWrapper from "@/components/form-designer/form-widget/container-widget/container-gird-wrapper"
import refMixinDesign from "@/components/form-designer/refMixinDesign"
import config from "@/defaultConfig/girdHeight"
import { formatterWidthOrHeightStyle } from '@/utils/util'

export default {
  name: "PageDesignGrid-widget",
  componentName: 'girdContainerWidget',
  mixins: [i18n, containerMixin, refMixinDesign],
  inject: ['refList'],
  components: {
    ContainerWrapper,
    'PageDesignGrid-col-widget': GridColWidget
  },
  data () {
    return {
      // latestHeight: 0
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

    colHeight () {
      return this.widget.options.colHeight
    },

  },
  watch: {
    colHeight: {
      immediate: true,
      async handler (val) {
        await this.$nextTick()
        this.setWrapHeight(val)
      },
    },
  },
  created () {
    this.initRefList()
  },
  mounted () {
    this.$on('updateHeight', async () => {
      const highest = await this.getColsHighest(true);
      console.log('updateHeight', highest);
      this.updateLatestHeight(highest);
      this.setWrapHeight(null, highest);
    })
  },
  methods: {
    async getColsHighest (isDel) {
      let highest = 0;
      const promises = []
      this.$refs.cols.map(comp => {
        promises.push(comp.updateGirdHeight(isDel))
      })
      const allHeight = await Promise.all(promises)
      console.log(allHeight, 'allHeight');
      highest = Math.max(...allHeight)
      return highest + 27
    },
    setWrapHeight (val, highest) {
      const dom = this.$refs.containerWrapper?.$el;
      console.log(val, 'colHeight');
      if (dom) {
        const defaultHeight = this.widget.options?.defaultHeight?.value || 0;
        let height
        if (val) {
          height = formatterWidthOrHeightStyle(val);
        } else {
          console.log(highest || 0, defaultHeight + config.girdOffset, config.girdHeight);
          height = `${Math.max(highest || 0, defaultHeight + config.girdOffset, config.girdHeight)}px`
        }
        dom.style.height = height;
      }
    },

    updateLatestHeight (val) {
      console.log(val, 'updateLatestHeight');
      this.widget.options.defaultHeight.value = val
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
  box-sizing: border-box;
}
</style>
