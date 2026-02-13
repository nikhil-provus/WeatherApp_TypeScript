export enum TempUnit {
  Celsius = "C",
  Fahrenheit = "F",
}
export const convertTemp = (valueC: number, unit: TempUnit): number =>
  unit === TempUnit.Celsius ? valueC : Math.round(valueC * 9 / 5 + 32);