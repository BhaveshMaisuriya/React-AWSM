import * as msal from '@azure/msal-browser';

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

export async function runValidateUser() {
    try {
        const user = await myMSALObj.handleRedirectPromise();
        if (user) {
            sessionStorage.setItem("authUser", JSON.stringify(user));
            sessionStorage.setItem("idToken", user.idToken);
            sessionStorage.setItem('apiAccessToken', user.accessToken);
            sessionStorage.setItem('userName', user.account.idTokenClaims?.given_name);
            sessionStorage.setItem('userEmail', user.account.idTokenClaims?.email?.toLowerCase());
            sessionStorage.setItem('userUPN', user.account.idTokenClaims?.upn?.toLowerCase());
            return true;
        }
        return false;
    } catch (e) {
        return false;
    }
}

export async function signIn() {
    const loginRequest = {
        scopes: ["User.Read", "User.Read.All", "Directory.Read.All"]
    };

    sessionStorage.setItem('loginState', 'true')

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

