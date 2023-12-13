<template>
  <div v-loading="loading">
    <iframe id="iframeA" :src="VITE_GLOB_SSO_URL+'/#/postMeaasge'" style="display: none;"></iframe>
  </div>
</template>
<script lang="ts" setup>
import { getAppEnvConfig } from '/@/utils/env';
import { useRoute } from 'vue-router'
import { onMounted, nextTick } from 'vue'
import { useUserStoreWithOut } from '/@/store/modules/user';
import { useAppStoreWithOut } from '/@/store/modules/app';
const userStore = useUserStoreWithOut();
const {
  VITE_GLOB_SSO_URL,
  VITE_GLOB_APP_CODE
} = getAppEnvConfig();
let loading = true
const { query } = useRoute()
const redirectUrl = encodeURIComponent(`${window.location.origin}/#/authLogin`)
  const authUrl: string = `${VITE_GLOB_SSO_URL}/#/login?appCode=${VITE_GLOB_APP_CODE}&state=state&redirectUrl=${redirectUrl}`
  const logoutUrl: string = `${VITE_GLOB_SSO_URL}/#/login?loginType=logout&appCode=${VITE_GLOB_APP_CODE}&state=state&redirectUrl=${redirectUrl}`
  console.log(authUrl, VITE_GLOB_SSO_URL, 'authUrl');
  onMounted( () => {
    nextTick(async ()=> {
      // // 这里使用非匿名函数，目的时为了在下一次点击的时候注册事件能够覆盖，避免多次执行
      // window.addEventListener("message", handle, false); 
      // function handle(event) {
      //   // 主域名有token 就可以
      //   if (event.data.type == 'token' && event.data.data) {
      //     window.localStorage.setItem('X-ACCESS-TOKEN', event.data.data)
      //     userStore.setToken(event.data.data)
      //     userStore.afterLoginAction(false)
      //   } else {
      //     window.location.replace(authUrl)
      //   }
      // }
      console.log('query',query)
      // return
      if (query.token || (query.code && query.state)) {
        try {
          const token = await userStore.getTokenByCode({
            code:query.code,
            state: query.state,
            token:query.token
          })
          loading = false
        } catch (error) {
          loading = false
          window.location.replace(logoutUrl)
        }
        // 更新主域名token
        // if (token) {
        //   let send = document.getElementById("iframeA").contentWindow;
        //   send.postMessage(token, "*");
        // } else {
        //   let send = document.getElementById("iframeA").contentWindow;
        //   userStore.setToken(undefined)
        //   send.postMessage('', "*");
        // }
        
      } else {
        loading = false
        window.location.replace(authUrl)
      }
    })
  })
</script>
