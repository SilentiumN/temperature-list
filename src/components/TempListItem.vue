<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
import IconSet from '@/components/IconSet.vue';
import type { TemperatureId, TemperatureValue } from '@/types/temperature';

// props type
interface Props {
  tempItemId: TemperatureId;
  tempItemValue: TemperatureValue;
}

// definition emits
const emit = defineEmits<{
  onDelete: []
  onEdit: []
}>();

// set vue props from props type
const props = defineProps<Props>();
</script>

<template>
  <!-- TEMPERATURE LIST ITEM -->
  <div
    class="temp-list-item"
  >
    <!-- TEMPERATURE LIST ITEM VALUE -->
    <div>
      {{`ID: ${props.tempItemId}\nЗначение: ${props.tempItemValue.value}`}}
    </div>
    <!-- TEMPERATURE LIST ITEM ACTIONS -->
    <button
      type="button"
      class="btn btn_transparent"
      @click="emit('onEdit')"
    >
      <IconSet size="24" name="pen" />
    </button>
    <button
      type="button"
      class="btn btn_transparent"
      @click="emit('onDelete')"
    >
      <IconSet size="24" name="trash" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
  @import "src/assets/styles/mixins";

  .temp-list-item {
    justify-content: space-between;
    padding: 16px;
    border-radius: 8px;
    align-items: center;
    display: grid;
    grid-template-columns: 1fr repeat(2, max-content);
    gap: 8px;
    @include box-shadow-primary();
  }
</style>
