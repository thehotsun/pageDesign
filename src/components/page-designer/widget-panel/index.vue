<template>
  <el-scrollbar class="side-scroll-bar">
    <div class="panel-container">

      <el-tabs v-model="firstTab" class="no-bottom-margin indent-left-margin">
        <el-tab-pane name="componentLib">
          <span slot="label"><i class="el-icon-set-up"></i> {{ i18nt('designer.componentLib') }}</span>

          <el-collapse v-model="activeNames" class="widget-collapse">
            <el-collapse-item name="1" :title="i18nt('designer.containerTitle')">
              <draggable tag="ul" :list="containers" :group="{ name: 'dragGroup', pull: 'clone', put: false }"
                :clone="handleContainerWidgetClone" ghost-class="ghost" :sort="false" :move="checkContainerMove"
                @end="onContainerDragEnd">
                <li v-for="(ctn, index) in containers" :key="index" class="container-widget-item" :title="ctn.displayName"
                  @dblclick="addContainerByDbClick(ctn)">
                  <span><svg-icon :icon-class="ctn.icon" class-name="color-svg-icon" />{{ getWidgetLabel(ctn) }}</span>
                </li>
              </draggable>
            </el-collapse-item>

            <el-collapse-item name="2" title="列表页面">
              <draggable tag="ul" :list="tableList" :group="{ name: 'dragGroup', pull: 'clone', put: false }"
                :move="checkFieldMove" :clone="handleFieldWidgetClone" ghost-class="ghost" :sort="false">
                <li v-for="(fld, index) in tableList" :key="index" class="field-widget-item" :title="fld.displayName"
                  @dblclick="addFieldByDbClick(fld)">
                  <span><svg-icon :icon-class="fld.icon" class-name="color-svg-icon" />{{ getWidgetLabel(fld) }}</span>
                </li>
              </draggable>
            </el-collapse-item>

            <el-collapse-item name="3" title="表单页面">
              <draggable tag="ul" :list="formList" :group="{ name: 'dragGroup', pull: 'clone', put: false }"
                :move="checkFieldMove" :clone="handleFieldWidgetClone" ghost-class="ghost" :sort="false">
                <li v-for="(fld, index) in formList" :key="index" class="field-widget-item" :title="fld.displayName"
                  @dblclick="addFieldByDbClick(fld)">
                  <span><svg-icon :icon-class="fld.icon" class-name="color-svg-icon" />{{ getWidgetLabel(fld) }}</span>
                </li>
              </draggable>
            </el-collapse-item>

            <!-- -->
            <!-- <el-collapse-item name="4" :title="i18nt('designer.customFieldTitle')">
              <draggable tag="ul" :list="customFields" :group="{ name: 'dragGroup', pull: 'clone', put: false }"
                :move="checkFieldMove" :clone="handleFieldWidgetClone" ghost-class="ghost" :sort="false">
                <li v-for="(fld, index) in customFields" :key="index" class="field-widget-item" :title="fld.displayName"
                  @dblclick="addFieldByDbClick(fld)">
                  <span>
                    <svg-icon :icon-class="fld.icon" class-name="color-svg-icon" />{{ getWidgetLabel(fld) }}</span>
                </li>
              </draggable>
            </el-collapse-item> -->
            <!-- -->

          </el-collapse>

        </el-tab-pane>


      </el-tabs>

    </div>
  </el-scrollbar>
</template>

<script>
import Draggable from 'vuedraggable'
import SvgIcon from '@/components/svg-icon'
import { containers } from "./widgetsConfig"
import i18n, { getLocale } from "@/utils/i18n"

export default {
  name: "FieldPanel",
  mixins: [i18n],
  components: {
    Draggable,
    SvgIcon
  },
  props: {
    designer: Object,
  },
  inject: ['getBannedWidgets', 'getDesignerConfig', 'queryFormList', 'queryTableList', 'groupId'],
  data () {
    return {
      designerConfig: this.getDesignerConfig(),
      firstTab: 'componentLib',
      activeNames: ['1', '2', '3', '4'],
      tableList: [],
      formList: [],
      containers,
    }
  },
  computed: {
    //
  },
  mounted () {
    this.loadWidgets()
    this.getFormList()
    this.getTableList()
  },
  methods: {
    async getFormList () {
      if (this.queryFormList) {

        const res = await this.queryFormList(this.groupId)
        this.formList = res.data
      } else {
        console.warn('请在pageDesign得父组件中通过provide提供queryFormList！')
      }
    },

    async getTableList () {
      if (this.queryTableList) {

        const res = await this.queryTableList(this.groupId)
        this.tableList = res.data
      } else {
        console.warn('请在pageDesign得父组件中通过provide提供queryTableList！')
      }
    },

    getWidgetLabel (widget) {
      if (!!widget.alias) {  //优先显示组件别名
        return this.i18n2t(`designer.widgetLabel.${widget.alias}`, `extension.widgetLabel.${widget.alias}`)
      }

      return this.i18n2t(`designer.widgetLabel.${widget.type}`, `extension.widgetLabel.${widget.type}`)
    },

    isBanned (wName) {
      return this.getBannedWidgets().indexOf(wName) > -1
    },



    getFTTitle (ft) {
      const langName = getLocale()
      if (!!ft.i18n && !!ft.i18n[langName]) {
        return ft.i18n[langName].title || ft.title
      } else {
        return ft.title
      }
    },

    loadWidgets () {
      this.containers = this.containers.map(con => {
        return {
          ...con,
          displayName: this.i18n2t(`designer.widgetLabel.${con.type}`, `extension.widgetLabel.${con.type}`)
        }
      }).filter(con => {
        return !con.internal && !this.isBanned(con.type)
      })

    },

    handleContainerWidgetClone (origin) {
      return this.designer.copyNewContainerWidget(origin)
    },

    handleFieldWidgetClone (origin) {
      return this.designer.copyNewFieldWidget(origin)
    },

    /* draggable组件的move钩子是在内部子组件被拖放到其他draggable组件时触发！！ */
    checkContainerMove (evt) {
      return this.designer.checkWidgetMove(evt)
    },

    /* draggable组件的move钩子是在内部子组件被拖放到其他draggable组件时触发！！ */
    checkFieldMove (evt) {
      return this.designer.checkFieldMove(evt)
    },

    onContainerDragEnd (evt) {
      //console.log('Drag end of container: ')
      //console.log(evt)
    },

    addContainerByDbClick (container) {
      this.designer.addContainerByDbClick(container)
    },

    addFieldByDbClick (widget) {
      this.designer.addFieldByDbClick(widget)
    },



  }

}
</script>

<style lang="scss" scoped>
.color-svg-icon {
  color: $--color-primary;
}

.side-scroll-bar {
  ::v-deep .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}

div.panel-container {
  padding-bottom: 10px;
}

.no-bottom-margin ::v-deep .el-tabs__header {
  margin-bottom: 0;
}

.indent-left-margin {
  ::v-deep .el-tabs__nav {
    margin-left: 20px;
  }
}

.el-collapse-item ::v-deep ul>li {
  list-style: none;
}

.widget-collapse {
  border-top-width: 0;

  ::v-deep .el-collapse-item__header {
    margin-left: 8px;
    font-style: italic;
    font-weight: bold;
  }

  ::v-deep .el-collapse-item__content {
    padding-bottom: 6px;

    ul {
      padding-left: 10px;
      /* 重置IE11默认样式 */
      margin: 0;
      /* 重置IE11默认样式 */
      margin-block-start: 0;
      margin-block-end: 0.25em;
      padding-inline-start: 10px;

      &:after {
        content: "";
        display: block;
        clear: both;
      }

      .container-widget-item,
      .field-widget-item {
        display: inline-block;
        height: 28px;
        line-height: 28px;
        width: 115px;
        float: left;
        margin: 2px 6px 6px 0;
        cursor: move;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        background: #fafafa;
        border: 1px #c1c2c3 solid;
        border-radius: 5px;
      }

      .container-widget-item:hover,
      .field-widget-item:hover {
        background: #EBEEF5;
        outline: 1px solid $--color-primary;
      }

      .drag-handler {
        position: absolute;
        top: 0;
        left: 160px;
        background-color: #dddddd;
        border-radius: 5px;
        padding-right: 5px;
        font-size: 11px;
        color: #666666;
      }
    }
  }
}

.el-card.ft-card {
  border: 1px solid #8896B3;
}

.ft-card {
  margin-bottom: 10px;

  .bottom {
    margin-top: 10px;
    line-height: 12px;
  }

  /*
    .image-zoom {
      height: 500px;
      width: 620px
    }
    */

  .ft-title {
    font-size: 13px;
    font-weight: bold;
  }

  .right-button {
    padding: 0;
    float: right;
  }

  .clear-fix:before,
  .clear-fix:after {
    display: table;
    content: "";
  }

  .clear-fix:after {
    clear: both;
  }

}
</style>
