import { renewAccessToken } from "./../../utils/date-helper.utils";
import {
  UserManagerSettings,
  UserManager,
  WebStorageStateStore,
} from "oidc-client";

let config: UserManagerSettings = {};

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  config = {
    // the URL of our identity server
    authority: "https://sso.dev.agroom.org/",
    // this ID maps to the client ID in the identity client configuration
    client_id: "localhost:6002",
    // URL to redirect to after login
    redirect_uri: "https://localhost:6002/signin-oidc",
    response_type: "code",
    // the scopes or resources we would like access to
    scope: "openid profile api1 role offline_access",
    // URL to redirect to after logout
    post_logout_redirect_uri: "https://localhost:6002/Register/",
    //silent_redirect_uri: window.location.pathname,
    //automaticSilentRenew: true,
    userStore: new WebStorageStateStore({ store: localStorage }),
  };
} else {
  config = {
    // the URL of our identity server
    authority: "https://sso.sabak.org/",
    // this ID maps to the client ID in the identity client configuration
    client_id: "admin.agroom.org",
    // URL to redirect to after login
    redirect_uri: "https://admin.agroom.org/signin-oidc",
    response_type: "code",
    // the scopes or resources we would like access to
    scope: "openid profile api1 role offline_access",
    // URL to redirect to after logout
    post_logout_redirect_uri: "https://admin.agroom.org/Register/",
    //silent_redirect_uri: window.location.pathname,
    //automaticSilentRenew: true,
    userStore: new WebStorageStateStore({ store: localStorage }),
  };
}

// config = {
//   // the URL of our identity server
//   authority: "https://sso.sabakorg.ir/",
//   // this ID maps to the client ID in the identity client configuration
//   client_id: "Sabakorg",
//   // URL to redirect to after login
//   redirect_uri: "https://sabakorg.ir/signin-oidc",
//   response_type: "code",
//   // the scopes or resources we would like access to
//   scope: "openid profile api1 role offline_access",
//   // URL to redirect to after logout
//   post_logout_redirect_uri: "https://sabakorg.ir/Register/",
//   //silent_redirect_uri: window.location.pathname,
//   //automaticSilentRenew: true,
// };

const userManager = new UserManager(config);

userManager.events.addAccessTokenExpiring(async function () {
  console.log("Access token expiring...");
  await renewAccessToken();
});

// initialise!
export { userManager };
