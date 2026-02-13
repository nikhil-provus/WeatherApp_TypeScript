import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card = ({ children, className = "", hover = false }: CardProps) => {
  return (
    <div
      className={`bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg ${
        hover ? "hover:shadow-xl transition-shadow duration-300" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export const CardHeader = ({ children, className = "" }: CardHeaderProps) => {
  return <div className={`p-6 ${className}`}>{children}</div>;
};

interface CardTitleProps {
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
}

export const CardTitle = ({ children, icon, className = "" }: CardTitleProps) => {
  return (
    <h2 className={`text-xl font-bold text-gray-800 flex items-center gap-2 ${className}`}>
      {icon}
      {children}
    </h2>
  );
};

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export const CardContent = ({ children, className = "" }: CardContentProps) => {
  return <div className={`px-6 pb-6 ${className}`}>{children}</div>;
};