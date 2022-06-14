/* istanbul ignore next */
export interface ISettingsState {
  language: string;
  timerWillStop: number;
}

export const initialSettingsstate: ISettingsState = {
  language: 'EN',
  timerWillStop: 0,
}