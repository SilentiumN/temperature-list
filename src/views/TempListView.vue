<script lang="ts" setup>
import { computed, ref, Ref } from 'vue';
import { useRouter } from 'vue-router';
import TempListItem from '@/components/TempListItem.vue';
import ModalConfirmWindow from '@/components/ModalConfirmWindow.vue';
import piniaStore from '@/store';
import type { TemperatureList } from '@/types/temperature';

// definition vue-router and store
const router = useRouter();
const store = piniaStore();

// definition reference for modal confirmation window
const modalConfirmWindow: Ref<InstanceType<typeof ModalConfirmWindow>|null> = ref(null);

// definition list of temperature values from store
const tempList = computed(():TemperatureList => store.descSortMap);

// function to delete value in list of temperatures values
const deleteTemp = (id: string): void => {
  store.deleteTemperatureById(id);
};

// function to go to edit page
const onEdit = (id: string): void => {
  router.push(`/edit/${id}`);
};

// function to open confirmation window for deleting value from list of temperatures values
const onDelete = (id: string): void => {
  if (modalConfirmWindow.value) {
    modalConfirmWindow.value.open({
      title: `Вы уверены, что хотите удалить показатель ${id}?`,
      message: 'Удаленный показатель нельзя будет вернуть!',
      onSubmitText: 'Удалить',
      onCancelText: 'Отмена',
      onSubmit: () => deleteTemp(id),
    });
  }
};
</script>

<template>
  <!-- TEMPERATURE LIST PAGE -->
  <div
    class="temp-list-view"
  >
    <!-- TEMPERATURE LIST FILLED -->
    <div
      class="temp-list-view__list"
      v-if="tempList.size"
    >
      <TempListItem
        v-for="[tempItemKey, tempItemVal] in tempList"
        :key="tempItemKey"
        :temp-item-id="tempItemKey"
        :temp-item-value="tempItemVal"
        @onDelete="onDelete(tempItemKey)"
        @onEdit="onEdit(tempItemKey)"
      />
    </div>
    <!-- TEMPERATURE LIST EMPTY -->
    <div
      v-else
      class="temp-list-view__empty"
    >
      Вы еще не добавили ни одного значения
    </div>
    <!-- MODAL CONFIRMATION WINDOW IN TEMPERATURE LIST PAGE -->
    <ModalConfirmWindow
      ref="modalConfirmWindow"
    />
  </div>
</template>

<style lang="scss" scoped>
  .temp-list-view {
    &__list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    &__empty {
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 300;
      font-size: 16px;
    }
  }
</style>
