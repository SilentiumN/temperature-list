// type for temperature value
export interface TemperatureValue {
  value: number;
  timestamp: number;
}

// type for temperature id
export type TemperatureId = string

// type for temperature list
export type TemperatureList = Map<TemperatureId, TemperatureValue>
