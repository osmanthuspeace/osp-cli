"use client";

import { useState } from "react";
import { Button, List, Skeleton, Avatar } from "antd";
import { fetchMoreUsers, User } from "@/app/(main)/user/action";

const UserListClient = ({ initialUsers }: { initialUsers: User[] }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<User[]>(initialUsers);

  const onLoadMore = async () => {
    setLoading(true);
    const newUsers = await fetchMoreUsers(data);
    setData((prev) => [...prev, ...newUsers]);
    setLoading(false);
  };

  return (
    <List
      className="demo-loadmore-list"
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item) => (
        <List.Item
          actions={[
            <a key="list-loadmore-edit">edit</a>,
            <a key="list-loadmore-more">more</a>,
          ]}
        >
          <Skeleton avatar title={false} loading={loading} active>
            <List.Item.Meta
              avatar={<Avatar src={item.picture.large} />}
              title={<a href="https://ant.design">{item.name?.last}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </Skeleton>
        </List.Item>
      )}
      loadMore={
        !loading ? (
          <div
            style={{
              textAlign: "center",
              marginTop: 12,
              height: 32,
              lineHeight: "32px",
            }}
          >
            <Button onClick={onLoadMore}>loading more</Button>
          </div>
        ) : null
      }
    />
  );
};

export default UserListClient;
