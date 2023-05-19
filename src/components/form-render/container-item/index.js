import Vue from 'vue';
import dynamicFormItem from './dynamic-form-item.vue';
import dynamicTableItem from './dynamic-table-item.vue';
import gridItem from './grid-item.vue';
import gridColItem from './grid-col-item.vue';

const requireComponent = [
  dynamicFormItem,
  dynamicTableItem,
  gridItem,
  gridColItem,
];

requireComponent.map((comp) => {
  Vue.component(comp.name, comp);
});
