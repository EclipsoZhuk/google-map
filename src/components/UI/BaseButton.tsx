import { FC } from "react";
import { Button } from "antd";
import { ButtonProps } from "antd/lib/button";

interface BaseButtonProps extends ButtonProps {
  className?: string;
}

const BaseButton: FC<BaseButtonProps> = ({
  children,
  className,
  onClick,
  type,
  size,
  ...rest
}) => (
  <Button
    type={type}
    className={`m-4 ${className}`}
    size={size}
    onClick={onClick}
    {...rest}
  >
    {children}
  </Button>
);

export default BaseButton;
