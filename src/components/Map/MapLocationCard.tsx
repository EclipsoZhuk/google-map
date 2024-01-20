import { FC } from "react";
import BaseCardAction from "../UI/BaseCardAction";
import { Button, Card, Form, Input, InputNumber, Tooltip } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { IMockData } from "../../db/data.interface";
import { useTranslation } from "react-i18next";

interface MapLocationCardProps {
  name: string;
  lat: number;
  lon: number;
  onDelete: () => void;
  onEdit: () => void;
  isEdit?: boolean;
  onSave: (values: IMockData) => void;
}

const MapLocationCard: FC<MapLocationCardProps> = ({
  name,
  lat,
  lon,
  onDelete,
  onEdit,
  isEdit,
  onSave,
}) => {
  const { t } = useTranslation();

  return (
    <div className="m-4">
      {isEdit ? (
        <Form onFinish={onSave} initialValues={{ name, lat, lon }}>
          <Card
            title={
              <Form.Item
                noStyle
                name="name"
                rules={[
                  { required: true, message: "Please enter name" },
                  { pattern: /[A-Za-z0-9]{1,15}/, message: `Invalid name` },
                ]}
              >
                <Input addonBefore="Name" placeholder="Edit name" />
              </Form.Item>
            }
            style={{ width: 250 }}
            actions={[
              <BaseCardAction type="Delete" onClick={onDelete} />,
              <Tooltip title={t("bntSubmit")}>
                <Button
                  type="primary"
                  className="bg-blue-500"
                  htmlType="submit"
                  size="small"
                >
                  <CheckOutlined className="!flex items-center" />
                </Button>
              </Tooltip>,
            ]}
          >
            <Form.Item
              className="mb-2"
              name="lat"
              rules={[
                {
                  required: true,
                  message: t("requiredLatitude"),
                },
                {
                  pattern: /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}$/,
                  message: t("patternLatitude"),
                },
              ]}
            >
              <InputNumber step={0.1} addonBefore="Lat" type="number" />
            </Form.Item>

            <Form.Item
              name="lon"
              rules={[
                {
                  required: true,
                  message: t("requiredLongitude"),
                },
                {
                  pattern: /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}$/,
                  message: t("patternLongitude"),
                },
              ]}
            >
              <InputNumber step={0.1} addonBefore="Lng" type="number" />
            </Form.Item>
          </Card>
        </Form>
      ) : (
        <Card
          title={name}
          style={{ width: 250 }}
          actions={[
            <BaseCardAction type="Delete" onClick={onDelete} />,
            <BaseCardAction type="Edit" onClick={onEdit} />,
          ]}
        >
          <div>
            {t("latitude")}: {lat}
          </div>
          <div>
            {t("longitude")}: {lon}
          </div>
        </Card>
      )}
    </div>
  );
};

export default MapLocationCard;
