import config from "../api/config";

import axios from "../api/axios";
import {useCallback } from "react";

const useServices = () => {
  /*----------------------*/
  /*    Questions CALLS   */
  /*----------------------*/
  const getQuestions = useCallback(async ({ amount = 5, difficulty }: { amount?: number; difficulty: string }) => {
    return await axios.get(config.getQuestions(amount, difficulty));
  }, []);

  return { getQuestions };
};

export default useServices;
