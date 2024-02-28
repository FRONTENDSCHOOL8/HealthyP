/**
 * This file was @generated using typed-pocketbase
 */

// https://pocketbase.io/docs/collections/#base-collection
export interface BaseCollectionResponse {
	/**
	 * 15 characters string to store as record ID.
	 */
	id: string;
	/**
	 * Date string representation for the creation date.
	 */
	created: string;
	/**
	 * Date string representation for the creation date.
	 */
	updated: string;
	/**
	 * The collection id.
	 */
	collectionId: string;
	/**
	 * The collection name.
	 */
	collectionName: string;
}

// https://pocketbase.io/docs/api-records/#create-record
export interface BaseCollectionCreate {
	/**
	 * 15 characters string to store as record ID.
	 * If not set, it will be auto generated.
	 */
	id?: string;
}

// https://pocketbase.io/docs/api-records/#update-record
export interface BaseCollectionUpdate {}

// https://pocketbase.io/docs/collections/#auth-collection
export interface AuthCollectionResponse extends BaseCollectionResponse {
	/**
	 * The username of the auth record.
	 */
	username: string;
	/**
	 * Auth record email address.
	 */
	email: string;
	/**
	 * Whether to show/hide the auth record email when fetching the record data.
	 */
	emailVisibility: boolean;
	/**
	 * Indicates whether the auth record is verified or not.
	 */
	verified: boolean;
}

// https://pocketbase.io/docs/api-records/#create-record
export interface AuthCollectionCreate extends BaseCollectionCreate {
	/**
	 * The username of the auth record.
	 * If not set, it will be auto generated.
	 */
	username?: string;
	/**
	 * Auth record email address.
	 */
	email?: string;
	/**
	 * Whether to show/hide the auth record email when fetching the record data.
	 */
	emailVisibility?: boolean;
	/**
	 * Auth record password.
	 */
	password: string;
	/**
	 * Auth record password confirmation.
	 */
	passwordConfirm: string;
	/**
	 * Indicates whether the auth record is verified or not.
	 * This field can be set only by admins or auth records with "Manage" access.
	 */
	verified?: boolean;
}

// https://pocketbase.io/docs/api-records/#update-record
export interface AuthCollectionUpdate {
	/**
	 * The username of the auth record.
	 */
	username?: string;
	/**
	 * The auth record email address.
	 * This field can be updated only by admins or auth records with "Manage" access.
	 * Regular accounts can update their email by calling "Request email change".
	 */
	email?: string;
	/**
	 * Whether to show/hide the auth record email when fetching the record data.
	 */
	emailVisibility?: boolean;
	/**
	 * Old auth record password.
	 * This field is required only when changing the record password. Admins and auth records with "Manage" access can skip this field.
	 */
	oldPassword?: string;
	/**
	 * New auth record password.
	 */
	password?: string;
	/**
	 * New auth record password confirmation.
	 */
	passwordConfirm?: string;
	/**
	 * Indicates whether the auth record is verified or not.
	 * This field can be set only by admins or auth records with "Manage" access.
	 */
	verified?: boolean;
}

// https://pocketbase.io/docs/collections/#view-collection
export interface ViewCollectionRecord {
	id: string;
}

// utilities

type MaybeArray<T> = T | T[];

// ===== users =====

export interface UsersResponse extends AuthCollectionResponse {
	collectionName: 'users';
	name: string;
	avatar: string;
	bookmark: Array<string>;
}

export interface UsersCreate extends AuthCollectionCreate {
	name?: string;
	avatar?: File | null;
	bookmark?: MaybeArray<string>;
}

export interface UsersUpdate extends AuthCollectionUpdate {
	name?: string;
	avatar?: File | null;
	bookmark?: MaybeArray<string>;
	'bookmark+'?: MaybeArray<string>;
	'bookmark-'?: MaybeArray<string>;
}

export interface UsersCollection {
	type: 'auth';
	collectionId: string;
	collectionName: 'users';
	response: UsersResponse;
	create: UsersCreate;
	update: UsersUpdate;
	relations: {
		bookmark: RatingsCollection[];
		'ratings(creator)': RatingsCollection[];
		'bookmarks(bookmarked_by)': BookmarksCollection[];
	};
}

// ===== recipes =====

export interface RecipesResponse extends BaseCollectionResponse {
	collectionName: 'recipes';
	title: string;
	ingredients: unknown;
	steps: unknown;
	views: number;
	category: string;
	keywords: string;
	desc: string;
	image: string;
	rating: Array<string>;
}

export interface RecipesCreate extends BaseCollectionCreate {
	title?: string;
	ingredients?: unknown;
	steps?: unknown;
	views?: number;
	category?: string;
	keywords?: string;
	desc?: string;
	image?: File | null;
	rating?: MaybeArray<string>;
}

export interface RecipesUpdate extends BaseCollectionUpdate {
	title?: string;
	ingredients?: unknown;
	steps?: unknown;
	views?: number;
	'views+'?: number;
	'views-'?: number;
	category?: string;
	keywords?: string;
	desc?: string;
	image?: File | null;
	rating?: MaybeArray<string>;
	'rating+'?: MaybeArray<string>;
	'rating-'?: MaybeArray<string>;
}

export interface RecipesCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'recipes';
	response: RecipesResponse;
	create: RecipesCreate;
	update: RecipesUpdate;
	relations: {
		rating: RatingsCollection[];
		'bookmarks(recipe)': BookmarksCollection[];
	};
}

// ===== ratings =====

export interface RatingsResponse extends BaseCollectionResponse {
	collectionName: 'ratings';
	creator: string;
	review_stars: number;
	review_text: string;
}

export interface RatingsCreate extends BaseCollectionCreate {
	creator?: string;
	review_stars?: number;
	review_text?: string;
}

export interface RatingsUpdate extends BaseCollectionUpdate {
	creator?: string;
	review_stars?: number;
	'review_stars+'?: number;
	'review_stars-'?: number;
	review_text?: string;
}

export interface RatingsCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'ratings';
	response: RatingsResponse;
	create: RatingsCreate;
	update: RatingsUpdate;
	relations: {
		'users(bookmark)': UsersCollection[];
		'recipes(rating)': RecipesCollection[];
		creator: UsersCollection;
	};
}

// ===== bookmarks =====

export interface BookmarksResponse extends BaseCollectionResponse {
	collectionName: 'bookmarks';
	bookmarked_by: string;
	recipe: string;
}

export interface BookmarksCreate extends BaseCollectionCreate {
	bookmarked_by?: string;
	recipe?: string;
}

export interface BookmarksUpdate extends BaseCollectionUpdate {
	bookmarked_by?: string;
	recipe?: string;
}

export interface BookmarksCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'bookmarks';
	response: BookmarksResponse;
	create: BookmarksCreate;
	update: BookmarksUpdate;
	relations: {
		bookmarked_by: UsersCollection;
		recipe: RecipesCollection;
	};
}

// ===== Schema =====

export type Schema = {
	users: UsersCollection;
	recipes: RecipesCollection;
	ratings: RatingsCollection;
	bookmarks: BookmarksCollection;
};
