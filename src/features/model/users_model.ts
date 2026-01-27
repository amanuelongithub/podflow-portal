// src/shared/models/User.ts

import { PageMetadata } from "./page";

export interface IUser {
  id: number;
  email: string;
  full_name: string;
  company_name?: string | null;
  phone_number?: string | null;
  profile_image?: string | null;
  bio?: string | null;
  role_id: number;
  email_verified: boolean;
  created_at: string;
}

export class User implements IUser {
  id: number;
  email: string;
  full_name: string;
  company_name?: string | null;
  phone_number?: string | null;
  profile_image?: string | null;
  bio?: string | null;
  role_id: number;
  email_verified: boolean;
  created_at: string;

  constructor(data: IUser) {
    this.id = data.id;
    this.email = data.email;
    this.full_name = data.full_name;
    this.company_name = data.company_name ?? null;
    this.phone_number = data.phone_number ?? null;
    this.profile_image = data.profile_image ?? null;
    this.bio = data.bio ?? null;
    this.role_id = data.role_id;
    this.email_verified = data.email_verified;
    this.created_at = data.created_at;
  }

  static fromRawJson(json: any): User {
    return new User({
      id: json.id,
      email: json.email,
      full_name: json.full_name,
      company_name: json.company_name ?? null,
      phone_number: json.phone_number ?? null,
      profile_image: json.profile_image ?? null,
      bio: json.bio ?? null,
      role_id: json.role_id,
      email_verified: json.email_verified,
      created_at: json.created_at,
    });
  }

  toRawJson(): IUser {
    return {
      id: this.id,
      email: this.email,
      full_name: this.full_name,
      company_name: this.company_name ?? null,
      phone_number: this.phone_number ?? null,
      profile_image: this.profile_image ?? null,
      bio: this.bio ?? null,
      role_id: this.role_id,
      email_verified: this.email_verified,
      created_at: this.created_at,
    };
  }

  copyWith(params: Partial<IUser>): User {
    return new User({
      id: params.id ?? this.id,
      email: params.email ?? this.email,
      full_name: params.full_name ?? this.full_name,
      company_name: params.company_name ?? this.company_name,
      phone_number: params.phone_number ?? this.phone_number,
      profile_image: params.profile_image ?? this.profile_image,
      bio: params.bio ?? this.bio,
      role_id: params.role_id ?? this.role_id,
      email_verified: params.email_verified ?? this.email_verified,
      created_at: params.created_at ?? this.created_at,
    });
  }
}

// For pagination response

export interface UserListResponse {
  status: string;
  page_metadata: PageMetadata;
  data: IUser[];
}

export class UserResponse {
  status: string;
  page_metadata: PageMetadata;
  data: User[];

  constructor(response: UserListResponse) {
    this.status = response.status;
    this.page_metadata = response.page_metadata;
    this.data = response.data.map(user => User.fromRawJson(user));
  }

  static fromRawJson(json: any): UserResponse {
    return new UserResponse({
      status: json.status,
      page_metadata: json.page_metadata,
      data: json.data,
    });
  }
}