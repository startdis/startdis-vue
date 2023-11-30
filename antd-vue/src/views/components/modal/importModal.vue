<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <div>
      第一步：下载Excel模板。<br/>
      第二步：向Excel模板中添加数据。 (注意：不能改变模板中的栏目及格式)<br/>
      第三步：点击下面的按钮，选择添加好数据的Excel文件进行导入。<br/>
      <div class="pt-4">
      <Upload :file-list="fileList" :max-count="1" :before-upload="beforeUpload" @remove="handleRemove">
        <Button>
          <UploadOutlined/>
          选择文件
        </Button>
      </Upload>
      <Button
      class="mt-4"
        type="primary"
        :disabled="fileList.length === 0"
        :loading="uploading"
        style="margin-top: 16px"
        @click="handleUpload"
      >
        {{ uploading ? '导入中...' : '开始导入' }}
      </Button>
    </div>
    </div>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  // import { ImportTemplate } from '/@/api/product/productcatalog.ts';
import type { UploadProps } from 'ant-design-vue';
  import { Upload,Button} from 'ant-design-vue';
import { useMessage } from '/@/hooks/web/useMessage';
import { UploadOutlined } from '@ant-design/icons-vue';
  const { createMessage } = useMessage();
  export default defineComponent({
    name: 'JobGradeTypeModal',
    components: { BasicModal,Upload,Button ,UploadOutlined},
    emits: ['success', 'register'],
    props: {
      title: {
        type: String,
        default:''
      },
      ImportTemplateApi: {
        type: Function,
        default:''
      }
    },
    setup(props, { emit }) {
      const fileList = ref<UploadProps['fileList']>([]);
      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        fileList.value = []
        setModalProps({ confirmLoading: false });
      });
      const uploading = ref<boolean>(false);

      const getTitle = computed(() => (props.title));
      async function handleSubmit() {
        closeModal();
      }

      const handleRemove: UploadProps['onRemove'] = file => {
        const index = fileList.value.indexOf(file);
        const newFileList = fileList.value.slice();
        newFileList.splice(index, 1);
        fileList.value = newFileList;
      };

      const beforeUpload: UploadProps['beforeUpload'] = file => {
        try {
          if (fileList.value.length == 1) {
            createMessage.error("只支持上传一个文件！");
            return false;
          }
          const isExcel =
            file.type ===
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
            file.type === 'xlsx' ||
            file.type === 'application/vnd.ms-excel'
          if (!isExcel) {
            createMessage.error("只支持上传excel文件！");
            return false;
          }
          const isLt2M = file.size / 1024 / 1024 < 10;
          if (!isLt2M) {
            createMessage.error("不能大于10MB！");
            return false;
          }
          fileList.value = [...(fileList.value || []), file];
          return false
        } catch (error) {
          return false;
        }
      };

      const handleUpload = async () => {
        try {
          uploading.value = true;
          const formData = new FormData();
          formData.append('multipartFile', fileList.value[0])
          const api = props.ImportTemplateApi
          api(formData).then(res => {
            uploading.value = false;
            closeModal();
            emit('success');
          }).catch(e => {
            uploading.value = false;
          })
        } catch (error) {
        }
      };
      return { registerModal,handleUpload,uploading, handleRemove,beforeUpload,fileList, getTitle, handleSubmit };
    },
  });
</script>
