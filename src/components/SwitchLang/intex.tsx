import { Switch } from "antd";
import { changeLanguage } from "i18next";
import { FC } from "react";
import { useTranslation } from "react-i18next";

const SwitchLang: FC = () => {
  const { i18n } = useTranslation();

  const onChange = (lng: any) => {
    if (lng) {
      changeLanguage("en");
    } else {
      changeLanguage("ua");
    }
  };
  return (
    <Switch
      defaultChecked={i18n.language === "en"}
      className={i18n.language !== "en" ? "!bg-gray-500" : ""}
      checkedChildren="EN"
      unCheckedChildren="UA"
      onChange={onChange}
    />
  );
};

export default SwitchLang;
