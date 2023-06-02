<template>
  <div class="toolbar-container">
    <div class="left-toolbar">
      <el-button type="text" :disabled="undoDisabled" :title="i18nt('designer.toolbar.undoHint')" @click="undoHistory">
        <svg-icon icon-class="undo" /></el-button>
      <el-button type="text" :disabled="redoDisabled" :title="i18nt('designer.toolbar.redoHint')" @click="redoHistory">
        <svg-icon icon-class="redo" /></el-button>
      <el-button-group style="margin-left: 20px">
        <el-button :type="layoutType === 'PC' ? 'info' : ''" @click="changeLayoutType('PC')">
          {{ i18nt('designer.toolbar.pcLayout') }}</el-button>
        <el-button :type="layoutType === 'Pad' ? 'info' : ''" @click="changeLayoutType('Pad')">
          {{ i18nt('designer.toolbar.padLayout') }}</el-button>
        <el-button :type="layoutType === 'H5' ? 'info' : ''" @click="changeLayoutType('H5')">
          {{ i18nt('designer.toolbar.mobileLayout') }}</el-button>
      </el-button-group>

    </div>


    <div class="right-toolbar">
      <div class="right-toolbar-con">
        <el-button v-if="showToolButton('previewFormButton')" type="text" @click="previewForm">
          <i class="el-icon-view" />{{ i18nt('designer.toolbar.preview') }}</el-button>
        <el-button v-if="showToolButton('importJsonButton')" type="text" @click="importJson">
          {{ i18nt('designer.toolbar.importJson') }}</el-button>
        <el-button v-if="showToolButton('exportJsonButton')" type="text" @click="exportJson">
          {{ i18nt('designer.toolbar.exportJson') }}</el-button>
        <template v-for="(idx, slotName) in $slots">
          <slot :name="slotName"></slot>
        </template>
      </div>
    </div>

    <el-dialog :title="i18nt('designer.toolbar.preview')" :visible.sync="showPreviewDialogFlag"
      v-if="showPreviewDialogFlag" :show-close="true" :close-on-click-modal="false" :close-on-press-escape="false" center
      v-dialog-drag :destroy-on-close="true" :append-to-body="true" class="small-padding-dialog" width="75%"
      :fullscreen="(layoutType === 'H5') || (layoutType === 'Pad')">
      <div>
        <div class="form-render-wrapper"
          :class="[layoutType === 'H5' ? 'h5-layout' : (layoutType === 'Pad' ? 'pad-layout' : '')]">
          <VFormRender ref="preForm" :form-json="formJson" :preview-state="true" :global-dsv="designerDsv"
            @appendButtonClick="testOnAppendButtonClick" @buttonClick="testOnButtonClick"
            @dataTableSelectionChange="testDTSC" :disabled-mode="false" @formChange="handleFormChange">
          </VFormRender>
        </div>
      </div>
    </el-dialog>

    <el-dialog :title="i18nt('designer.toolbar.importJson')" :visible.sync="showImportJsonDialogFlag"
      v-if="showImportJsonDialogFlag" :show-close="true" class="small-padding-dialog" center v-dialog-drag append-to-body
      :close-on-click-modal="false" :close-on-press-escape="false" :destroy-on-close="true">
      <el-alert type="info" :title="i18nt('designer.hint.importJsonHint')" show-icon class="alert-padding"></el-alert>
      <code-editor :mode="'json'" :readonly="false" v-model="importTemplate"></code-editor>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="doJsonImport">
          {{ i18nt('designer.hint.import') }}</el-button>
        <el-button @click="showImportJsonDialogFlag = false">
          {{ i18nt('designer.hint.cancel') }}</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="i18nt('designer.toolbar.exportJson')" :visible.sync="showExportJsonDialogFlag" append-to-body
      v-if="showExportJsonDialogFlag" :show-close="true" class="small-padding-dialog" center v-dialog-drag
      :close-on-click-modal="false" :close-on-press-escape="false" :destroy-on-close="true">
      <code-editor :mode="'json'" :readonly="true" v-model="jsonContent"></code-editor>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" class="copy-json-btn" :data-clipboard-text="jsonRawContent" @click="copyFormJson">
          {{ i18nt('designer.hint.copyJson') }}</el-button>
        <el-button @click="saveFormJson">{{ i18nt('designer.hint.saveFormJson') }}</el-button>
        <el-button type="" @click="showExportJsonDialogFlag = false">
          {{ i18nt('designer.hint.closePreview') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import VFormRender from '@/components/form-render/index'
import CodeEditor from '@/components/code-editor/index'
import SvgIcon from '@/components/svg-icon'
import Clipboard from 'clipboard'
import {
  deepClone,
  copyToClipboard,
  generateId,
  getQueryParam,
  traverseAllWidgets,
} from "@/utils/util"
import i18n from '@/utils/i18n'
import { saveAs } from 'file-saver'

export default {
  name: "ToolbarPanel",
  mixins: [i18n],
  components: {
    VFormRender,
    CodeEditor,
    SvgIcon,
    Clipboard,
  },
  props: {
    designer: Object,
    globalDsv: {
      type: Object,
      default: () => ({})
    },
  },
  inject: ['getDesignerConfig'],
  data () {
    return {
      formJson: {},
      designerConfig: this.getDesignerConfig(),

      toolbarWidth: 420,
      showPreviewDialogFlag: false,
      showImportJsonDialogFlag: false,
      showExportJsonDialogFlag: false,
      importTemplate: '',
      jsonContent: '',
      jsonRawContent: '',

      formDataJson: '',
      formDataRawJson: '',

    }
  },
  computed: {
    undoDisabled () {
      return !this.designer.undoEnabled()
    },

    redoDisabled () {
      return !this.designer.redoEnabled()
    },

    layoutType () {
      return this.designer.getLayoutType()
    },

    designerDsv () {
      return this.globalDsv
    }

  },

  mounted () {
    //
  },
  methods: {
    showToolButton (configName) {
      if (this.designerConfig[configName] === undefined) {
        return true
      }
      return !!this.designerConfig[configName]
    },

    undoHistory () {
      this.designer.undoHistoryStep()
    },

    redoHistory () {
      this.designer.redoHistoryStep()
    },

    changeLayoutType (newType) {
      this.designer.changeLayoutType(newType)
    },

    
    clearFormWidget () {
      this.designer.clearDesigner()
      this.designer.formWidget.clearWidgetRefList()
    },


    previewForm () {
      this.$set(this.formJson, 'widgetList', deepClone(this.designer.widgetList))
      this.$set(this.formJson, 'formConfig', deepClone(this.designer.formConfig))

      this.showPreviewDialogFlag = true
    },

    saveAsFile (fileContent, defaultFileName) {
      this.$prompt(this.i18nt('designer.hint.fileNameForSave'), this.i18nt('designer.hint.saveFileTitle'), {
        inputValue: defaultFileName,
        closeOnClickModal: false,
        inputPlaceholder: this.i18nt('designer.hint.fileNameInputPlaceholder')
      }).then(({ value }) => {
        if (!value) {
          value = defaultFileName
        }

        if (getQueryParam('vscode') == 1) {
          this.vsSaveFile(value, fileContent)
          return
        }

        const fileBlob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' })
        saveAs(fileBlob, value)
      }).catch(() => {
        //
      })
    },

    vsSaveFile (fileName, fileContent) {
      const msgObj = {
        cmd: 'writeFile',
        data: {
          fileName,
          code: fileContent
        }
      }
      window.parent.postMessage(msgObj, '*')
    },

    importJson () {
      this.importTemplate = JSON.stringify(this.designer.getImportTemplate(), null, '  ')
      this.showImportJsonDialogFlag = true
    },

    doJsonImport () {
      try {
        let importObj = JSON.parse(this.importTemplate)
        this.designer.loadFormJson(importObj)

        this.showImportJsonDialogFlag = false
        this.$message.success(this.i18nt('designer.hint.importJsonSuccess'))

        this.designer.emitHistoryChange()

        this.designer.emitEvent('form-json-imported', [])
      } catch (ex) {
        this.$message.error(ex + '')
      }
    },

    exportJson () {
      let widgetList = deepClone(this.designer.widgetList)
      let formConfig = deepClone(this.designer.formConfig)
      this.jsonContent = JSON.stringify({ widgetList, formConfig }, null, '  ')
      this.jsonRawContent = JSON.stringify({ widgetList, formConfig })
      this.showExportJsonDialogFlag = true
    },

    copyFormJson (e) {
      copyToClipboard(this.jsonRawContent, e,
        this.$message,
        this.i18nt('designer.hint.copyJsonSuccess'),
        this.i18nt('designer.hint.copyJsonFail')
      )
    },

    saveFormJson () {
      this.saveAsFile(this.jsonContent, `vform${generateId()}.json`)
    },


    copyFormDataJson (e) {
      copyToClipboard(this.formDataRawJson, e,
        this.$message,
        this.i18nt('designer.hint.copyJsonSuccess'),
        this.i18nt('designer.hint.copyJsonFail')
      )
    },

    saveFormData () {
      this.saveAsFile(this.formDataJson, `formData${generateId()}.json`)
    },

    handleFormChange (fieldName, newValue, oldValue, formModel) {
      console.log('formModel', formModel)
      /*
      console.log('---formChange start---')
      console.log('fieldName', fieldName)
      console.log('newValue', newValue)
      console.log('oldValue', oldValue)
      console.log('formModel', formModel)
      console.log('---formChange end---')
      */
    },

    testOnAppendButtonClick (clickedWidget) {
      console.log('test', clickedWidget)
    },

    testOnButtonClick (button) {
      console.log('test', button)
    },

    testDTSC (dt, s1, s2) {
      console.log('test----', dt)
      console.log('test-----', s1)
      console.log('test------', s2)
    },
  }
}
</script>

<style lang="scss" scoped>
div.toolbar-container {
  //min-width: 728px;  /* 解决工具按钮栏换行的问题 */
  /* 上一行css有问题，当窗口宽度不足时会把按钮挤出到右边的属性设置区，弃之！ */
}

.left-toolbar {
  float: left;
  font-size: 16px;
}

.right-toolbar {
  text-align: right;
  overflow: hidden;

  .right-toolbar-con {
    text-align: left;
    display: inline-block;
  }

  ::v-deep .el-button--text {
    font-size: 14px !important;
  }
}

.el-button i {
  margin-right: 3px;
}

.small-padding-dialog {
  ::v-deep .el-dialog__header {
    //padding-top: 3px;
    //padding-bottom: 3px;
    background: #f1f2f3;
  }

  ::v-deep .el-dialog__body {
    padding: 12px 15px 12px 15px;

    .el-alert.alert-padding {
      padding: 0 10px;
    }
  }

  ::v-deep .ace-container {
    border: 1px solid #DCDFE6;
  }
}

.dialog-title-light-bg {
  ::v-deep .el-dialog__header {
    background: #f1f2f3;
  }
}

.no-box-shadow {
  box-shadow: none;
}

.no-padding.el-tabs--border-card {
  ::v-deep .el-tabs__content {
    padding: 0;
  }
}

.form-render-wrapper {
  //height: calc(100vh - 142px);
  //all: revert !important; /* 防止表单继承el-dialog等外部样式，未生效，原因不明？？ */
}

.form-render-wrapper.h5-layout {
  margin: 0 auto;
  width: 420px;
  border-radius: 15px;
  //border-width: 10px;
  box-shadow: 0 0 1px 10px #495060;
  height: calc(100vh - 142px);
  overflow-y: auto;
  overflow-x: hidden;
}

.form-render-wrapper.pad-layout {
  margin: 0 auto;
  width: 960px;
  border-radius: 15px;
  //border-width: 10px;
  box-shadow: 0 0 1px 10px #495060;
  height: calc(100vh - 142px);
  overflow-y: auto;
  overflow-x: hidden;
}

.node-tree-drawer ::v-deep {
  .el-drawer {
    padding: 10px;
    overflow: auto;
  }

  .el-drawer__header {
    margin-bottom: 12px;
    padding: 5px 5px 0;
  }

  .el-drawer__body {
    padding-left: 5px;
  }
}

/*.node-tree-scroll-bar {*/
/*  height: 100%;*/
/*  overflow: auto;*/
/*}*/

.node-tree ::v-deep {
  .el-tree>.el-tree-node:after {
    border-top: none;
  }

  .el-tree-node {
    position: relative;
    padding-left: 12px;
  }

  .el-tree-node__content {
    padding-left: 0 !important;
  }

  .el-tree-node__expand-icon.is-leaf {
    display: none;
  }

  .el-tree-node__children {
    padding-left: 12px;
    overflow: visible !important;
    /* 加入此行让el-tree宽度自动撑开，超出宽度el-draw自动出现水平滚动条！ */
  }

  .el-tree-node :last-child:before {
    height: 38px;
  }

  .el-tree>.el-tree-node:before {
    border-left: none;
  }

  .el-tree>.el-tree-node:after {
    border-top: none;
  }

  .el-tree-node:before {
    content: "";
    left: -4px;
    position: absolute;
    right: auto;
    border-width: 1px;
  }

  .el-tree-node:after {
    content: "";
    left: -4px;
    position: absolute;
    right: auto;
    border-width: 1px;
  }

  .el-tree-node:before {
    border-left: 1px dashed #4386c6;
    bottom: 0px;
    height: 100%;
    top: -10px;
    width: 1px;
  }

  .el-tree-node:after {
    border-top: 1px dashed #4386c6;
    height: 20px;
    top: 12px;
    width: 16px;
  }

  .el-tree-node.is-current>.el-tree-node__content {
    background: #c2d6ea !important;
  }

  .el-tree-node__expand-icon {
    margin-left: -3px;
    padding: 6px 6px 6px 0px;
    font-size: 16px;
  }

}
</style>
