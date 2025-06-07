import type { FC } from "react";
import { Avatar, Card, Descriptions } from "antd";

import type { IUser } from "../../model/types";

interface Props {
  user: IUser;
}

export const UserCard: FC<Props> = ({ user }) => {
  return (
    <Card
      title={
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Avatar>{user.name[0]}</Avatar>
          <span>{user.name}</span>
        </div>
      }
      hoverable
    >
      <Descriptions column={1} size="small">
        <Descriptions.Item label="Имя">{user.username}</Descriptions.Item>

        <Descriptions.Item label="Почта">
          <a href={`mailto:${user.email}`}>{user.email}</a>
        </Descriptions.Item>

        <Descriptions.Item label="Телефон">
          <a href={`tel:${user.phone}`}>{user.phone}</a>
        </Descriptions.Item>

        <Descriptions.Item label="Сайт">
          <a
            href={`https://${user.website}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {user.website}
          </a>
        </Descriptions.Item>

        <Descriptions.Item label="Адрес">
          {`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}
        </Descriptions.Item>

        <Descriptions.Item label="Компания">
          {user.company.name}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};
