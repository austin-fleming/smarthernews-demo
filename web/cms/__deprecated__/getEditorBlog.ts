import { Nullable } from '@typings/helpers';
import type { EditorsBlog } from './types/sanityTypes';
import { getClient } from './utils/getClient';

// REF: https://hdoro.dev/learn-groq

const POST_TYPE = 'editorsBlog';

/* FRAGMENTS */
const fullProjection = `{...}`;

const previewProjection = `{...}`;

/* QUERIES */
export const singleEditorPostQuery = `*[_type == "${POST_TYPE}" && slug.current == $slug][0]${fullProjection}`;

export const someEditorsPostsQuery = `*[_type == "${POST_TYPE}" && defined(slug)][0...$quantity]${previewProjection}`;

export const cursoredEditorsPostsQuery = `*[_type == "${POST_TYPE}" && defined(slug)][$cursor...$quantity]${previewProjection}`;

export const editorsPostsQuantityQuery = `count(*[_type == "${POST_TYPE}" && defined(slug)])`;

/* FETCHERS */
export const getSingleEditorBlogPost = async (slug: string, preview = false) =>
  getClient(preview).fetch<Nullable<EditorsBlog>>(singleEditorPostQuery, { slug });

export const getSomeEditorBlogPosts = async (quantity: number, preview = false) =>
  getClient(preview).fetch<Nullable<EditorsBlog[]>>(someEditorsPostsQuery, { quantity });

export const getCursoredEditorBlogPosts = async (
  cursor: number,
  quantity: number,
  preview = false,
) =>
  getClient(preview).fetch<Nullable<EditorsBlog[]>>(cursoredEditorsPostsQuery, {
    cursor,
    quantity,
  });

export const getEditorBlogQuantity = async (preview = false) =>
  getClient(preview).fetch<Nullable<number>>(editorsPostsQuantityQuery);
