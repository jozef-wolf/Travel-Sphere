import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import parse from "html-react-parser";

import RenderComponents from "../components/render-components";
import { getPageRes, getBlogPostRes } from "../helper";
import Skeleton from "react-loading-skeleton";
import { Prop, Banner, Post } from "../typescript/pages";
import { useLivePreviewCtx } from "../context/live-preview-context-provider";

export default function BlogPost({ entry }: Prop) {
  const lpTs = useLivePreviewCtx();
  const { tripId } = useParams();
  const history = useNavigate();
  const [getEntry, setEntry] = useState({
    banner: {} as Banner,
    post: {} as Post,
  });
  const [error, setError] = useState(false);

  async function fetchData() {
    try {
      const entryUrl = tripId ? `/trip/${tripId}` : "/";
      const banner = await getPageRes("/trip");
      const post = await getBlogPostRes(entryUrl);
      (!banner || !post) && setError(true);
      setEntry({ banner, post });
      entry({ page: banner, blogPost: post });
      console.log("post dane", post, post.custom.value);
    } catch (error) {
      console.error(error);
      setError(true);
    }
  }

  useEffect(() => {
    fetchData();
    error && history("/404");
  }, [tripId, lpTs, error]);

  const { post, banner } = getEntry;
  return (
    <>
      {banner ? (
        <RenderComponents
          pageComponents={banner.page_components}
          blogsPage
          contentTypeUid="trip_entry"
          entryUid={banner.uid}
          locale={banner.locale}
        />
      ) : (
        <Skeleton height={400} />
      )}
      <div className="blog-container">
        <article className="blog-detail">
          
          {post.title ? (
            <h2 {...(post.$?.title as {})}>{post.title}</h2>
          ) : (
            <h2>
              <Skeleton />
            </h2>
          )}
     
          {post.guide ? (
            <div className="flex flex-row">
              <div
                className="flex flex-col items-center bio-container"
                {...(post.guide[0].$?.title as {})}
              >
                <div className="w-14">
                  <img src={post.guide[0].picture.url}></img>
                </div>
                <p className="italic font-bold">{post.guide[0].title}</p>{" "}
              </div>
              <p className="p-4">{post.guide[0].bio}</p>
            </div>
          ) : (
            <p>
              <Skeleton width={300} />
            </p>
          )}
               {post.custom ? (
            <div className="rating-container">
              <Rating
                name="hover-feedback"
                defaultValue={post.custom.value}
                precision={0.5}
                disabled={true}
              />
              <div className="rating">{post.custom.value}</div>
            </div>
          ) : (
            <Skeleton height={800} width={600} />
          )}
          {post.featured_image ? (
            <img src={post.featured_image.url}></img>
          ) : (
            <Skeleton height={800} width={600} />
          )}
          {post.body ? (
            <div className="container-trip" {...(post.$?.body as {})}>
              {parse(post.body)}
            </div>
          ) : (
            <Skeleton height={800} width={600} />
          )}
          
        </article>
      </div>
    </>
  );
}
