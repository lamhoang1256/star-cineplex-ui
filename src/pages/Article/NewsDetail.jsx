import { useEffect } from "react";
import { useParams } from "react-router-dom";
import PostRelated from "components/post/PostRelated";
import { articles } from "constants/articles";
import Description from "components/text/Description";
import styled from "styled-components";

const StyledNewsDetail = styled.div`
  .article-top {
    position: relative;
    height: 30vh;
    width: 100%;
    padding-top: 80px;
    background-size: cover;
    background-repeat: no-repeat;
    @include flexbox(center, center);
    &::before {
      content: "";
      position: absolute;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.2);
    }
    @include tablet {
      height: 30vh;
    }
  }
  .article-title h3 {
    color: #fff;
    font-size: 2.4rem;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .article-date {
    color: var(--gray-light);
  }
  .article-main {
    display: flex;
    gap: 30px;
    padding: 60px 0 20px;
  }
  .article-post img {
    margin: 20px auto;
    border-radius: 10px;
  }
`;

const NewsDetail = () => {
  const { idNewsDetail } = useParams();
  const news = articles.filter((news) => news.id == idNewsDetail)[0];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!news) {
    return (
      <div className="container">
        <Description>Tin tức này không tồn tại</Description>;
      </div>
    );
  }
  return (
    <StyledNewsDetail>
      <div className="container">
        <div className="grid-layout">
          <div className="column1">
            <div className="article-post">
              <h1 className="article-title">{news.title}</h1>
              <span className="article-date">
                {new Date(news.createTime).toLocaleDateString("vi-VI")}
              </span>
              <Description
                lineHeight={1.9}
                className="article-content"
                dangerouslySetInnerHTML={{ __html: news.content }}
              ></Description>
            </div>
          </div>
          <div className="column2">
            <PostRelated />
          </div>
        </div>
      </div>
    </StyledNewsDetail>
  );
};
export default NewsDetail;