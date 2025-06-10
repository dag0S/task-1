import type { FC } from "react";
import { href, Link } from "react-router-dom";
import { Card, Col, Row, Typography } from "antd";

import { ROUTES } from "@/shared/model/routes";

const { Title, Text, Paragraph } = Typography;

const pages = [
  {
    title: "Пользователи",
    description:
      "Список пользователей с возможностью поиска и отображения в виде карточек или таблицы.",
    link: ROUTES.USERS,
  },
  {
    title: "Посты",
    description:
      "Список постов с фильтрацией, пагинацией и просмотром полной информации о посте.",
    link: ROUTES.POSTS,
  },
  {
    title: "Альбомы",
    description:
      "Коллекция альбомов с изображениями и подгрузкой при прокрутке.",
    link: ROUTES.ALBUMS,
  },
];

export const HomeInfo: FC = () => {
  return (
    <>
      <Typography>
        <Title level={2}>Добро пожаловать в тестовое SPA-приложение</Title>
        <Paragraph>
          Это одностраничное приложение (SPA), разработанное на стеке{" "}
          <Text strong>React, TypeScript, Zustand</Text> с использованием
          UI-библиотеки <Text strong>Ant Design</Text>.
        </Paragraph>
        <Paragraph>
          Приложение использует <Text code>JSONPlaceholder API</Text> для
          загрузки данных о пользователях, постах и альбомах.
        </Paragraph>
        <Paragraph>
          Реализованы: клиентская фильтрация, пагинация, адаптивная верстка,
          управление состоянием и асинхронными запросами.
        </Paragraph>
        <Paragraph>Используемые технологии:</Paragraph>
        <ul>
          <li>
            <Text strong>React</Text>
          </li>
          <li>
            <Text strong>TypeScript</Text>
          </li>
          <li>
            <Text strong>React Router DOM</Text>
          </li>
          <li>
            <Text strong>Ant Design</Text>
          </li>
          <li>
            <Text strong>Zustand</Text> — управление состоянием
          </li>
          <li>
            <Text strong>Axios</Text> — работа с API
          </li>
          <li>
            <Text strong>Vite</Text> — сборка проекта
          </li>
        </ul>
      </Typography>
      <Title level={3} style={{ marginTop: 32 }}>
        Страницы приложения
      </Title>
      <Row gutter={[16, 16]}>
        {pages.map((page) => (
          <Col xs={24} sm={12} md={8} key={page.link}>
            <Card
              title={page.title}
              extra={[<Link to={href(page.link)}>Перейти</Link>]}
            >
              <Paragraph>{page.description}</Paragraph>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};
