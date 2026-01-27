const baseUrl = "http://localhost:8080/api";
const imageUrl = baseUrl + "/file/";

const signupUrl = baseUrl + "/signup";
const loginUrl = baseUrl + "/login";
const refreshUrl = baseUrl + "/token/refresh";
const profileUrl = baseUrl + "/users/user";
const usersUrl = baseUrl + "/users";
const editProfile = baseUrl + "/user/edit";

const getPodcastsUrl = baseUrl + "/podcasts";

export { baseUrl, imageUrl, signupUrl, loginUrl, profileUrl, refreshUrl, usersUrl, editProfile, getPodcastsUrl };