<template>
  <BasicModal wrapClassName="selector-body" v-bind="$attrs" @register="registerModal" :title="getTitle"
    @ok="handleSubmit">
    <PageWrapper dense contentClass="flex">
      <BasicTable @register="registerTable"> </BasicTable>
    </PageWrapper>
  </BasicModal>
</template>
<script lang="ts">
import { defineComponent, computed, ref, watch, onMounted } from 'vue';
import { BasicModal, useModalInner } from '/src/components/Modal';
import { BasicTable, useTable, TableAction } from '/src/components/Table';
import { BasicForm, useForm } from '/src/components/Form';
// import { getDeptsTree } from '/@/api/business/dept';
import { getDeptsTree } from '/@/api/org/dept';
import { PageWrapper } from '/src/components/Page';

import { columns, searchFormSchema } from './dept.data';

export default defineComponent({
  name: 'RoleSelector',
  components: { BasicModal, BasicForm, BasicTable, PageWrapper, TableAction },

  setup(_, { emit }) {
    let personalId = '';
    // const [registerModal] = useModal();
    const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
      const {selectorProps,rowSelection} = data;
      setProps({
        rowSelection:{
          type: selectorProps.multiSelect?'checkbox':'radio',
          columnWidth: 30,
          closeOnchange: true,
          ...rowSelection
        }
      });
      setModalProps({
        wrapClassName: 'selector-content',
      });
      setSelectedRowKeys(data.id);
    });

    const [registerTable, { reload, setProps,getSelectRows, setSelectedRowKeys, setColumns }] = useTable({
      title: '',
      api: getDeptsTree,
      immediate: true,
      columns,
      rowKey: 'id',
      searchInfo: {
        status: 1,
      },
      formConfig: {
        labelWidth: 60,
        schemas: searchFormSchema,
        showResetButton: false,
        showAdvancedButton: false,
        autoSubmitOnEnter: true,
      },
      size: 'small',
      canResize: false,
      pagination:false,
      useSearchForm: true,
      showTableSetting: false,
      showIndexColumn: false,
      bordered: true,
      scroll: { y: 300 },
    });

    const getTitle = computed(() => '选择部门');

    // onMounted(async() => {
    //   const params = {
    //     pageNum: 1,
    //     pageSize: 10,
    //     status: 1
    //   }
    //   const res = await getUserListByPage(params);
    //   setColumns(res)
    // });

    function handleSuccess() {
      reload();
    }

    function handleSubmit() {
      const selectedRows = getSelectRows();
      emit('success', selectedRows);
      closeModal();
    }

    function handleSelect(node: any) {
      let searchInfo = { companyId: node ? node.id : '', personalId };
      reload({ searchInfo });
    }

    return {
      registerTable,
      registerModal,
      getTitle,
      handleSubmit,
      handleSuccess,
      handleSelect,
    };
  },
});
</script>

<style lang="less">
.selector-body {
  .ant-modal-content {
    .scrollbar {
      padding: 0;
      margin: 0;
    }

    .vben-page-wrapper-content {
      >div {
        padding: 0;
      }
    }

    .vben-basic-table-form-container {
      .ant-form {
        margin-bottom: 0;
      }
    }

    .company-tree {
      .vben-basic-tree {
        height: 400px;
      }
    }
  }

  .ant-modal {
    .scrollbar {
      margin: 0;
      padding: 0;
    }
  }

  .company-tree {
    margin-top: 10px;
    margin-left: 10px;
  }
}
</style>
