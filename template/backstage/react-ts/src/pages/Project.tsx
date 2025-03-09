import { Col, Row } from "antd";
import MyCard from "../components/Card";

export default function Project() {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <MyCard title="Card title" content="Card content" />
        </Col>
        <Col span={8}>
          <MyCard title="Card title" content="Card content" />
        </Col>
        <Col span={8}>
          <MyCard title="Card title" content="Card content" />
        </Col>
        <Col span={8}>
          <MyCard title="Card title" content="Card content" />
        </Col>
      </Row>
    </div>
  );
}
