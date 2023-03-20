const apiCalls = {
  getQuestions: (amount: number, difficulty: string) => `?amount=${amount}&difficulty=${difficulty}&type=multiple`,
};

export default apiCalls;
