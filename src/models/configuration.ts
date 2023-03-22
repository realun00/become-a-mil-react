//Shuffle the answers
export const shuffleAnswers = function (arr: string[]) {
  return arr.sort(() => Math.random() - 0.5);
};
