import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/index.scss';
import '@/iconfont/iconfont.css';
import './icons';
import './components/page-designer/form-widget/container-widget/index.js';

// import pageRender from '@/components/page-render/index';

// Vue.component('pageRender', pageRender);
Vue.use(ElementUI, { size: 'small' });
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
