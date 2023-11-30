<template>
  <div  class="icon-font">
    <div class="icon">
      <img src="../../../assets/images/qingjiaaply.png"/>
      <p>供应商评价</p>
    </div>
    <div class="icon">
      <img src="../../../assets/images/qingjiaaply.png"/>
      <p>系统设置</p>
    </div>
    <div class="icon">
      <img src="../../../assets/images/qingjiaaply.png"/>
      <p>流程设置</p>
    </div>
    <!-- <div class="icon">
      <img src="../../../assets/images/qingjiaaply.png"/>
      <p>供应商评价</p>
    </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, unref } from 'vue';
export default defineComponent({
  components: {
  },
  setup() {
    
  }
})
</script>
<style lang="less" scoped>
.icon-font {
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  .icon {
    text-align: center;
    margin-right: 25px;
    >img {
      width: 50px;
      height: 50px;
      margin: auto;
    }
    > p {
      padding: 5px 0;
    }
  }
}
</style>