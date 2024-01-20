import { FC, MouseEvent } from "react";
import { Tooltip } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

interface BaseCardActionProps {
  type: "Edit" | "Delete";
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const BaseCardAction: FC<BaseCardActionProps> = ({ type, onClick }) => {
  const { t } = useTranslation();

  return (
    <Tooltip title={type === "Delete" ? t("titleDelete") : t("titleEdit")}>
      {type === "Delete" ? (
        <DeleteOutlined style={{ fontSize: "18px" }} onClick={onClick} />
      ) : (
        <EditOutlined style={{ fontSize: "18px" }} onClick={onClick} />
      )}
    </Tooltip>
  );
};

export default BaseCardAction;
