// In your User.ts file, add:

import { IUser, User } from "./users_model.ts";

// For single user response
export interface SingleUserResponse {
  status: string;
  data: IUser;  // Single user object, not array
}

export class UserProfileModel {
  status: string;
  data: User;  // Single User instance, not array

  constructor(response: SingleUserResponse) {
    this.status = response.status;
    this.data = User.fromRawJson(response.data);
  }

  static fromRawJson(json: any): UserProfileModel {
    return new UserProfileModel({
      status: json.status,
      data: json.data,
    });
  }
}