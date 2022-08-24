import { Spin } from "antd";
import { createContext, useEffect, useState } from "react";
import { WrapperSpin } from "./styled";

const DEFAULT_VALUE = {
  isLoading: false,
};
const LoadingContext = createContext(DEFAULT_VALUE);
const LoadingProvider = (props) => {
  const [state, setState] = useState(DEFAULT_VALUE);
  useEffect(() => {
    document.querySelector("body").style.overflow = state.isLoading
      ? "hidden"
      : "auto";
  }, [state.isLoading]);
  return (
    <LoadingContext.Provider value={[state, setState]}>
      {state.isLoading && (
        <WrapperSpin viewHeight="100vh">
          <Spin />
        </WrapperSpin>
      )}
      {props.children}
    </LoadingContext.Provider>
  );
};

export { LoadingContext, LoadingProvider };
