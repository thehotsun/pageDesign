<template>
  <el-form-item>
    <span slot="label">{{ i18nt('designer.setting.eventUpdateOtherComp') }}
      <el-tooltip effect="light" :content="i18nt('designer.setting.eventUpdateOtherCompHelp')">
        <i class="el-icon-info"></i></el-tooltip>
    </span>
    <el-select v-model="optionModel.eventUpdateOtherComp" filterable clearable allow-create default-first-option multiple>
      <el-option v-for="(fv) in otherCompList" :key="fv.value" :label="fv.label" :value="fv.value">
      </el-option>
    </el-select>
  </el-form-item>
</template>

<script>
import i18n from "@/utils/i18n"

export default {
  name: "eventUpdateOtherComp-editor",
  mixins: [i18n],
  props: {
    designer: Object,
    selectedWidget: Object,
    optionModel: Object,
  },
  inject: ['getWidgetList'],
  data () {
    return {
    }
  },
  computed: {
    otherCompList () {
      const widgetList = this.flatten(this.getWidgetList() || []);
      console.log(widgetList, 'widgetList');
      const list = []
      widgetList?.map(item => {
        if (/^(dynamictable|dynamicform).*/g.test(item.id)) {
          if (item.id !== this.selectedWidget.id) {
            list.push({
              value: item.id,
              label: `${item.priorName}(${item.id})`
            })
          }
        }
      })
      return list
    }
  },
  methods: {
    flatten (arr) {
      let result = [];
      for (let i = 0; i < arr.length; i++) {
        const item = arr[i]
        const children = item.cols || item.tabs || item.widgetList
        if (Array.isArray(children)) {
          result = result.concat(this.flatten(children));
        }
        // 否则直接加入结果数组
        else {
          result.push(arr[i]);
        }
      }
      return result;
    }

  }
}
</script>

<style scoped></style>
