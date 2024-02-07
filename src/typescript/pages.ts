import { Component } from "../typescript/component";

type Object = {
    title: string;
    body: string;
    related_post: [];
    bio?:any;
  }

type Guide = {
    title: string;
    picture: any;
    bio: string;
    $: Object;
  }

type Blog = {
    url: string;
    body: string;
    title: string;
    $: Object;
  }

export type PageEntry = {
    url: string;
    page_components: Component[];
    uid: string;
    locale: string;
  }
  
export type Prop = {
    entry: Function
  }
  
export type Entry = {
    uid: string;
    page_components: Component[];
    locale: string;
  };
  
export type BlogData = {
    is_archived: boolean;
  }
  
export type ArchiveBlogList = [
    blogs:{
      url: string;
      body: string;
      title: string;
      $: Object;
    }
  ]

export type Banner = {
    uid: string;
    page_components:Component[];
    locale: string;
  }

export type Post = {
    url: string;
    page_components:[];
    title: string;
    guide:Guide[];
    body:string;
    related_post:[Blog];
    featured_image: any;
    custom: any;
    $:Object;
  }