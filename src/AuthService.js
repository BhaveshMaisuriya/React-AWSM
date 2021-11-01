import * as msal from '@azure/msal-browser';

const SCOPE_LOGIN = ["User.Read", "User.Read.All", "Directory.Read.All"];
const msalConfig = {
    auth: {
        validateAuthority: true,
        clientId: process.env.REACT_APP_CLIENT_ID,
        authority: "https://login.microsoftonline.com/" + process.env.REACT_APP_TENANT_ID + "/",
        redirectUri: getRedirectURI(),
        postLogoutredirectUri: getRedirectURI(),
        navigateToLoginRequestUrl: false,
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
        secureCookies: false
    },
}

const myMSALObj = new msal.PublicClientApplication(msalConfig);

export async function getIdToken(userInfo) {

    const silentRequest = {
        scopes: SCOPE_LOGIN,
        account: userInfo?.account,
    }

    try {
        // using acquireTokenSilent function for best practice refresh token
        const tokenResponse = await myMSALObj.acquireTokenSilent(silentRequest)
        return tokenResponse?.idToken;
    } catch (e) {
        // Handle when refresh function time out
        signIn();
    }
}

export async function runValidateUser() {
    try {
        const user = await myMSALObj.handleRedirectPromise();
        if (user) {
            sessionStorage.setItem("authUser", JSON.stringify(user));
            sessionStorage.setItem("idToken", user.idToken);
            sessionStorage.setItem('apiAccessToken', user.accessToken);
            sessionStorage.setItem('userName', user.account.idTokenClaims?.given_name);
            sessionStorage.setItem('userEmail', user.account.idTokenClaims?.email?.toLowerCase());
            sessionStorage.setItem('userUPN', user.account.idTokenClaims?.upn?.toLowerCase() || user.account.username);
            sessionStorage.setItem('extExpiresOn', JSON.stringify(user.extExpiresOn));
            return true;
        }
        return false;
    } catch (e) {
        return false;
    }
}

export async function signIn() {
    const loginRequest = {
        scopes: SCOPE_LOGIN,
    };
    myMSALObj.loginRedirect(loginRequest);
}

export function signOut() {
    localStorage.clear()
    sessionStorage.clear()
    myMSALObj.logoutRedirect()
}

function getRedirectURI() {
    const currentURL = window.location.href;
    let redirectURI;

    if (currentURL.includes("localhost")) {
        redirectURI = process.env.REACT_APP_REDIRECT_URI_LOCAL;
    }
    else {
        redirectURI = process.env.REACT_APP_REDIRECT_URI;
    }
    return redirectURI;
}

