import { FC } from "react";

interface Props {
  size?: number;
  fullScreen?: boolean;
}

export const Loader: FC<Props> = ({
  size = 24,
  fullScreen = false,
}) => {
  const spinner = (
    <div
      style={{ width: size, height: size }}
      className="border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
    />
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
};