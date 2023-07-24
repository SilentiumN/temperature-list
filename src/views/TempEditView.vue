<script lang="ts" setup>
import {
  computed, onBeforeMount, ref, Ref,
} from 'vue';
import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router';
import IconSet from '@/components/IconSet.vue';
import ModalConfirmWindow from '@/components/ModalConfirmWindow.vue';
import type { TemperatureValue } from '@/types/temperature';
import piniaStore from '@/store';

// definition vue-router and store
const store = piniaStore();
const route = useRoute();
const router = useRouter();

// definition temperature value and id
const tempValue: Ref<number | null> = ref(null);
const tempId: Ref<string> = ref('');
// determining if checking is needed before route leave
const isNeedCheckBeforeRouteLeave: Ref<boolean> = ref(true);
// definition reference for modal confirmation window
const modalConfirmWindow: Ref<InstanceType<typeof ModalConfirmWindow> | null> = ref(null);

// function to get value from list of temperature values by id
const getTemperatureValueById = (
  id: string,
): TemperatureValue | null => store.getTemperatureValueById(id);

// preparation of component before mount
onBeforeMount(() => {
  // getting temperature id from route params
  tempId.value = route.params.tempId.toString() || '' as string;

  // getting the temperature value if id exists in route params
  if (tempId.value) {
    const currentTemp = getTemperatureValueById(tempId.value) as TemperatureValue | null;
    tempValue.value = currentTemp?.value || null;
  }
});

// defining the text for the submit button
const onSubmitBtnText = computed(():string => {
  // if it is existing value
  if (tempId.value) {
    return 'Сохранить';
  }

  // if it is new value
  return 'Добавить';
});

// definition current temperature value from list of temperature values
const currentTemp = computed((): TemperatureValue | null => {
  if (tempId.value) {
    return getTemperatureValueById(tempId.value);
  }
  return null;
});

// defining disable state for the submit button
const isDisableSubmitBtn = computed(
  (): boolean => !tempValue.value,
);

// defining disable state for the delete button
const isDisableDeleteBtn = computed(
  (): boolean => !tempId.value || !currentTemp.value,
);

// function to go to main page
const goToMainPage = (): void => {
  router.push('/');
};

// function to set new value in list of temperature values
const addNewTemp = (value: number): void => {
  store.addNewTemperature(value);
};

// function to edit value in list of temperatures values
const editTemp = (id: string, value: number): void => {
  store.editTemperatureById(id, value);
};

// function to delete value in list of temperatures values
const deleteTemp = (id: string): void => {
  store.deleteTemperatureById(id);
};

// function to open confirmation window for deleting value from list of temperatures values
const onDeleteBtn = (): void => {
  if (tempId.value && currentTemp.value && modalConfirmWindow.value) {
    modalConfirmWindow.value.open({
      title: `Вы уверены, что хотите удалить показатель ${tempId.value}?`,
      message: 'Удаленный показатель нельзя будет вернуть!',
      onSubmitText: 'Удалить',
      onCancelText: 'Отмена',
      onSubmit: () => {
        deleteTemp(tempId.value);
        goToMainPage();
      },
    });
  }
};

// getting the function of the submit event depending
// on whether the variable is new or existing
const onSubmit = (): void => {
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

// function for cancel event
const onCancelBtn = (): void => {
  goToMainPage();
};

// checking unsaved changes
const isExistUnsavedChanges = (): boolean => (
  tempId.value && currentTemp.value && currentTemp.value.value !== tempValue.value)
  || (!tempId.value && typeof tempValue.value === 'number');

onBeforeRouteLeave((to, from, next) => {
  // checking unsaved changes
  const unsavedChanges = isExistUnsavedChanges() as boolean;

  // open confirmation window if needed confirm leaving
  if (isNeedCheckBeforeRouteLeave.value && unsavedChanges && modalConfirmWindow.value) {
    modalConfirmWindow.value.open({
      title: 'Вы уверены, что хотите покинуть страницу?',
      message: 'Внесенные изменение не сохраняться',
      onSubmitText: 'Подтвердить',
      onCancelText: 'Отмена',
      onSubmit: () => {
        isNeedCheckBeforeRouteLeave.value = false;
        router.push(`${to.fullPath}`);
      },
    });
    return;
  }

  // if not needed confirm - change route
  next();
});
</script>

<template>
  <!-- TEMPERATURE EDIT PAGE -->
  <div
    class="temp-edit-view container"
  >
    <!-- TEMPERATURE EDIT FIELDS -->
    <div
      class="temp-edit-view__fields"
    >
      <!-- TEMPERATURE EDIT INPUT -->
      <div
        class="temp-edit-view__input-wrapper"
      >
        <label for="temp">
          <input
            v-model="tempValue"
            class="input"
            name="temp"
            placeholder="Введите значение..."
            type="number"
          >
        </label>
      </div>
      <!-- TEMPERATURE EDIT DELETE BUTTON -->
      <button
        :disabled="isDisableDeleteBtn"
        class="btn btn_transparent"
        type="button"
        @click="onDeleteBtn"
      >
        <IconSet name="trash" size="24" />
      </button>
    </div>
    <!-- TEMPERATURE EDIT FIELDS -->
    <div
      class="temp-edit-view__fields"
    >
      <!-- TEMPERATURE EDIT ACTIONS -->
      <button
        :disabled="isDisableSubmitBtn"
        class="btn btn_purple"
        type="button"
        @click="onSubmit"
      >
        {{ onSubmitBtnText }}
      </button>
      <button
        class="btn btn_white"
        type="button"
        @click="onCancelBtn"
      >
        Отмена
      </button>
    </div>
    <!-- MODAL CONFIRMATION WINDOW IN TEMPERATURE EDIT PAGE -->
    <ModalConfirmWindow
      ref="modalConfirmWindow"
    />
  </div>
</template>

<style lang="scss" scoped>
  .temp-edit-view {
    display: flex;
    flex-direction: column;
    gap: 16px;

    &__fields {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
    }

    &__input-wrapper {
      width: 100%;
      max-width: 300px;
    }
  }
</style>
