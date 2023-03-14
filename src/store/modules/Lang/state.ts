
export type State = {
  lang: string;
}

export const state: State = {
  lang: window.localStorage.getItem('language') || 'en'
};
