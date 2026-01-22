import { keyframes } from '@emotion/react';

export const shake = keyframes`
  0% {
    transform: translate(0px, 120px) rotate(0deg) scale(6);
  }
  10% {
    transform: translate(-1px, -2px) rotate(-1deg) scale(5);
  }
  20% {
    transform: translate(-3px, 0px) rotate(1deg) scale(3);
  }
  30% {
    transform: translate(3px, 2px) rotate(0deg);
  }
  40% {
    transform: translate(1px, -1px) rotate(1deg) scale(1.4);
  }
  50% {
    transform: translate(-1px, 2px) rotate(-1deg);
  }
  60% {
    transform: translate(-3px, 1px) rotate(0deg);
  }
  70% {
    transform: translate(3px, 1px) rotate(-1deg);
  }
  80% {
    transform: translate(-1px, -1px) rotate(1deg);
  }
  90% {
    transform: translate(1px, 2px) rotate(0deg);
  }
  100% {
    transform: translate(1px, -2px) rotate(-1deg);
  }
`;

export const bounce = keyframes`
  0% {
    transform: scale(1);
  }
  40% {
    transform: scale(0.4);
  }
  60% {
    transform: scale(1);
  }
  80% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(1);
  }
`;
