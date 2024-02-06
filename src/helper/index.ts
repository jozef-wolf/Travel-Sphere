import Stack from "../sdk/entry";
import { addEditableTags } from "@contentstack/utils";

const liveEdit = process.env.REACT_APP_CONTENTSTACK_LIVE_EDIT_TAGS === "true";

export const getHeaderRes = async () => {
  const response = (await Stack.getEntry({
    contentTypeUid: "header",
    referenceFieldPath: ["navigation_menu.page_reference"],
    jsonRtePath: ["notification_bar.announcement_text"],
  })) as any;
  liveEdit && addEditableTags(response[0][0], "header", true);
  return response[0][0];
};

export const getFooterRes = async () => {
  const response = (await Stack.getEntry({
    contentTypeUid: "footer",
    jsonRtePath: ["copyright"],
    referenceFieldPath: undefined,
  })) as any;
  liveEdit && addEditableTags(response[0][0], "footer", true);
  return response[0][0];
};

export const getAllEntries = async () => {
  const response = (await Stack.getEntry({
    contentTypeUid: "page",
    jsonRtePath: undefined,
    referenceFieldPath: undefined,
  })) as any;
  liveEdit && addEditableTags(response[0], "page", true);
  return response[0];
};

export const getPageRes = async (entryUrl: string) => {
  const response = (await Stack.getEntryByUrl({
    contentTypeUid: "page",
    entryUrl,
    referenceFieldPath: ["page_components.from_blog.featured_blogs"],
    jsonRtePath: [
      "page_components.from_blog.featured_blogs.body",
      "page_components.section_with_buckets.buckets.description",
      "page_components.section_with_html_code.description",
    ],
  })) as any;
  liveEdit && addEditableTags(response[0], "page", true);
  return response[0];
};

export const getBlogListRes = async () => {
  const response = (await Stack.getEntry({
    contentTypeUid: "trip_entry",
    referenceFieldPath: ["guide"],
    jsonRtePath: ["body"],
  })) as any;
  liveEdit && addEditableTags(response[0], "trip_entry", true);
  return response[0];
};

export const getBlogPostRes = async (entryUrl: string) => {
  const response = (await Stack.getEntryByUrl({
    contentTypeUid: "trip_entry",
    entryUrl,
    referenceFieldPath: ["guide"],
    jsonRtePath: ["body"],
  })) as any;
  liveEdit && addEditableTags(response[0], "trip_entry", true);
  return response[0];
};
