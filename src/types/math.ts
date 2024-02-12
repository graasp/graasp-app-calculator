export type ValueOf<T> = T[keyof T];

export type TrigonometryValue = number | string;

export interface SpecialCase {
  [angle: number]: TrigonometryValue;
}

export interface SpecialCases {
  tan: SpecialCase;
  sin: SpecialCase;
  cos: SpecialCase;
}
