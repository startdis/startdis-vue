<template>
  <div class="org-tree bg-white m-4 mr-0 overflow-hidden" v-loading="treeLoading">
    <BasicTree
      title="组织"
      toolbar
      search
      :clickRowToExpand="false"
      :treeData="treeData"
      :replaceFields="{ key: 'id', title: 'shortName' }"
      @select="handleSelect"
      ref="basicTreeRef"
      :load-data="onLoadData"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref, unref, nextTick } from 'vue';
  import {Spin} from "ant-design-vue";
  import { BasicTree, TreeActionType, TreeItem } from '/src/components/Tree';
  import { companyTree } from '/@/api/org/company';
  import { getDeptsTree } from '/@/api/org/dept';

  export default defineComponent({
    name: 'OrgTree',
    components: { BasicTree, Spin },

    emits: ['select'],
    setup(_, { emit }) {
      const treeData = ref<TreeItem[]>([]);
      const treeLoading = ref<boolean>(false);
      const basicTreeRef = ref<Nullable<TreeActionType>>(null);

      async function fetch() {
        treeLoading.value = true;
        companyTree({status:1}).then(res => {
          treeData.value = (res as unknown) as TreeItem[];
          // nextTick(() => {
          //   // 加载后展开节层级
          //   if(unref(treeData).length < 10){
          //     unref(basicTreeRef)?.filterByLevel(1);
          //   }
          // });
        }).finally(()=>{
          treeLoading.value = false;
        });
      }
      function handleSelect(keys: string, e) {
        const asyncTreeAction: TreeActionType | null = unref(basicTreeRef);
        if (asyncTreeAction) {
          const data = asyncTreeAction.getSelectedNode(keys[0]);
          emit('select', data);
        }
      }
      async function onLoadData(treeNode) {
        return new Promise((resolve: (value?: unknown) => void) => {
          // if (!treeNode.children) {
          //   resolve();
          //   return;
          // }
          // 通过公司id去获取部门列表
          console.log(treeNode, 'treeNode');
          let params = {
            companyId: null,
            parentId:null
          }
          if (treeNode.deptCode) {
            const asyncTreeAction: TreeActionType | null = unref(basicTreeRef);
            if (asyncTreeAction) {
              asyncTreeAction.setExpandedKeys([
                treeNode.eventKey,
                ...asyncTreeAction.getExpandedKeys(),
              ]);
            }
            resolve();
            return;
          } else {
            params.companyId = treeNode.id
            getDeptsTree(params).then(deptData => {
              const asyncTreeAction: TreeActionType | null = unref(basicTreeRef);
              if (asyncTreeAction) {
                const nodeChildren = deptData
                asyncTreeAction.insertNodesByKey({
                  parentKey: treeNode.eventKey,
                  list: nodeChildren,
                  node: {
                    key: 'id',
                    title: 'deptName'
                  }
                });
                asyncTreeAction.setExpandedKeys([
                  treeNode.eventKey,
                  ...asyncTreeAction.getExpandedKeys(),
                ]);
              }
              resolve();
              return;
            })
          }
        });
      }
      onMounted(() => {
        fetch();
      });
      return { treeData, treeLoading, basicTreeRef, handleSelect ,onLoadData};
    },
  });
</script>
