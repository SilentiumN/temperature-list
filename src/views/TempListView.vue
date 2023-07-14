<script lang="ts" setup>
import piniaStore from '@/store';
import { computed, ref, Ref } from 'vue';
import type { TemperatureList } from '@/types/temperature';
import TempListItem from '@/components/TempListItem.vue';
import { useRouter } from 'vue-router';
import ModalConfirmWindow from '@/components/ModalConfirmWindow.vue';

const router = useRouter();
const store = piniaStore();

const modalConfirmWindow: Ref<InstanceType<typeof ModalConfirmWindow>|null> = ref(null);
const modalConfirmWindowOptions: Ref<{
  onSubmitText?: string;
  onCancelText?: string;
  message?: string;
  title?: string;
}> = ref({});

const tempList = computed(():TemperatureList => store.descSortMap);

const deleteTemp = (id: string) => {
  store.deleteTemperatureById(id);
};

const onEdit = (id: string) => {
  router.push(`/edit/${id}`);
};

const onDelete = async (id: string) => {
  modalConfirmWindowOptions.value = {
    title: `Вы уверены, что хотите удалить показатель ${id}?`,
    message: 'Удаленный показатель нельзя будет вернуть!',
    onSubmitText: 'Удалить',
    onCancelText: 'Отмена',
  };

  if (modalConfirmWindow.value && await modalConfirmWindow.value.open()) {
    deleteTemp(id);
  }
};
</script>

<template>
  <div
    class="temp-list-view"
  >
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
    <div
      v-else
      class="temp-list-view__empty"
    >
      Вы еще не добавили ни одного значения
    </div>
    <ModalConfirmWindow
      ref="modalConfirmWindow"
      v-bind="modalConfirmWindowOptions"
    />
  </div>
</template>

<style lang="scss" scoped src="../assets/styles/views/temp-list-view.scss"/>
