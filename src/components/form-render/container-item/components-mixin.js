import dynamicFormItem from './dynamic-form-item.vue';
import dynamicTableItem from './dynamic-table-item.vue';
import FieldComponents from '@/components/form-designer/form-widget/field-widget/index';
import localCodeItem from './local-code-item.vue';
export default {
  components: {
    'dynamic-form-item': dynamicFormItem,
    'dynamic-table-item': dynamicTableItem,
    'local-code-item': localCodeItem,
    ...FieldComponents,
  },
};
