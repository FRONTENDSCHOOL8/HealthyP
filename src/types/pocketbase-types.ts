/**
 * This file was @generated using pocketbase-typegen
 */

import type PocketBase from 'pocketbase';
import type { RecordService } from 'pocketbase';

export enum Collections {
  Bookmarks = 'bookmarks',
  Ratings = 'ratings',
  Recipes = 'recipes',
  Users = 'users',
}

// Alias types for improved usability
export type IsoDateString = string;
export type RecordIdString = string;
export type HTMLString = string;

// System fields
export type BaseSystemFields<T = never> = {
  id: RecordIdString;
  created: IsoDateString;
  updated: IsoDateString;
  collectionId: string;
  collectionName: Collections;
  expand?: T;
};

export type AuthSystemFields<T = never> = {
  email: string;
  emailVisibility: boolean;
  username: string;
  verified: boolean;
} & BaseSystemFields<T>;

// Record types for each collection

export type BookmarksRecord = {
  bookmarked_by?: RecordIdString;
  recipe?: RecordIdString;
};

export type RatingsRecord = {
  creator?: RecordIdString;
  review_stars?: number;
  review_text?: HTMLString;
};

export type RecipesRecord<Tingredients = unknown, Tsteps = unknown> = {
  category?: string;
  desc?: HTMLString;
  image?: string;
  ingredients?: null | Tingredients;
  keywords?: string;
  rating?: RecordIdString[];
  steps?: null | Tsteps;
  title?: string;
  views?: number;
};

export type UsersRecord = {
  avatar?: string;
  bookmark?: RecordIdString[];
  name?: string;
};

// Response types include system fields and match responses from the PocketBase API
export type BookmarksResponse<Texpand = unknown> = Required<BookmarksRecord> &
  BaseSystemFields<Texpand>;
export type RatingsResponse<Texpand = unknown> = Required<RatingsRecord> &
  BaseSystemFields<Texpand>;
export type RecipesResponse<
  Tingredients = unknown,
  Tsteps = unknown,
  Texpand = unknown,
> = Required<RecipesRecord<Tingredients, Tsteps>> & BaseSystemFields<Texpand>;
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> &
  AuthSystemFields<Texpand>;

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
  bookmarks: BookmarksRecord;
  ratings: RatingsRecord;
  recipes: RecipesRecord;
  users: UsersRecord;
};

export type CollectionResponses = {
  bookmarks: BookmarksResponse;
  ratings: RatingsResponse;
  recipes: RecipesResponse;
  users: UsersResponse;
};

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
  collection(idOrName: 'bookmarks'): RecordService<BookmarksResponse>;
  collection(idOrName: 'ratings'): RecordService<RatingsResponse>;
  collection(idOrName: 'recipes'): RecordService<RecipesResponse>;
  collection(idOrName: 'users'): RecordService<UsersResponse>;
};
