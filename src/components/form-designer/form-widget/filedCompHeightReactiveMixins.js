import { formatterWidthOrHeightStyle } from '@/utils/util';
export default {
  computed: {
    colHeight() {
      return this.widget.options.colHeight;
    },
  },
  watch: {
    colHeight: {
      immediate: true,
      async handler(val) {
        await this.$nextTick();
        const dom = this.$refs.elCol?.$el;
        if (dom) {
          if (val) {
            dom.style.height = formatterWidthOrHeightStyle(val);
            dom.childNodes[0].style.height = '100%';
          } else {
            dom.childNodes[0].style.height = dom.style.height = '';
          }
        }
      },
    },
  },
};
