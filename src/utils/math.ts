import { GAME_CONFIG } from '../constants';

export const getRandomNumber = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const calculateDifficulty = (round: number): number =>
  GAME_CONFIG.DIFFICULTY.BASE **
  Math.floor((round - 1) / GAME_CONFIG.DIFFICULTY.SCALING_FACTOR + 1);

export const generateNumbers = (
  round: number,
): { first: number; second: number } => {
  const difficulty = calculateDifficulty(round);
  const min = difficulty / GAME_CONFIG.DIFFICULTY.SCALING_FACTOR;
  const max = difficulty;

  return {
    first: getRandomNumber(min, max),
    second: getRandomNumber(min, max),
  };
};

export const calculateScore = (
  currentPower: number,
  first: number,
  second: number,
  round: number,
): number => {
  const difficulty = calculateDifficulty(round);
  return currentPower + Math.floor(first + second / difficulty);
};
