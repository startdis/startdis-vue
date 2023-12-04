<template>
  <div class="company-tree bg-white m-4 mr-0 overflow-hidden" v-loading="treeLoading">
    <BasicTree
      title="公司"
      toolbar
      search
      :clickRowToExpand="false"
      :treeData="treeData"
      :replaceFields="{ key: 'id', title: 'companyName' }"
      @select="handleSelect"
      ref="basicTreeRef"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref, unref, nextTick } from 'vue';
  import {Spin} from "ant-design-vue";
  import { BasicTree, TreeActionType, TreeItem } from '/src/components/Tree';
  import { getCompanies } from '/@/api/org/company';
  import {findNode} from "/src/utils/helper/treeHelper";

  export default defineComponent({
    name: 'CompanyTree',
    components: { BasicTree, Spin },

    emits: ['select'],
    setup(_, { emit }) {
      const treeData = ref<TreeItem[]>([]);
      const treeLoading = ref<boolean>(false);
      const basicTreeRef = ref<Nullable<TreeActionType>>(null);

      async function fetch() {
        treeLoading.value = true;
        getCompanies({status:1}).then(res => {
          treeData.value = (res as unknown) as TreeItem[];
          // console.log(treeData.value,'treeData.value');
          
          nextTick(() => {
            // 加载后展开节层级
            if(unref(treeData).length < 10){
              unref(basicTreeRef)?.filterByLevel(1);
            }
          });
        }).finally(()=>{
          treeLoading.value = false;
        });
      }

      function handleSelect(keys: string, e) {
        const node = findNode(treeData.value, (item)=>item.id===keys[0], {id: 'id', pid:'parentId', children:'children'})
        emit('select', node);
      }

      onMounted(() => {
        fetch();
      });
      return { treeData, treeLoading, basicTreeRef, handleSelect };
    },
  });
</script>
