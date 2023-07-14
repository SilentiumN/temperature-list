<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
import type { TemperatureId, TemperatureValue } from '@/types/temperature';
import IconSet from '@/components/IconSet.vue';

interface Props {
  tempItemId: TemperatureId;
  tempItemValue: TemperatureValue;
}

const emit = defineEmits<{(e: 'onDelete'): void
  (e: 'onEdit'): void
}>();

const props = defineProps<Props>();
</script>

<template>
  <div
    class="temp-list-item"
  >
    <div>
      {{`ID: ${props.tempItemId}\nЗначение: ${props.tempItemValue.value}`}}
    </div>
    <button
      class="btn btn_transparent"
      @click="emit('onEdit')"
    >
      <IconSet size="24" name="pen"/>
    </button>
    <button
      class="btn btn_transparent"
      @click="emit('onDelete')"
    >
      <IconSet size="24" name="trash"/>
    </button>
  </div>
</template>

<style lang="scss" scoped src="../assets/styles/components/temp-list-item.scss"/>
