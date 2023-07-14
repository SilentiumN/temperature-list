<script lang="ts" setup>
import {
  ref, Ref, defineExpose, defineProps, computed,
} from 'vue';

interface Props {
 onSubmitText?: string;
 onCancelText?: string;
 message?: string;
 title?: string;
}

const props = defineProps<Props>();

const isShowDialog: Ref<boolean> = ref(false);
// eslint-disable-next-line @typescript-eslint/no-empty-function
const resolvePromise: Ref<(value: unknown) => void|null> = ref(() => {});
// eslint-disable-next-line @typescript-eslint/no-empty-function
const rejectPromise: Ref<(reason?: never) => void> = ref(() => {});

const open = () => {
  isShowDialog.value = true;

  return new Promise((resolve, reject) => {
    resolvePromise.value = resolve;
    rejectPromise.value = reject;
  });
};

const confirm = async () => {
  resolvePromise.value(true);
  isShowDialog.value = false;
};

const cancel = async () => {
  resolvePromise.value(false);
  isShowDialog.value = false;
};

const computedTitle = computed(() => props.title || 'Вы уверены, что хотите подтвердить ваше действие?');
const computedSubmitBtnText = computed(() => props.onSubmitText || 'Подтвердить');
const computedCancelBtnText = computed(() => props.onCancelText || 'Отмена');

defineExpose({
  open,
});
</script>

<template>
<div
  class="modal-confirm-window"
  @keyup.esc="cancel"
  v-if="isShowDialog"
>
  <div
    v-on-click-outside="cancel"
    class="modal-confirm-window__dialog"
  >
    <div
      v-if="computedTitle"
      class="modal-confirm-window__title"
    >
      {{ computedTitle }}
    </div>
    <div
      class="modal-confirm-window__message"
      v-if="props.message"
    >
      {{ props.message }}
    </div>
    <div
      class="modal-confirm-window__actions"
    >
      <button
        class="btn btn_purple modal-confirm-window__btn"
        @click="confirm"
      >
        {{ computedSubmitBtnText }}
      </button>
      <button
        class="btn btn_white modal-confirm-window__btn"
        @click="cancel"
      >
        {{ computedCancelBtnText }}
      </button>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped src="../assets/styles/components/modal-confirm-window.scss"/>
