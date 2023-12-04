<template>
  <BasicModal wrapClassName="selector-body" v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <div class="selected-items">
      <Tag v-for="item in selectedList" color="processing" closable @close="removeSelectedItem(item.id)">{{item.userName}}</Tag>
    </div>
    <PageWrapper dense contentClass="flex" >
      <OrgTree class="w-1/4 xl:w-3/10" @select="handleSelect" v-if="!isShowDeptCode"/>
      <!-- <DeptTree class="w-1/4 xl:w-3/10" @select="handleSelect" v-if="!isShowDeptCode"/> -->
      <BasicTable @register="registerTable" @selection-change="selectionChanged" @row-click="rowClick" :class="{'w-3/4':!isShowDeptCode, 'xl:w-7/10':!isShowDeptCode}">
      </BasicTable>
    </PageWrapper>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, computed, ref, onMounted, nextTick } from 'vue';
  import { BasicModal, useModal, useModalInner } from '/src/components/Modal';
  import { BasicTable, useTable, TableAction } from '/src/components/Table';
  import { getPersonalPageList } from '/@/api/org/personal';
  import { PageWrapper } from '/src/components/Page';
  // import DeptTree from '/@/views/components/leftTree/DeptTree.vue';
  import OrgTree from '/src/views/components/leftTree/OrgTree.vue';
  import { Button, Tag } from 'ant-design-vue';
  import { columns, searchFormSchema } from './personal.data';

  export default defineComponent({
    props: {
      title: {
        type: String,
        default: '人员选择'
      },
    },
    name: 'PersonalSelector',
    components: {
      BasicModal, BasicTable, PageWrapper,
      OrgTree,
      // DeptTree,
      TableAction, Tag
    },
    setup(_, { emit }) {
      let isShowDeptCode = ref(false);
      const selectedList = ref([]);
      const multiSelect = ref<boolean>(false);
      // const [registerModal] = useModal();
      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        const {selectorProps,queryParams} = data;
        isShowDeptCode.value = queryParams.deptId ? true : false
        // 加载已选中项
        console.log(selectorProps.selectedList);
        selectedList.value = selectorProps.selectedList;
        multiSelect.value = selectorProps.multiSelect;
        setSelectedRowKeys(selectedList.value.map(item=>item.id));
        setProps({
          rowSelection:{
            type: selectorProps.multiSelect?'checkbox':'radio',
            columnWidth: 30,
          },
          searchInfo:queryParams,
        });
        setModalProps({
          wrapClassName: 'selector-content'
        });
        reload();
      });

      // 给表单元素添加回车事件
      searchFormSchema.forEach((item: object)=>{
        if(item){
          item['componentProps']['onkeypress'] = (e)=>{
            if(e.keyCode === 13){
              reload();
            }
          }
        }
      });

      const [registerTable, { reload, setProps, getSelectRows, setSelectedRowKeys }] = useTable({
        title: '',
        api: getPersonalPageList,
        columns,
        immediate: false,
        rowSelection: {
          type: 'checkbox',
          columnWidth: 30,
        },
        formConfig: {
          labelWidth: 60,
          schemas: searchFormSchema,
          showResetButton: false,
          showAdvancedButton: false,
          autoSubmitOnEnter: true,
        },
        searchInfo: {
          status:1
        },
        clickToRowSelect: true,
        rowKey: 'id',
        size: 'small',
        canResize: false,
        useSearchForm: true,
        showTableSetting: false,
        showIndexColumn: false,
        bordered: true,
        scroll: { y: 280}
      });

      const getTitle = computed(() => ("选择人员"));

      function handleSuccess() {
        reload();
      }

      function removeSelectedItem(id) {
        selectedList.value.splice(selectedList.value.findIndex((item: any)=>item.id===id), 1)
        setSelectedRowKeys(selectedList.value.map((item: any)=>item.id));
      }

      // checkbox/radio选择
      function selectionChanged({rows}) {
        selectedList.value = rows.map(item=>{return {id: item.id, userName: item.userName}});
      }

      // 行点击
      function rowClick() {
        selectionChanged({rows: getSelectRows()});
      }

      function handleSubmit() {
        const selectedRows = getSelectRows();
        emit('success', selectedRows);
        closeModal();
      }

      // 选择树
      // TODO
      function handleSelect(node:any) {
        let searchInfo = {};
        if(node&&node.deptCode){
          searchInfo = {deptId: node.id};
        }else{
          searchInfo = {companyId: node.id};
        }
        setProps({ searchInfo })
        reload({ searchInfo });
      }

      return {
        isShowDeptCode,
        registerTable,
        registerModal,
        getTitle,
        selectedList,
        removeSelectedItem,
        rowClick,
        selectionChanged,
        handleSubmit,
        handleSuccess,
        handleSelect,
      };
    },
  });
</script>

<style lang="less">
  .selector-body {
    .scroll-container {
      .scrollbar__wrap{
        margin-bottom: 0!important;
        padding: 10px 0px;
      }
    }
    .ant-modal-content{
      .scrollbar{
        padding: 0;
        margin: 0;
      }
      .vben-page-wrapper-content{
        >div{
          padding: 0;
        }
      }
      .vben-basic-table-form-container {
        .ant-form{
          margin-bottom: 0;
        }
      }
      .org-tree{
        .scrollbar__wrap{
          height: 365px;
        }
      }
    }
    .ant-modal {
      .scrollbar{
        margin: 0;
        padding: 0 6px;
      }
    }
    .org-tree{
      margin-top: 10px;
      margin-left: 10px;
    }

    .selected-items{
      overflow-y: auto;
      margin: 0 10px 0;
      border: 1px dashed #ccc;
      padding: 4px 4px 0;
      min-height: 34px;
      max-height: 60px;
      .ant-tag{
        margin-bottom: 4px;
      }
    }
    .vben-basic-table {
      .ant-table-wrapper{
        padding-top:0;
      }
    }
  }

</style>
