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
        console.log(val, 'dynamic-table-item');
        if (dom && val) {
          dom.style.height = formatterWidthOrHeightStyle(val);
        }
      },
    },
  },
};
