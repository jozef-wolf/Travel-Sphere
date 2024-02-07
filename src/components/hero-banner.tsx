import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { BannerProps } from "../typescript/banner";

export default function HeroBanner(props: BannerProps) {
  const banner = props.hero_banner;
  return (
    <div
      className="max-height"
      style={{
        background: banner.bg_color ? banner.bg_color : "",
      }}
    >
       {banner.banner_image ? (
        <div className="max-width-container">
          <img
            {...(banner.banner_image.$?.url as {})}
            alt={banner.banner_image.filename}
            src={banner.banner_image.url}
            className="max-h-full w-full"
          />
        </div>
      ) : (
        ""
      )}
      <div
        className="p-14 mt-4 container"
        style={{ color: banner.text_color ? banner.text_color : "#222" }}
      >
        <h1 {...(banner.$?.banner_title as {})} className="hero-title">
          {banner.banner_title || <Skeleton />}
        </h1>

        {banner.banner_description ? (
          <p
            {...(banner.$?.banner_description as {})}
            className="hero-description"
            style={{ color: banner.text_color ? banner.text_color : "white" }}
          >
            {banner.banner_description}
          </p>
        ) : (
          ""
        )}
        {banner.call_to_action.title && banner.call_to_action.href ? (
          <Link
            {...banner.call_to_action.$?.title}
            to={banner.call_to_action.href}
            className="btn tertiary-btn"
          >
            {banner.call_to_action.title}
          </Link>
        ) : (
          ""
        )}
      </div>
     
    </div>
  );
}
