export const STORAGE_KEY = {
  POWER: 'power',
  ROUND: 'round',
  NAME: 'name',
};

export const ROUTES = {
  HOME: '/',
  READY: '/ready',
  MODE: '/mode',
  PLAY_DEMENTIA: '/play/dementia',
  PLAY_BRAIN: '/play/brain',
  END: '/end',
} as const;

export const INITIAL_TIMES = {
  DEMENTIA: 4,
  BRAIN: 2,
};
export const MAX_ROUND = 70;
