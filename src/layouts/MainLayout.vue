<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router';
import { computed, onBeforeMount } from 'vue';
import piniaStore from '@/store';

const store = piniaStore();
const route = useRoute();
const router = useRouter();
const goToEditPage = ():void => {
  router.push('/edit');
};

const goToMainPage = ():void => {
  router.push('/');
};

const optionsNavBtn = computed(() => {
  if (route.name === 'main') {
    return {
      text: 'Добавить переменную',
      onClick: () => goToEditPage(),
    };
  }
  return {
    text: 'Показатели',
    onClick: () => goToMainPage(),
  };
});

const getLocalTemp = () => {
  store.getLocalTemp();
};

onBeforeMount(() => {
  getLocalTemp();
});
</script>

<template>
  <div
    class="main-layout"
  >
    <div
      class="main-layout__bar"
    >
      <button
        class="btn btn_white"
        @click="optionsNavBtn.onClick"
      >
        {{ optionsNavBtn.text }}
      </button>
    </div>
    <div
      class="main-layout__content"
    >
      <router-view/>
    </div>
  </div>
</template>

<style lang="scss" scoped src="../assets/styles/layouts/main-layout.scss"/>
