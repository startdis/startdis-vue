<template>
  <iframe id="iframeA" :src="VITE_GLOB_SSO_URL+'/#/postMeaasge'" style="display: none;"></iframe>
</template>
<script lang="ts" setup>
import { getAppEnvConfig } from '/src/utils/env';
import { useRoute } from 'vue-router'
// import { onMounted, nextTick } from 'vue'
// import { useUserStoreWithOut } from '/@/store/modules/user';
// const userStore = useUserStoreWithOut();
const {
  VITE_GLOB_SSO_URL,
  VITE_GLOB_APP_CODE
} = getAppEnvConfig();
const { query } = useRoute()
const redirectUrl = encodeURIComponent(`${window.location.origin}/#/authLogin`)
if (VITE_GLOB_SSO_URL && VITE_GLOB_APP_CODE) {
  const authUrl: string = `${VITE_GLOB_SSO_URL}/#/login`
  const logoutUrl: string = `${VITE_GLOB_SSO_URL}/#/login?loginType=logout`
  console.log(authUrl, VITE_GLOB_SSO_URL, 'authUrl');
  if (query.loginType === 'logout') {
    window.location.replace(logoutUrl)
  } else {
    window.location.replace(authUrl)
  }
    // onMounted(() => {
    //   nextTick(()=> {
    //     // 这里使用非匿名函数，目的时为了在下一次点击的时候注册事件能够覆盖，避免多次执行
    //     window.addEventListener("message", handle, false); 
    //     function handle(event) {
    //       // 主域名有token 就可以
    //       if (event.data.type == 'token' && event.data.data) {
    //         window.localStorage.setItem('X-ACCESS-TOKEN', event.data.data)
    //         userStore.setToken(event.data.data)
    //         userStore.afterLoginAction(false)
    //       } else {
    //         window.location.replace(authUrl)
    //       }
    //     }
    //   })
    // })
}
</script>
