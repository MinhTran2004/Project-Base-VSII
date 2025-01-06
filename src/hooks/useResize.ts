import * as React from "react";

interface Size {
  width: number;
  height: number;
}

const useResize = (): Size => {
  const [size, setSize] = React.useState<Size>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  console.log(size);

  React.useEffect(() => {
    const handleResize = () => {
      console.log("resize");
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return size;
};

export default useResize;
