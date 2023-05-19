import Vue from 'vue'

// const requireComponent = require.context('./', false, /\w+\.vue$/)

/**
 * 容器组件时递归组件，且内部可以嵌套其他容器，局部注册会找不到组件，必须注册为全局组件，原因不明？！
 * begin
 *
let comps = {}

requireComponent.keys().map(fileName => {
  let comp = requireComponent(fileName).default;
  comps[comp.name] = comp
})

export default comps;

end */

/* 全局注册！！ */
// requireComponent.keys().map(fileName => {
//   let comp = requireComponent(fileName).default;
// })
import gird from "./grid-widget.vue"
import girdCol from "./grid-col-widget.vue"
import dynamicFormWidget from './dynamic-form-widget.vue'
import dynamicTableWidget from './dynamic-table-widget.vue';
Vue.component(dynamicFormWidget.name, dynamicFormWidget);
Vue.component(dynamicTableWidget.name, dynamicTableWidget);
Vue.component(gird.name, gird);
Vue.component(girdCol.name, girdCol);
