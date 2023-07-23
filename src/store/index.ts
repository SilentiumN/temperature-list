import { defineStore } from 'pinia';
import {
  computed, ref, Ref, watch,
} from 'vue';
import type { TemperatureId, TemperatureList, TemperatureValue } from '@/types/temperature';

export default defineStore('counter', () => {
  // definition for a list of temperature values
  const temperatureList: Ref<TemperatureList> = ref(new Map());

  // function to get value from list of temperature values by id
  function getTemperatureValueById(id: TemperatureId): TemperatureValue | null {
    return temperatureList.value.get(id) || null;
  }

  // function to set new value in list of temperature values
  function addNewTemperature(value: TemperatureValue['value']): void {
    // generating uniq id
    const id = Math.floor(Math.random() * Date.now())
      .toString(16) as string;

    // writing new value in list of temperature values
    temperatureList.value.set(id, {
      value,
      timestamp: new Date().getTime(),
    });
  }

  // function to edit value in list of temperatures values
  function editTemperatureById(id: TemperatureId, value: TemperatureValue['value']): void {
    // checking for the existence of a value in a list of temperature values
    const currentVariable = getTemperatureValueById(id) as TemperatureValue | null;

    // changing the value if it exists in the list of temperature values
    if (currentVariable) {
      temperatureList.value.set(id, {
        ...currentVariable,
        value,
      });
    }
  }

  // function to delete value in list of temperatures values
  function deleteTemperatureById(id: TemperatureId): void {
    // checking for the existence of a value in a list of temperature values
    const currentVariable = getTemperatureValueById(id) as TemperatureValue | null;

    // deleting the value if it exists in the list of temperature values
    if (currentVariable) {
      temperatureList.value.delete(id);
    }
  }

  // sorting values by timestamp
  const descSortMap = computed(():TemperatureList => new Map(
    [...temperatureList.value.entries()]
      .sort((a, b) => b[1].timestamp - a[1].timestamp),
  ));

  // function to setting list of temperatures values in localStorage
  function setLocalTemp(): void {
    localStorage.setItem('temperatureList', JSON.stringify(Array.from(temperatureList.value.entries())));
  }

  // function to getting list of temperatures values from localStorage
  function getLocalTemp(): void {
    // checking for the existence of list of temperature values in localStorage
    const tempListStr = localStorage.getItem('temperatureList') as string | null;

    // getting the list of temperature values from localStorage
    // and writing in temperatureList variable
    if (tempListStr) {
      temperatureList.value = new Map(JSON.parse(tempListStr));
    }
  }

  // setting list of temperatures values in localStorage when him update
  watch(temperatureList, () => {
    setLocalTemp();
  }, {
    deep: true,
  });

  // export store
  return {
    addNewTemperature,
    editTemperatureById,
    deleteTemperatureById,
    descSortMap,
    getTemperatureValueById,
    getLocalTemp,
  };
});
