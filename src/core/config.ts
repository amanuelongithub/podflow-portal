const baseUrl = "http://localhost:8080/api";
const imageUrl = baseUrl + "/file/";

const signupUrl = baseUrl + "/signup";
const loginUrl = baseUrl + "/login";
const refreshUrl = baseUrl + "/token/refresh";
const usersUrl = baseUrl + "/users";
const profileUrl = usersUrl + "/user";
const editProfile = baseUrl + "/user/edit";

const getPodcastsUrl = baseUrl + "/podcasts";
const createPodcastUrl = getPodcastsUrl + "/create";

export {
  baseUrl,
  imageUrl,
  signupUrl,
  loginUrl,
  profileUrl,
  refreshUrl,
  usersUrl,
  editProfile,
  getPodcastsUrl,
  createPodcastUrl,
};
