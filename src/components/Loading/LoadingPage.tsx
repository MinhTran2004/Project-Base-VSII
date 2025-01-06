import LoadingBar from "react-top-loading-bar";

interface ILoadingPage {
  progress: number;
  setProgress: (() => void) | undefined;
  delay?: number;
}

export const LoadingPage = ({ progress, delay, setProgress }: ILoadingPage) => {
  return (
    <LoadingBar
      color="#FFA21A"
      height={2}
      progress={progress}
      loaderSpeed={delay}
      onLoaderFinished={setProgress}
      transitionTime={delay}
    />
  );
};
