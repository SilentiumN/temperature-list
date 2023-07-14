export interface TemperatureValue {
  value: number;
  timestamp: number;
}

export type TemperatureId = string

export type TemperatureList = Map<TemperatureId, TemperatureValue>
