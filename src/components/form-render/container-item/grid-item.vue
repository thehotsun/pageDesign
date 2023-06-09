<template>
  <container-item-wrapper ref="containerWrapper" :widget="widget">
    <el-row :gutter="widget.options.gutter" class="grid-container full-height" :class="[customClass]" :ref="widget.id"
      v-show="!widget.options.hidden">
      <template v-for="(colWidget, colIdx) in widget.cols">
        <PageDesignGrid-col-item :widget="colWidget" :key="colIdx" :parent-list="widget.cols"
          :index-of-parent-list="colIdx" :parent-widget="widget" :sub-form-row-id="subFormRowId"
          :sub-form-row-index="subFormRowIndex" :sub-form-col-index="subFormColIndex">
        </PageDesignGrid-col-item>
      </template>
    </el-row>

  </container-item-wrapper>
</template>

<script>
import emitter from '@/utils/emitter'
import i18n from "../../../utils/i18n"
import refMixin from "@/components/form-render/refMixin.js"
import ContainerItemWrapper from './container-item-gird-wrapper'
import containerItemMixin from "./containerItemMixin"
import gridColItem from './grid-col-item.vue';
import config from "@/defaultConfig/girdHeight";
import { formatterWidthOrHeightStyle } from '@/utils/util'
export default {
  name: "PageDesignGrid-item",
  componentName: 'ContainerItem',
  mixins: [emitter, i18n, refMixin, containerItemMixin],
  components: {
    ContainerItemWrapper,
    'PageDesignGrid-col-item': gridColItem,
  },
  props: {
    widget: Object,

    subFormRowIndex: { /* 子表单组件行索引，从0开始计数 */
      type: Number,
      default: -1
    },
    subFormColIndex: { /* 子表单组件列索引，从0开始计数 */
      type: Number,
      default: -1
    },
    subFormRowId: { /* 子表单组件行Id，唯一id且不可变 */
      type: String,
      default: ''
    },

  },
  inject: ['refList', 'sfRefList', 'globalModel'],
  created () {
    this.initRefList()
  },
  mounted () {

  },
  beforeDestroy () {
    this.unregisterFromRefList()
  },
  computed: {
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
          const defaultHeight = this.widget.options?.defaultHeight?.value;
          let height
          if (val) {
            height = formatterWidthOrHeightStyle(val);
          } else {
            height = `${Math.max(defaultHeight + config.girdOffset, config.girdHeight)}px`
          }
          dom.style.height = height;
        }
      },
    }

  },
  methods: {
  },
}
</script>

<style lang="scss" scoped>
.full-height {
  height: 100%;
  overflow-y: auto;

}
</style>
