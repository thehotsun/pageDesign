<template>
  <el-form-item :label="i18nt('designer.setting.drawSize')">
    <el-input type="text" v-model="optionModel.size"></el-input>
  </el-form-item>
</template>

<script>
import i18n from "@/utils/i18n"
import propertyMixin from "./propertyMixin";

export default {
  name: "vf-drawer-size-editor",
  mixins: [i18n, propertyMixin],
  props: {
    designer: Object,
    selectedWidget: Object,
    optionModel: Object,
  },
}
</script>

<style scoped></style>
