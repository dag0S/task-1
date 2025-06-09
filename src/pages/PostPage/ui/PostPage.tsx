import { useEffect, type FC } from "react";
import { href, Link, useParams } from "react-router-dom";
import { Avatar, Breadcrumb, Card, Flex, Typography } from "antd";

import { ROUTES, type PathParams } from "@/shared/model/routes";
import { usePostDetailsStore } from "@/entities/PostDetails";
import { CommentList } from "@/entities/Comment";

const { Title, Text } = Typography;

export const PostPage: FC = () => {
  const { postId } = useParams<PathParams[typeof ROUTES.POST]>();

  const post = usePostDetailsStore((state) => state.post);
  const author = usePostDetailsStore((state) => state.author);
  const comments = usePostDetailsStore((state) => state.comments);
  const isLoading = usePostDetailsStore((state) => state.isLoading);
  const error = usePostDetailsStore((state) => state.error);
  const fetchPostDetails = usePostDetailsStore(
    (state) => state.fetchPostDetails
  );

  useEffect(() => {
    if (postId) {
      fetchPostDetails(postId);
    }
  }, [postId, fetchPostDetails]);

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;
  if (!post || !author) return null;

  return (
    <Flex vertical gap={16} style={{ maxWidth: 600, margin: "0 auto" }}>
      <Breadcrumb
        items={[
          {
            title: <Link to={href(ROUTES.POSTS)}>Посты</Link>,
          },
          {
            title: ":postTitle",
          },
        ]}
        params={{ postTitle: post.title }}
      />
      <Card>
        {
          <Flex gap={16}>
            <Avatar>{author.name[0]}</Avatar>
            <div>
              <Title level={3} style={{ marginBottom: 0 }}>
                {author.name}
              </Title>
              <Text type="secondary">Почта: </Text>
              <a href={`mailto:${author.email}`} target="_blank">
                {author.email}
              </a>
            </div>
          </Flex>
        }
      </Card>
      <Card title={post.title}>{post.body}</Card>
      <Card title="Комментарии">
        <CommentList comments={comments} />
      </Card>
    </Flex>
  );
};
