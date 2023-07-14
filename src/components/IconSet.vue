<script lang="ts" setup>
import { computed, defineProps } from 'vue';

interface Props {
  size: string;
  name: string;
  color?: string;
}

const props = defineProps<Props>();

const currentColor = computed(() => {
  if (props.color) {
    return props.color;
  }
  return 'currentColor';
});
</script>

<template>
<span
  :style="{
    color: currentColor,
  }"
>
  <svg
    v-if="props.name === 'trash'"
    :height="size"
    :width="size"
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20.5001 6H3.5"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-width="1.5"
    />
    <path
      d="M9.5 11L10 16"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-width="1.5"
    />
    <path
      d="M14.5 11L14 16"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-width="1.5"
    />
    <path
      d="M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922
      4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708
      8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213
      3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03
       3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257
       4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674
       5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6"
      stroke="currentColor"
      stroke-width="1.5"
    />
    <path
      d="M18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21
      12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054
      5.62669 15.3991L5.16675 8.5M18.8334 8.5L18.6334 11.5"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-width="1.5"
    />
  </svg>
  <svg
    v-if="props.name === 'pen'"
    xmlns="http://www.w3.org/2000/svg"
    :height="size"
    :width="size"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M14.3601 4.07866L15.2869 3.15178C16.8226 1.61607 19.3125 1.61607 20.8482 3.15178C22.3839
      4.68748 22.3839 7.17735 20.8482 8.71306L19.9213 9.63993M14.3601 4.07866C14.3601 4.07866
      14.4759 6.04828 16.2138 7.78618C17.9517 9.52407 19.9213 9.63993 19.9213 9.63993M14.3601
      4.07866L12 6.43872M19.9213 9.63993L14.6607 14.9006L11.5613 18L11.4001 18.1612C10.8229
      18.7383 10.5344 19.0269 10.2162 19.2751C9.84082 19.5679 9.43469 19.8189 9.00498 20.0237C8.6407
      20.1973 8.25352 20.3263 7.47918 20.5844L4.19792 21.6782M4.19792 21.6782L3.39584
      21.9456C3.01478 22.0726 2.59466 21.9734 2.31063 21.6894C2.0266 21.4053 1.92743 20.9852 2.05445
      20.6042L2.32181 19.8021M4.19792 21.6782L2.32181 19.8021M2.32181 19.8021L3.41556
      16.5208C3.67368 15.7465 3.80273 15.3593 3.97634 14.995C4.18114 14.5653 4.43213 14.1592 4.7249
      13.7838C4.97308 13.4656 5.26166 13.1771 5.83882 12.5999L8.5 9.93872"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
    />
  </svg>
</span>
</template>

<style scoped>

</style>
