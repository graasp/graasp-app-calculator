export type ValueOf<T> = T[keyof T];

export type TrigonometryValue = number | string;

export interface SpecialCase {
  [angle: number]: TrigonometryValue;
}

export type SpecialCases = {
  [key in 'tan' | 'sin' | 'cos']: SpecialCase;
};
