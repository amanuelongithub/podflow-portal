// src/shared/models/User.ts
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
  created_at: string; // store as ISO string
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

  constructor({
    id,
    email,
    full_name,
    company_name,
    phone_number,
    profile_image,
    bio,
    role_id,
    email_verified,
    created_at,
  }: IUser) {
    this.id = id;
    this.email = email;
    this.full_name = full_name;
    this.company_name = company_name ?? null;
    this.phone_number = phone_number ?? null;
    this.profile_image = profile_image ?? null;
    this.bio = bio ?? null;
    this.role_id = role_id;
    this.email_verified = email_verified;
    this.created_at = created_at;
  }

  // Decode from API / plain object
  static fromMap(map: any): User {
    return new User({
      id: map.id,
      email: map.email,
      full_name: map.full_name,
      company_name: map.company_name ?? null,
      phone_number: map.phone_number ?? null,
      profile_image: map.profile_image ?? null,
      bio: map.bio ?? null,
      role_id: map.role_id,
      email_verified: map.email_verified,
      created_at: map.created_at,
    });
  }

  // Encode to plain object (for API)
  toMap(): IUser {
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

  // Copy with optional overrides
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
