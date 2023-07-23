<script lang="ts" setup>
import { defineExpose, Ref, ref } from 'vue';

// option type for modal confirm window
interface OptionModalConfirmWindow {
  onSubmitText: string;
  onCancelText: string;
  message: string;
  title: string;
  onSubmit: (() => void) | null;
  onCancel: (() => void) | null;
}

// definition of a variable for the options of the modal confirmation window
const option: Ref<OptionModalConfirmWindow> = ref({
  onSubmitText: 'Подтвердить',
  onCancelText: 'Отмена',
  message: '',
  title: 'Вы хотите подтвердить текущее действие?',
  onSubmit: null,
  onCancel: null,
});

// defining a variable to display the dialog
const isShowDialog: Ref<boolean> = ref(false);

// function to open a dialog and update the options of the modal confirmation window
const open = (updateOptionObj: Partial<OptionModalConfirmWindow>): void => {
  option.value = {
    ...option.value,
    ...updateOptionObj,
  };

  isShowDialog.value = true;
};

// function for confirm event of the modal confirmation window
const confirm = (): void => {
  if (option.value.onSubmit) {
    option.value.onSubmit();
  }

  isShowDialog.value = false;
};

// function for cancel event of the modal confirmation window
const cancel = (): void => {
  if (option.value.onCancel) {
    option.value.onCancel();
  }

  isShowDialog.value = false;
};

// export function from component
defineExpose({
  open,
});
</script>

<template>
  <!-- MODAL CONFIRM WINDOW WRAPPER-->
  <div
    v-if="isShowDialog"
    class="modal-confirm-window"
    @keyup.esc="cancel"
  >
    <!-- MODAL CONFIRM WINDOW DIALOG -->
    <div
      v-on-click-outside="cancel"
      class="modal-confirm-window__dialog"
    >
      <!-- MODAL CONFIRM WINDOW DIALOG TITLE -->
      <div
        class="modal-confirm-window__title"
      >
        {{ option.title }}
      </div>
      <!-- MODAL CONFIRM WINDOW DIALOG MESSAGE -->
      <div
        v-if="option.message"
        class="modal-confirm-window__message"
      >
        {{ option.message }}
      </div>
      <!-- MODAL CONFIRM WINDOW DIALOG ACTIONS -->
      <div
        class="modal-confirm-window__actions"
      >
        <button
          type="button"
          class="btn btn_purple modal-confirm-window__btn"
          @click="confirm"
        >
          {{ option.onSubmitText }}
        </button>
        <button
          type="button"
          class="btn btn_white modal-confirm-window__btn"
          @click="cancel"
        >
          {{ option.onCancelText }}
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "src/assets/styles/variables";
  @import "src/assets/styles/mixins";

  .modal-confirm-window {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    right: 0;
    backdrop-filter: blur(4px);
    bottom: 0;
    padding: 16px;

    &__dialog {
      background-color: $white;
      width: 100%;
      max-width: 300px;
      display: grid;
      gap: 16px;
      text-align: center;
      padding: 16px;
      word-break: break-word;
      @include box-shadow-primary();
    }

    &__title {
      font-size: 16px;
      font-weight: 700;
    }

    &__message {
      font-size: 14px;
      font-weight: 300;
    }

    &__actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__btn {
      max-width: calc((100% / 2) - 16px);
    }
  }
</style>
