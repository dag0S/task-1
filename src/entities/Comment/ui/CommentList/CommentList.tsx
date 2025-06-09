import type { FC } from "react";
import { Avatar, List } from "antd";
import { UserOutlined } from "@ant-design/icons";

import type { IComment } from "../../model/types";

interface Props {
  comments: IComment[];
}

export const CommentList: FC<Props> = ({ comments }) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={comments}
      renderItem={(comment) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar icon={<UserOutlined />} />}
            title={
              <a href={`mailto:${comment.email}`} target="_blank">
                {comment.email}
              </a>
            }
            description={comment.body}
          />
        </List.Item>
      )}
    />
  );
};
