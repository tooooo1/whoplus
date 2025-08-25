export const STORAGE_KEY = {
  POWER: 'power',
  ROUND: 'round',
  NAME: 'name',
} as const;

export const ROUTES = {
  HOME: '/',
  READY: '/ready',
  MODE: '/mode',
  PLAY_DEMENTIA: '/play/dementia',
  PLAY_BRAIN: '/play/brain',
  END: '/end',
} as const;

export const GAME_CONFIG = {
  MAX_ROUND: 70,
  INITIAL_TIMES: {
    DEMENTIA: 4,
    BRAIN: 2,
  },
  TIMEOUTS: {
    NEXT_ROUND: 1000,
    SCORE_ANIMATION: 100,
  },
  DIFFICULTY: {
    BASE: 10,
    SCALING_FACTOR: 10,
  },
} as const;

export const GAME_STATUS = {
  DEFAULT: 'default',
  CORRECT: 'correct',
  WRONG: 'wrong',
} as const;

export type GameStatus = (typeof GAME_STATUS)[keyof typeof GAME_STATUS];
export type GameMode = 'Dementia' | 'Brain';

export const GAME_INDICATORS = {
  CORRECT: '🟢',
  WRONG: '🔴',
} as const;

export const GAME_COLORS = {
  STATUS: {
    DEFAULT: '#000000',
    CORRECT: '#1bb749',
    WRONG: '#ff2e35',
  },
  BACKGROUND: {
    DEFAULT: '#f4f4f4',
    CORRECT: '#c0f2cd',
    WRONG: '#ffd2d7',
  },
} as const;
