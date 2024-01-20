import { Form, Input, InputNumber, Modal } from "antd";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface NewLocationProps {
  visible: boolean;
  onCancel: () => void;
  onCreate: (values: any) => void;
}

const NewLocationModal: FC<NewLocationProps> = ({
  visible,
  onCancel,
  onCreate,
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  return (
    <Modal
      open={visible}
      title={t("titleNewLocation")}
      okText={t("bntSubmit")}
      cancelText={t("bntCancel")}
      okButtonProps={{ className: "bg-blue-500" }}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          className="mb-2"
          label={t("locationName")}
          name="name"
          rules={[
            { required: true, message: t("requiredLocationName") },
            {
              pattern: /[A-Za-z0-9]{1,15}/,
              message: t("patternLocationName"),
            },
          ]}
        >
          <Input type="text" placeholder={t("placeholderLocationName")} />
        </Form.Item>

        <Form.Item
          className="mb-2"
          label={t("latitude")}
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
          initialValue="49.0384"
        >
          <InputNumber step={0.1} type="number" className="w-full" />
        </Form.Item>

        <Form.Item
          label={t("longitude")}
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
          initialValue="31.4513"
        >
          <InputNumber step={0.1} type="number" className="w-full" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewLocationModal;
