// LoadingPage.tsx
import React from 'react';
import LoadingBar from 'react-top-loading-bar';

interface ILoadingPage {
  progress: number;
  setProgress: (progress: number) => void; // Correctly typed
}

const LoadingPage: React.FC<ILoadingPage> = ({ progress, setProgress }) => {
  return (
    <LoadingBar
      color="#FFA21A"
      height={2}
      progress={progress}
      onLoaderFinished={() => setProgress(0)} // Correctly invoke setProgress with an argument
    />
  );
};

export default LoadingPage;
