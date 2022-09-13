import React from "react";

export const useInterval = (callback, delay, isActive) => {
  const cachedCallback = React.useRef();

  React.useEffect(() => {
    cachedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    if (delay !== 0 && isActive) {
      const id = setInterval(() => cachedCallback?.current?.(), delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
