import { renewAccessToken } from './../../utils/date-helper.utils';
import { UserManagerSettings, UserManager, WebStorageStateStore } from 'oidc-client';

let config: UserManagerSettings = {};

// Determine the environment
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

config = {
  // the URL of our identity server
  authority: process.env.REACT_APP_AUTHORITY,
  // this ID maps to the client ID in the identity client configuration
  client_id: process.env.REACT_APP_CLIENT_ID,
  // URL to redirect to after login
  redirect_uri: process.env.REACT_APP_REDIRECT_URI,
  response_type: process.env.REACT_APP_RESPONSE_TYPE,
  // the scopes or resources we would like access to
  scope: process.env.REACT_APP_SCOPE,
  // URL to redirect to after logout
  post_logout_redirect_uri: process.env.REACT_APP_POST_LOGOUT_REDIRECT_URI,
  //silent_redirect_uri: window.location.pathname,
  //automaticSilentRenew: true,
  userStore: new WebStorageStateStore({ store: localStorage }),
};

const userManager = new UserManager(config);

userManager.events.addAccessTokenExpiring(async function () {
  console.log('Access token expiring...');
  await renewAccessToken();
});

// initialise!
export { userManager };
