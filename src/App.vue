<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import { computed, onBeforeMount } from 'vue';
import piniaStore from '@/store';

const store = piniaStore();
const route = useRoute();
const router = useRouter();

// function to go to edit page
const goToEditPage = (): void => {
  router.push('/edit');
};

// function to go to main page
const goToMainPage = (): void => {
  router.push('/');
};

// options for navigation button in navbar
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

// function to get values from localStorage
const getLocalTemp = () => {
  store.getLocalTemp();
};

// preparation of component before mount
onBeforeMount(() => {
  getLocalTemp();
});
</script>

<template>
  <!-- MAIN LAYOUT -->
  <div
    class="main-section"
  >
    <!-- MAIN LAYOUT BAR -->
    <div
      class="main-section__bar"
    >
      <button
        type="button"
        class="btn btn_white"
        @click="optionsNavBtn.onClick"
      >
        {{ optionsNavBtn.text }}
      </button>
    </div>
    <!-- MAIN LAYOUT CONTENT -->
    <div
      class="main-section__content"
    >
      <!-- ROUTER VIEW -->
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
  @import "src/assets/styles/variables";

  .main-section {
    width: 100%;
    height: 100%;
    display: grid;
    grid-auto-rows: max-content 1fr;

    &__bar {
      width: 100%;
      padding: 8px 16px;
      background-color: $primary;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      box-shadow: rgba(0, 0, 0, 0.1) 0 10px 25px;
    }

    &__content {
      width: 100%;
      height: 100%;
      padding: 16px;
      max-width: 960px;
      margin-left: auto;
      margin-right: auto;
    }
  }
</style>
