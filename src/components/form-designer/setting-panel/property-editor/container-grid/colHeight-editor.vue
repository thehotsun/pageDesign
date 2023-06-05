<template>
  <div>
    <el-form-item label="栅格列统一高度(px或%)">
      <span slot="label">栅格列统一高度
        <el-tooltip effect="light" content="如只输入数字则默认单位为px，也可输入百分比">
          <i class="el-icon-info"></i></el-tooltip>
      </span>
      <el-input v-model="optionModel.colHeight" class="hide-spin-button"></el-input>
    </el-form-item>
  </div>
</template>

<script>
import i18n from "@/utils/i18n"
import propertyMixin from "@/components/form-designer/setting-panel/property-editor/propertyMixin"

export default {
  name: "colHeight-editor",
  mixins: [i18n, propertyMixin],
  props: {
    designer: Object,
    selectedWidget: Object,
    optionModel: Object,
  },

}
</script>

<style scoped></style>
