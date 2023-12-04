<template>
  <div class="left-tree bg-white m-4 mr-0" v-loading="treeLoading">
    <BasicTree
      title="业务组织"
      toolbar
      search
      :clickRowToExpand="false"
      :treeData="treeData"
      :replaceFields="{ key: 'id', title: 'deptName' }"
      @select="handleSelect"
      ref="basicTreeRef"
      class="scrollbar__wrap"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref, unref, nextTick } from 'vue';
  import {Spin} from "ant-design-vue";
  import { BasicTree, TreeActionType, TreeItem } from '/src/components/Tree';
  import { getDeptsTree } from '/@/api/business/dept';
  import {findNode} from "/src/utils/helper/treeHelper";

  export default defineComponent({
    name: 'DeptTree',
    components: { BasicTree, Spin },

    emits: ['select'],
    setup(_, { emit }) {
      const treeData = ref<TreeItem[]>([]);
      const treeLoading = ref<boolean>(false);
      const basicTreeRef = ref<Nullable<TreeActionType>>(null);

      async function fetch() {
        treeLoading.value = true;
        getDeptsTree().then(res => {
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
<style lang="less" scoped>
.left-tree {
    /deep/ .ant-tree .ant-tree-node-content-wrapper.ant-tree-node-selected {
      background-color: rgba(83, 109, 254, 0.18);
      color: #536dfe;
    }
    /deep/ .ant-tree-switcher {
      display: none;
    }
    .scrollbar__wrap{
      overflow-y: scroll;
    }
  }
</style>
