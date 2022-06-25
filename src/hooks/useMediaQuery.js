import { useEffect, useState } from "react";

const useMediaQuery = (minWidth) => {
  const [state, setState] = useState({});
  let windoww = undefined

  useEffect(() => {
    windoww = window;
    setState({
      windowWidth: window.innerWidth,
      isDesiredWidth: window.innerWidth < minWidth,
    });
  }, [state.windowWidth])

  useEffect(() => {
    const resizeHandler = () => {
      const currentWindowWidth = windoww.innerWidth;
      const isDesiredWidth = currentWindowWidth < minWidth;
      setState({ windowWidth: currentWindowWidth, isDesiredWidth });
    };
    window.addEventListener("resize", resizeHandler);
    return () => windoww.removeEventListener("resize", resizeHandler);
  }, [state.windowWidth]);

  return state.isDesiredWidth;
};

export default useMediaQuery;