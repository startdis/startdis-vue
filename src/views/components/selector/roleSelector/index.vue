<template>
  <BasicModal
    wrapClassName="selector-body"
    v-bind="$attrs"
    @register="registerModal"
    :title="getTitle"
    @ok="handleSubmit"
  >
    <PageWrapper dense contentClass="flex">
      <!-- <CompanyTree class="w-1/4 xl:w-3/10" @select="handleSelect" /> -->
      <BasicTable @register="registerTable"> </BasicTable>
    </PageWrapper>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, computed, ref, watch } from 'vue';
  import { BasicModal, useModalInner } from '/src/components/Modal';
  import { BasicTable, useTable, TableAction } from '/src/components/Table';
  import { BasicForm, useForm } from '/src/components/Form';
  import { getRoleListByPage } from '/@/api/org/role';
  import { PageWrapper } from '/src/components/Page';
  import CompanyTree from '/src/views/components/leftTree/CompanyTree.vue';

  import { columns, searchFormSchema } from './roleSelector.data';

  export default defineComponent({
    name: 'RoleSelector',
    components: { BasicModal, BasicForm, BasicTable, PageWrapper, CompanyTree, TableAction },

    setup(_, { emit }) {
      let personalId = '';
      // const [registerModal] = useModal();
      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        setModalProps({
          wrapClassName: 'selector-content',
        });
        setSelectedRowKeys([data.roleId]);
      });

      const [registerTable, { reload, getSelectRows, setSelectedRowKeys }] = useTable({
        title: '',
        api: getRoleListByPage,
        immediate: true,
        columns,
        rowKey: 'id',
        rowSelection: {
          type: 'radio',
          columnWidth: 30,
        },
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
        useSearchForm: true,
        showTableSetting: false,
        showIndexColumn: false,
        bordered: true,
        scroll: { y: 300 },
      });

      const getTitle = computed(() => '选择角色');

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
        > div {
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
