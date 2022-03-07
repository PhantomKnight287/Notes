import { defineDocumentType, makeSource } from "contentlayer/source-files";

import readingTime from "reading-time";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeCodeTitles from "rehype-code-titles";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrism from "rehype-prism-plus";
import highlight from "rehype-highlight";
const computedFields = {
  readingTime: { type: "json", resolve: (doc) => readingTime(doc.body.raw) },
  wordCount: {
    type: "number",
    resolve: (doc) => doc.body.raw.split(/\s+/gu).length,
  },
  slug: {
    type: "string",
    resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ""),
  },
};

const Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: "data/blog/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    publishedAt: { type: "string", required: true },
    summary: { type: "string", required: true },
    image: { type: "string", required: true },
  },
  computedFields,
}));
const Notes = defineDocumentType(() => ({
  name: "Notes",
  filePathPattern: "data/notes/*.mdx",
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    publishedAt: {
      type: "string",
      required: false,
      default: new Date(),
    },
    desc: {
      type: "string",
      required: true,
    },
    ogImage: {
      type: "string",
      description: "The ogImage of the post",
      required: true,
    },
    topic:{
      type: "string",
      description: "The topic of the post",
      required: true,
    },
    id:{
      type:"number",
      description:"The Id of the post",
      required:true,
    }
  },
  computedFields
}));
const Snippet = defineDocumentType(() => ({
  name: "Snippet",
  filePathPattern: "data/snippets/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    ogImage: {
      type: "string",
      required: false,
      default: "/icons/icon.png",
    },
    id:{
      type:"number",
      required:true
    }
  },
  computedFields,
}));

const Intro = defineDocumentType(()=>({
  name:"Intro",
  contentType:"mdx",
  filePathPattern: "data/*/intro.mdx",

  fields:{
    title:{
      type:"string",
      required:true
    },
    description:{
      type:"string",
      required:true
    }
  },
  computedFields
}))

const contentLayerConfig = makeSource({
  contentDirPath: "data",
  documentTypes: [Snippet, Notes, Blog,Intro],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      rehypeCodeTitles,
      rehypePrism,
      highlight,
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["anchor"],
          },
        },
      ],
    ],
  },
});

export default contentLayerConfig;
