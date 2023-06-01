import VFormDesigner from '@/components/form-designer/index.vue';
import VFormRender from '@/components/form-render/index.vue';
// import { loadExtension } from '@/extension/extension-loader';
// import '@/utils/directive';

import '@/icons';
import '@/iconfont/iconfont.css';
// import i18n, { addENExtensionLang, addZHExtensionLang } from '@/utils/i18n';

// loadExtension();



VFormDesigner.install = function (Vue, options) {
  Vue.component('pageDesigner', VFormDesigner);
  // setProductInfo(Vue, options);
};

VFormRender.install = function (Vue) {
  Vue.component('pageRender', VFormRender);
};

const install = (Vue, options) => {
  Vue.component('pageDesigner', VFormDesigner);
  Vue.component('pageRender', VFormRender);
  // setProductInfo(Vue, options);
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
