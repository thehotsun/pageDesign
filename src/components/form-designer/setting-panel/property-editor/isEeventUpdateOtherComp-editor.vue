<template>
  <el-form-item label="触发关联组件更新">
    <el-switch v-model="optionModel.readonly"></el-switch>
  </el-form-item>
</template>

<script>

export default {
  name: "isEeventUpdateOtherComp-editor",
  props: {
    designer: Object,
    selectedWidget: Object,
    optionModel: Object,
  },
}
</script>

<style scoped></style>
