import VFormDesigner from '@/components/form-designer/index.vue';
import VFormRender from '@/components/form-render/index.vue';
// loadExtension();



VFormDesigner.install = function (Vue, options) {
  Vue.component('pageDesigner', VFormDesigner);
};

VFormRender.install = function (Vue) {
  Vue.component('pageRender', VFormRender);
};

const install = (Vue, options) => {
  Vue.component('pageDesigner', VFormDesigner);
  Vue.component('pageRender', VFormRender);
};

if (typeof window !== 'undefined' && window.Vue) {
  /* script方式引入时主动调用install方法！！ */
  install(window.Vue);
}

export default {
  install,
  VFormDesigner,
  VFormRender,
};
