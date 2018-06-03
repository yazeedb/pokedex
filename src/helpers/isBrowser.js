/*
  snippet from https://30secondsofcode.org/utility#isbrowser
*/

export default () => ![typeof window, typeof document].includes('undefined');
