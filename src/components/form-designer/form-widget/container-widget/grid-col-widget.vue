<template>
  <el-col v-if="widget.type === 'PageDesignGrid-col'" class="grid-cell" v-bind="layoutProps"
    :class="[selected ? 'selected' : '']" @click.native.stop="selectWidget(widget)" ref="elCol" :style="customClass">
    <draggable :list="widget.widgetList" v-bind="{ group: 'dragGroup', ghostClass: 'ghost', animation: 200 }"
      handle=".drag-handler" @end="(evt) => onGridDragEnd(evt, widget.widgetList)"
      @add="(evt) => onGridDragAdd(evt, widget.widgetList)" @update="onGridDragUpdate" :move="checkContainerMove"
      style="height: 100%">
      <transition-group name="fade" tag="div" class="form-widget-list">
        <template v-for="(subWidget, swIdx) in widget.widgetList">
          <template v-if="'container' === subWidget.category">
            <component :is="subWidget.type + '-widget'" :widget="subWidget" :designer="designer" :key="subWidget.id"
              :parent-list="widget.widgetList" :index-of-parent-list="swIdx" :parent-widget="widget" ref="childComp">
            </component>
          </template>
          <template v-else>
            <component :is="subWidget.type + '-widget'" :field="subWidget" :designer="designer" :key="subWidget.id"
              :parent-list="widget.widgetList" :index-of-parent-list="swIdx" :parent-widget="widget" :design-state="true">
            </component>
          </template>
        </template>
      </transition-group>
    </draggable>

    <div class="grid-col-action" v-if="designer.selectedId === widget.id && widget.type === 'PageDesignGrid-col'">
      <i class="el-icon-back" :title="i18nt('designer.hint.selectParentWidget')"
        @click.stop="selectParentWidget(widget)"></i>
      <i class="el-icon-top" v-if="!!parentList && (parentList.length > 1)" :title="i18nt('designer.hint.moveUpWidget')"
        @click.stop="moveUpWidget()"></i>
      <i class="el-icon-bottom" v-if="!!parentList && (parentList.length > 1)"
        :title="i18nt('designer.hint.moveDownWidget')" @click.stop="moveDownWidget()"></i>
      <i class="el-icon-copy-document" :title="i18nt('designer.hint.cloneWidget')" @click.stop="cloneGridCol(widget)"></i>
      <i class="el-icon-delete" :title="i18nt('designer.hint.remove')" @click.stop="removeWidget"></i>
    </div>

    <div class="grid-col-handler" v-if="designer.selectedId === widget.id && widget.type === 'PageDesignGrid-col'">
      <i>栅格列</i>
    </div>
  </el-col>
</template>

<script>
import Draggable from 'vuedraggable'
import i18n from "@/utils/i18n";
import refMixinDesign from "@/components/form-designer/refMixinDesign"
import componentsMixin from "./components-mixin.js"
import config from "@/defaultConfig/girdHeight"
import { formatterWidthOrHeightStyle } from '@/utils/util'

export default {
  name: "PageDesignGrid-col-widget",
  componentName: "GridColWidget",
  mixins: [i18n, refMixinDesign, componentsMixin],
  inject: ['refList'],
  components: {
    Draggable,
  },
  props: {
    parentContainerWrapper: Object,
    girdHeight: String,
    widget: Object,
    parentWidget: Object,
    parentList: Array,
    indexOfParentList: Number,
    designer: Object,
  },
  data () {
    return {
      layoutProps: {
        span: this.widget.options.span || 12,
        // md: this.widget.options.md || 12,
        // sm: this.widget.options.sm || 12,
        // xs: this.widget.options.xs || 12,
        offset: this.widget.options.offset || 0,
        push: this.widget.options.push || 0,
        pull: this.widget.options.pull || 0,
      }
    }
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
        const dom = this.$refs.elCol?.$el;
        if (dom) {
          dom.style.height = val ? formatterWidthOrHeightStyle(val) : '100%'
        }
      },
    },
    'designer.formConfig.layoutType': {
      handler (val) {
        if (!!this.widget.options.responsive) {
          if (val === 'H5') {
            this.layoutProps.span = this.widget.options.xs || 12
          } else if (val === 'Pad') {
            this.layoutProps.span = this.widget.options.sm || 12
          } else {
            this.layoutProps.span = this.widget.options.md || 12
          }
        } else {
          this.layoutProps.span = this.widget.options.span || 12
        }
      }
    },

    'widget.options.responsive': {
      handler (val) {
        let lyType = this.designer.formConfig.layoutType
        if (!!val) {
          if (lyType === 'H5') {
            this.layoutProps.span = this.widget.options.xs || 12
          } else if (lyType === 'Pad') {
            this.layoutProps.span = this.widget.options.sm || 12
          } else {
            this.layoutProps.span = this.widget.options.md || 12
          }
        } else {
          this.layoutProps.span = this.widget.options.span || 12
        }
      }
    },

    'widget.options.span': {
      handler (val) {
        this.layoutProps.span = val
      }
    },

    'widget.options.md': {
      handler (val) {
        this.layoutProps.span = val
      }
    },

    'widget.options.sm': {
      handler (val) {
        this.layoutProps.span = val
      }
    },

    'widget.options.xs': {
      handler (val) {
        this.layoutProps.span = val
      }
    },

    'widget.options.offset': {
      handler (val) {
        this.layoutProps.offset = val
      }
    },

    'widget.options.push': {
      handler (val) {
        this.layoutProps.push = val
      }
    },

    'widget.options.pull': {
      handler (val) {
        this.layoutProps.pull = val
      }
    },

  },
  created () {
    this.initRefList()
    this.initLayoutProps()
  },
  mounted () {
  },
  methods: {
    initLayoutProps () {
      if (!!this.widget.options.responsive) {
        let lyType = this.designer.formConfig.layoutType
        if (lyType === 'H5') {
          this.layoutProps.span = this.widget.options.xs || 12
        } else if (lyType === 'Pad') {
          this.layoutProps.span = this.widget.options.sm || 12
        } else {
          this.layoutProps.span = this.widget.options.md || 12
        }
      } else {
        this.layoutProps.spn = this.widget.options.span
      }
    },

    onGridDragEnd (evt, subList) {
      //
    },

    updateGirdHeight (isDel) {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (!this.girdHeight) {
            let summaryHeight = 0
            this.$refs.childComp?.map(component => {
              const dom = component.$el.childNodes[0].childNodes[0];
              if (dom) {
                console.log(dom, 'dom');
                const height = getComputedStyle(dom).height;
                summaryHeight += (parseFloat(height) + 8);
              }
            })
            if (isDel) {
              resolve(summaryHeight);
              return
            }
            let latestHeight = 0;
            let originHeight = latestHeight = parseFloat(this.parentContainerWrapper.$el.style.height);
            originHeight = isNaN(originHeight) ? 0 : originHeight
            if (originHeight < summaryHeight) {
              latestHeight = summaryHeight
              this.parentContainerWrapper.$el.style.height = `${summaryHeight + 27}px`;
              const dom = this.$refs.elCol?.$el;
              if (dom && !this.colHeight) {
                dom.style.height = 'calc(100% - 0px)';
              }
            }
            this.$emit('updateLatestHeight', latestHeight)
            console.log(originHeight, summaryHeight, 'onGridDragAdd');
            // summaryHeight
          }
        }, 1000)
      })
    },

    onGridDragAdd (evt, subList) {
      const newIndex = evt.newIndex
      if (!!subList[newIndex]) {
        this.designer.setSelected(subList[newIndex])
      }
      this.designer.emitHistoryChange()
      this.designer.emitEvent('field-selected', this.widget)
      this.updateGirdHeight()
    },

    onGridDragUpdate () {
      this.designer.emitHistoryChange()
    },

    selectWidget (widget) {
      console.log('id: ' + widget.id)
      this.designer.setSelected(widget)
    },

    checkContainerMove (evt) {
      return this.designer.checkWidgetMove(evt)
    },

    selectParentWidget () {
      if (this.parentWidget) {
        this.designer.setSelected(this.parentWidget)
      } else {
        this.designer.clearSelected()
      }
    },

    moveUpWidget () {
      this.designer.moveUpWidget(this.parentList, this.indexOfParentList)
    },

    moveDownWidget () {
      this.designer.moveDownWidget(this.parentList, this.indexOfParentList)
    },

    cloneGridCol (widget) {
      this.designer.cloneGridCol(widget, this.parentWidget)
    },

    removeWidget () {
      if (!!this.parentList) {
        let nextSelected = null
        if (this.parentList.length === 1) {
          if (!!this.parentWidget) {
            nextSelected = this.parentWidget
          }
        } else if (this.parentList.length === (1 + this.indexOfParentList)) {
          nextSelected = this.parentList[this.indexOfParentList - 1]
        } else {
          nextSelected = this.parentList[this.indexOfParentList + 1]
        }

        this.$nextTick(() => {
          this.parentList.splice(this.indexOfParentList, 1)
          //if (!!nextSelected) {
          this.designer.setSelected(nextSelected)
          //}
          this.designer.emitHistoryChange()
          this.dispatch('girdContainerWidget', 'updateHeight');
        })
      }
    },

  }
}
</script>

<style lang="scss" scoped>
.grid-cell {
  min-height: 38px;
  //margin: 6px 0;  /* 设置了margin，栅格列的offset、push、pull会失效！！ */
  padding: 3px;
  outline: 1px dashed #336699;
  position: relative;
  height: 100%;
  overflow-y: auto;

  .form-widget-list {
    min-height: 28px;
    height: 100%;
    overflow: auto;
  }

  .grid-col-action {
    position: absolute;
    bottom: 0;
    right: 0px;
    height: 28px;
    line-height: 28px;
    background: $--color-primary;
    z-index: 999;

    i {
      font-size: 14px;
      color: #fff;
      margin: 0 5px;
      cursor: pointer;
    }
  }

  .grid-col-handler {
    position: absolute;
    top: -2px;
    left: -2px;
    height: 22px;
    line-height: 22px;
    background: $--color-primary;
    z-index: 9;

    i {
      font-size: 14px;
      font-style: normal;
      color: #fff;
      margin: 4px;
      cursor: default;
    }
  }
}
</style>
