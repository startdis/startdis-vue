import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
export const columns: BasicColumn[] = [
  {
    title: '部门编码',
    dataIndex: 'deptCode',
    width: 150,
    align: 'left',
  },
  {
    title: '部门名称',
    dataIndex: 'deptName',
    align: 'left',
  },
  {
    title: '部门领导',
    dataIndex: 'leaderUserName',
    width: 150,
    align: 'left',
    customRender: ({ record }) => {
      return record.leaderUserId?`${record.leaderUserName||''}[${record.leaderUserCode}]`:'未设置';
    },
  },
  // {
  //   title: '所属公司',
  //   dataIndex: 'companyName',
  //   width: 120,
  //   align: 'left',
  // },
  // {
  //   title: '状态',
  //   dataIndex: 'status',
  //   width: 80,
  //   customRender: ({ record }) => {
  //     const status = record.status;
  //     const enable = ~~status === 1;
  //     const color = enable ? 'green' : 'red';
  //     const text = enable ? '启用' : '停用';
  //     return h(Tag, { color: color }, () => text);
  //   },
  // },
  // {
  //   title: '排序号',
  //   dataIndex: 'deptSort',
  //   align: 'left',
  //   width: 80,
  // },
  // {
  //   title: '创建时间',
  //   dataIndex: 'createdAt',
  //   width: 180,
  // }
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'deptName',
    label: '部门名称',
    component: 'Input',
    componentProps: {
      placeholder: '请输入部门名称',
    },
    labelWidth: 60,
    colProps: {span: 6, lg:{span: 8, offset:0}, sm:{span: 14, offset: 0}, xs:{span: 16, offset: 0}},
  },
];

export const deptFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    required: false,
    component: 'Input',
    show: false,
  },
  {
    field: 'parentId',
    label: 'parentId',
    required: false,
    component: 'Input',
    show: false,
  },
  {
    field: 'deptName',
    label: '名称',
    component: 'Input',
    required: true,
    rules: [
      {
        required: true,
        whitespace: true,
        message: '名称不能为空！',
      },
      {
        max: 100,
        message: '字符长度不能大于100！',
      },
    ],
    colProps: { span: 24 },
  },
  {
    field: 'deptCode',
    label: '编码',
    component: 'Input',
    required: true,
    colProps: { span: 24 },
  },
  {
    field: 'leaderUserId',
    label: '部门领导',
    component: 'Input',
    slot: 'settingLeader',
    required: false,
    colProps: { span: 24 },
  },
  {
    field: 'leaderUserName',
    label: '部门领导',
    component: 'Input',
    show: false,
  },
  {
    field: 'leaderUserCode',
    label: '组织领导',
    component: 'Input',
    show: false,
  },
  {
    field: 'companyId',
    label: '所属公司',
    component: 'TreeSelect',
    componentProps: {
      treeNodeFilterProp: 'companyName',
      replaceFields: {
        title: 'companyName',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
    required: true,
    colProps: { span: 24 },
  },
  {
    field: 'companyName',
    label: '公司名称',
    required: false,
    component: 'Input',
    show: false,
  },
  {
    field: 'deptSort',
    label: '排序号',
    required: false,
    component: 'InputNumber',
  },
  {
    field: 'status',
    label: '状态',
    required: false,
    component: 'Switch',
    defaultValue: true,
    componentProps:{
      checkedChildren: '启用',
      unCheckedChildren: '禁用'
    },
    colProps: { span: 24 },
  },
  // {
  //   label: '备注',
  //   field: 'note',
  //   component: 'InputTextArea',
  //   rules: [
  //     {
  //       max: 256,
  //       message: '字符长度不能大于256！',
  //     },
  //   ],
  //   colProps: { span: 24 },
  // },
];
