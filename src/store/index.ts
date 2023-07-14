import { defineStore } from 'pinia';
import type { TemperatureId, TemperatureList, TemperatureValue } from '@/types/temperature';
import {
  computed, ref, Ref, watch,
} from 'vue';

export default defineStore('counter', () => {
  const temperatureList: Ref<TemperatureList> = ref(new Map());

  function getTemperatureValueById(id: TemperatureId): TemperatureValue | null {
    return temperatureList.value.get(id) || null;
  }

  function addNewTemperature(value: TemperatureValue['value']) {
    const id = Math.floor(Math.random() * Date.now())
      .toString(16);

    temperatureList.value.set(id, {
      value,
      timestamp: new Date().getTime(),
    });
  }

  function editTemperatureById(id: TemperatureId, value: TemperatureValue['value']) {
    const currentVariable = getTemperatureValueById(id);

    if (currentVariable) {
      temperatureList.value.set(id, {
        ...currentVariable,
        value,
      });
    }
  }

  function deleteTemperatureById(id: TemperatureId) {
    const currentVariable = getTemperatureValueById(id);
    if (currentVariable) {
      temperatureList.value.delete(id);
    }
  }

  const descSortMap = computed(() => new Map(
    [...temperatureList.value.entries()]
      .sort((a, b) => b[1].timestamp - a[1].timestamp),
  ));

  function setLocalTemp() {
    localStorage.setItem('temperatureList', JSON.stringify(Array.from(temperatureList.value.entries())));
  }

  function getLocalTemp() {
    const tempListStr = localStorage.getItem('temperatureList');

    if (tempListStr) {
      temperatureList.value = new Map(JSON.parse(tempListStr));
    }
  }

  watch(temperatureList, () => {
    setLocalTemp();
  }, {
    deep: true,
  });

  return {
    addNewTemperature,
    editTemperatureById,
    deleteTemperatureById,
    descSortMap,
    getTemperatureValueById,
    getLocalTemp,
  };
});
