<script lang="ts" setup>
import {
  computed, defineProps, onBeforeMount, ref, Ref,
} from 'vue';
import type { TemperatureId, TemperatureValue } from '@/types/temperature';
import IconSet from '@/components/IconSet.vue';
import piniaStore from '@/store';
import { useRoute, useRouter, onBeforeRouteLeave } from 'vue-router';
import ModalConfirmWindow from '@/components/ModalConfirmWindow.vue';

const store = piniaStore();
const route = useRoute();
const router = useRouter();

const tempValue: Ref<number|null> = ref(null);
const tempId: Ref<string> = ref('');
const modalConfirmWindow: Ref<InstanceType<typeof ModalConfirmWindow>|null> = ref(null);
const modalConfirmWindowOptions: Ref<{
  onSubmitText?: string;
  onCancelText?: string;
  message?: string;
  title?: string;
}> = ref({});

const getTemperatureValueById = (
  id: string,
):TemperatureValue|null => store.getTemperatureValueById(id);

onBeforeMount(() => {
  tempId.value = route.params.tempId.toString() || '';

  if (tempId.value) {
    const currentTemp = getTemperatureValueById(tempId.value);
    tempValue.value = currentTemp?.value || null;
  }
});

const onSubmitBtnText = computed(() => {
  if (tempId.value) {
    return 'Сохранить';
  }
  return 'Добавить';
});

const currentTemp = computed(() => {
  if (tempId.value) {
    return getTemperatureValueById(tempId.value);
  }
  return null;
});

const isDisableSubmitBtn = computed(
  () => !tempValue.value,
);

const isDisableDeleteBtn = computed(
  () => !tempId.value || !currentTemp.value,
);

const goToMainPage = ():void => {
  router.push('/');
};

const addNewTemp = (value: number) => {
  store.addNewTemperature(value);
};

const editTemp = (id: string, value: number) => {
  store.editTemperatureById(id, value);
};

const deleteTemp = (id: string) => {
  store.deleteTemperatureById(id);
};

const onDeleteBtn = async () => {
  modalConfirmWindowOptions.value = {
    title: `Вы уверены, что хотите удалить показатель ${tempId.value}?`,
    message: 'Удаленный показатель нельзя будет вернуть!',
    onSubmitText: 'Удалить',
    onCancelText: 'Отмена',
  };

  if (tempId.value && currentTemp.value && await modalConfirmWindow.value.open()) {
    deleteTemp(tempId.value);
    goToMainPage();
  }
};
const onSubmit = () => {
  if (
    tempId.value
    && typeof tempValue.value === 'number'
    && currentTemp.value?.value
    && tempValue.value !== currentTemp.value?.value
  ) {
    editTemp(tempId.value, tempValue.value);
  } else if (!tempId.value && typeof tempValue.value === 'number') {
    addNewTemp(tempValue.value);
    tempValue.value = null;
  }
  goToMainPage();
};

const onCancelBtn = () => {
  goToMainPage();
};

const isExistUnsavedChanges = () => (
  tempId.value && currentTemp.value && currentTemp.value.value !== tempValue.value)
    || (!tempId.value && tempValue.value);

onBeforeRouteLeave(async (to, from, next) => {
  modalConfirmWindowOptions.value = {
    title: 'Вы уверены, что хотите покинуть страницу?',
    message: 'Внесенные изменение не сохраняться',
    onSubmitText: 'Подтвердить',
    onCancelText: 'Отмена',
  };

  const unsavedChanges = isExistUnsavedChanges();

  if (unsavedChanges && !await modalConfirmWindow.value.open()) {
    next(false);
  }
  next();
});
</script>

<template>
<div
  class="temp-edit-view container"
>
  <div
    class="temp-edit-view__fields"
  >
    <div
      class="temp-edit-view__input-wrapper"
    >
      <label for="temp">
        <input
          name="temp"
          class="input"
          v-model="tempValue"
          type="number"
          placeholder="Введите значение..."
        >
      </label>
    </div>
    <button
      class="btn btn_transparent"
      @click="onDeleteBtn"
      :disabled="isDisableDeleteBtn"
    >
      <IconSet size="24" name="trash"/>
    </button>
  </div>
  <div
    class="temp-edit-view__fields"
  >
    <button
      class="btn btn_purple"
      @click="onSubmit"
      :disabled="isDisableSubmitBtn"
    >
      {{ onSubmitBtnText }}
    </button>
    <button
      class="btn btn_white"
      @click="onCancelBtn"
    >
      Отмена
    </button>
  </div>
  <ModalConfirmWindow
    ref="modalConfirmWindow"
    v-bind="modalConfirmWindowOptions"
  />
</div>
</template>

<style lang="scss" scoped src="../assets/styles/views/temp-edit-view.scss"/>
