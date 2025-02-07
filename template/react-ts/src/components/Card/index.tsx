import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Card } from "antd";

const MyCard = ({ title = "title", content = "content" }) => {
  return (
    <Card
      title={title}
      bordered={false}
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      {content}
    </Card>
  );
};
export default MyCard;
