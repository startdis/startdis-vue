import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import {Tag} from "ant-design-vue";
import {h} from 'vue'

export const columns: BasicColumn[] = [
  {
    title: '编号',
    dataIndex: 'userCode',
    width: 80,
    align: 'left'
  },
  {
    title: '姓名',
    dataIndex: 'userName',
    width: 80,
    align: 'left'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    width: 50,
    customRender: ({ record }) => {
      const status = record.sex;
      const enable = ~~status === 1;
      const color = enable ? 'green' : 'red';
      const text = enable ? '男' : '女';
      return h(Tag, { color: color }, () => text);
    },
  },
  // {
  //   title: '公司',
  //   dataIndex: 'companyName',
  //   width: 120,
  //   align: 'left'
  // },
  {
    title: '部门',
    dataIndex: 'deptName',
    width: 120,
    align: 'left'
  }
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'userName',
    label: '用户姓名',
    component: 'Input',
    labelWidth: 60,
    colProps: {span: 12, lg:{span: 12, offset:0}, sm:{span: 10, offset: 0}, xs:{span: 16, offset: 0}},
    componentProps:{

    },
  },
];
