//#region src/rules/vue.d.ts
/**
 * Vue SFC 本地覆写规则。
 * 上游 `flat/recommended` 已覆盖基础正确性，这里只记录项目取舍与附加约束。
 */
declare const vueRules: {
  "vue/no-v-html": "warn";
  "vue/require-default-prop": "off";
  "vue/require-explicit-emits": "error";
  "vue/multi-word-component-names": "off";
  "vue/prefer-import-from-vue": "warn";
  "vue/no-dupe-keys": "error";
  "vue/no-mutating-props": "error";
  "vue/no-reserved-component-names": "error";
  "vue/no-v-text-v-html-on-component": "error";
  "vue/custom-event-name-casing": ["error", "camelCase"];
  "vue/one-component-per-file": "off";
  "vue/attributes-order": ["error", {
    order: ("DEFINITION" | "LIST_RENDERING" | "CONDITIONALS" | "RENDER_MODIFIERS" | "GLOBAL" | "UNIQUE" | "OTHER_ATTR" | "EVENTS" | "CONTENT")[];
  }];
};
//#endregion
export { vueRules };
//# sourceMappingURL=vue.d.mts.map