import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import {Tag} from "ant-design-vue";
import {h} from 'vue'
import {FormValidPatternEnum} from "/@/enums/constantEnum";

export const columns: BasicColumn[] = [
  {
    title: '用户编码',
    dataIndex: 'userCode',
    width: 150,
    align: 'left'
  },
  {
    title: '用户名称',
    dataIndex: 'userName',
    width: 150,
    align: 'left'
  },
  {
    title: '联系电话',
    dataIndex: 'mobile',
    width: 150,
    align: 'left'
  },
  {
    title: '所属部门',
    dataIndex: 'deptName',
    width: 120,
    align: 'left'
  }
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'userName',
    label: '用户名称',
    component: 'Input',
    labelWidth: 60,
    colProps: {span: 12, lg:{span: 12, offset:0}, sm:{span: 10, offset: 0}, xs:{span: 16, offset: 0}},
  },
];

export const accountFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    required: false,
    component: 'Input',
    show: false,
  },
  {
    field: 'name',
    label: '姓名',
    component: 'Input',
    required: true,
    rules: [
      {
        required: true,
        whitespace: true,
        message: '姓名不能为空！',
      },
      {
        max: 20,
        message: '字符长度不能大于20！',
      },
    ],
  },
  {
    field: 'code',
    label: '工号',
    component: 'Input',
    required: true,
    rules: [
      {
        required: true,
        whitespace: true,
        message: '工号不能为空！',
      },
      {
        pattern: new RegExp(FormValidPatternEnum.SN),
        type: 'string',
        message: '请输入英文或数字！',
      },
      {
        max: 32,
        message: '字符长度不能大于32！',
      },
    ],
  },
  {
    field: 'sex',
    label: '性别',
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '男', value: 1 },
        { label: '女', value: 0 },
      ],
    },
  },
  {
    field: 'companyId',
    label: '所属公司',
    component: 'TreeSelect',
    componentProps: {
      replaceFields: {
        title: 'companyName',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
    required: true,
  },
  {
    field: 'deptId',
    label: '所属部门',
    component: 'TreeSelect',
    componentProps: {
      replaceFields: {
        title: 'name',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
    required: true,
  },
  {
    label: '手机',
    field: 'mobile',
    component: 'Input',
    required: true,
    rules: [
      {
        required: true,
        whitespace: true,
        message: '手机不能为空！',
      },
      {
        pattern: new RegExp('^((13[0-9])|(14[5-9])|(15[0-3])|(15[5-9])|(166)|(17[0-8])|(18[0-9])|(19[8-9]))\\d{8}$'),
        type: 'string',
        message: '请输入正确的手机号！',
      },
      {
        max: 32,
        message: '字符长度不能大于32！',
      },
    ],
  },
  {
    label: '邮箱',
    field: 'email',
    component: 'Input',
    rules: [
      {
        pattern: new RegExp('^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$'),
        type: 'string',
        message: '请输入正确的邮箱地址！',
      },
      {
        max: 256,
        message: '字符长度不能大于256！',
      },
    ],
  },
  {
    label: '地址',
    field: 'address',
    component: 'InputTextArea',
    rules: [
      {
        max: 400,
        message: '字符长度不能大于400！',
      },
    ],
  },
];
