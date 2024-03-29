import React from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { BloglistProps } from "../typescript/blog";
import Rating from "@mui/material/Rating";

function BlogList({ bloglist }: { bloglist: BloglistProps }) {
  let body = typeof bloglist.body === "string" && bloglist.body.substr(0, 300);
  const stringLength = (body as string).lastIndexOf(" ");
  body = `${(body as string).substr(
    0,
    Math.min((body as string).length, stringLength)
  )}...`;
  return (
    <div className="blog-list">
      {bloglist.featured_image && (
        <Link to={bloglist.url}>
          <img
            className="blog-list-img"
            src={bloglist.featured_image.url}
            alt="blog img"
          />
        </Link>
      )}
      <div className="blog-content">
        {bloglist.title && (
          <Link to={bloglist.url}>
            <h3>{bloglist.title}</h3>
          </Link>
        )}
        {parse(body)}
       
        {bloglist.url ? (
          <div className="m-4">
            <Link to={bloglist.url}>
              <span className="read-more">{"Read more"}</span>
            </Link>
          </div>
        ) : (
          ""
        )}
         {bloglist.custom.value && (
            <div className="flex flex-row">
            <Rating
              name="hover-feedback"
              defaultValue={bloglist.custom.value}
              precision={0.5}
              disabled={true}
            />
            <div className="bold text-xl">{bloglist.custom.value}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogList;
