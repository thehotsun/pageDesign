import a1 from './container-data-table/data-table-customClass-editor.vue';

import a2 from './container-grid/colHeight-editor.vue';

import a3 from './container-grid/gutter-editor.vue';

import a4 from './container-grid-col/grid-col-offset-editor.vue';

import a5 from './container-grid-col/grid-col-pull-editor.vue';

import a6 from './container-grid-col/grid-col-push-editor.vue';

import a7 from './container-grid-col/grid-col-responsive-editor.vue';

import a8 from './container-grid-col/grid-col-span-editor.vue';
import a9 from './actionColumnPosition-editor.vue';

import a10 from './withCredentials-editor.vue';
import a11 from './validationHint-editor.vue';
import a12 from './validation-editor.vue';
import a13 from './uploadURL-editor.vue';
import a14 from './uploadTip-editor.vue';
import a15 from './type-editor.vue';
import a16 from './textAlign-editor.vue';
import a17 from './suffixIcon-editor.vue';
import a18 from './step-editor.vue';
import a19 from './startPlaceholder-editor.vue';
import a20 from './size-editor.vue';
import a21 from './showWordLimit-editor.vue';
import a22 from './showFileList-editor.vue';
import a24 from './rows-editor.vue';
import a23 from './requiredHint-editor.vue';
import a25 from './required-editor.vue';
import a26 from './remote-editor.vue';
import a27 from './readonly-editor.vue';
import a28 from './name-editor.vue';
import a29 from './labelWrap-editor.vue';
import a30 from './hidden-editor.vue';
import a31 from './customClass-editor.vue';
import a34 from './label-editor.vue';
import a32 from './container-tab/tab-customClass-editor.vue';
import a33 from './event-handler/onTabClick-editor.vue';

let comps = {};

[
  a34,
  a33,
  a32,
  a31,
  a1,
  a10,
  a11,
  a12,
  a13,
  a14,
  a15,
  a16,
  a17,
  a18,
  a19,
  a2,
  a20,
  a21,
  a22,
  a23,
  a24,
  a25,
  a26,
  a27,
  a28,
  a29,
  a3,
  a30,
  a4,
  a5,
  a6,
  a7,
  a8,
  a9,
].map((comp) => {
  comps[comp.name] = comp;
});

export default comps;
