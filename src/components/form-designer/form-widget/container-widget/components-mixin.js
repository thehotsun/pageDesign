import dynamicFormItem from './dynamic-form-widget.vue';
import dynamicTableItem from './dynamic-table-widget.vue';
import FieldComponents from '@/components/form-designer/form-widget/field-widget/index';
export default {
  components: {
    'dynamic-form-widget': dynamicFormItem,
    'dynamic-table-widget': dynamicTableItem,
    ...FieldComponents,
  },
};
