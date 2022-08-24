import { useContext, useEffect, useState } from "react";
import { LoadingContext } from "../contexts/loading.context";

export const useAsync = ({ deps = [], service, condition = true }) => {
  const [_, setLoadingState] = useContext(LoadingContext);
  const [state, setState] = useState();
  useEffect(() => {
    if (condition) {
      fetchData();
    }
  }, deps);
  const fetchData = async () => {
    setLoadingState({ isLoading: true });
    //Call API
    const result = await service();
    setLoadingState({ isLoading: false });
    setState(result.data.content);
  };
  return { state };
};
