import * as msal from '@azure/msal-browser';
import { getUserProperties } from "../src/store/ms-graph/actions"
import store from "../src/store"
import { userUPNMapping } from 'common/data/userMapping';

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

var accountId = "";

const myMSALObj = new msal.PublicClientApplication(msalConfig);

myMSALObj.handleRedirectPromise().then(handleResponse).catch(err => {
    console.error(err);
});

export function handleResponse(resp) {
    if (resp !== null) {
        accountId = resp.account.homeAccountId;
        myMSALObj.setActiveAccount(resp.account);
        getAPIaccessToken();
        getGraphAccessToken();
        sessionStorage.setItem('userName', resp.account.idTokenClaims.given_name);
        sessionStorage.setItem('userEmail', resp.account.idTokenClaims.email.toLowerCase());
        sessionStorage.setItem('userUPN', resp.account.idTokenClaims.upn.toLowerCase())

    } else {
        const currentAccounts = myMSALObj.getAllAccounts();
        if (!currentAccounts || currentAccounts.length < 1) {
            return;
        } else if (currentAccounts.length > 1) {
            // Add choose account code here
        } else if (currentAccounts.length === 1) {
            const activeAccount = currentAccounts[0];
            myMSALObj.setActiveAccount(activeAccount);
            accountId = activeAccount.homeAccountId;
            // sessionStorage.setItem('userName', resp.account.idTokenClaims.given_name);

            getAPIaccessToken();
            getGraphAccessToken();
        }
    }
}

export async function signIn() {
    var loginRequest = {
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

export async function getAPIaccessToken() {
    var request = {
        // scopes: ["api://" + process.env.REACT_APP_CLIENT_ID + "/GO-Dashboard"]
        scopes: ["api://" + process.env.REACT_APP_CLIENT_ID + "/AWSM"]
    };

    return myMSALObj.acquireTokenSilent(request).then(
        response => {
            sessionStorage.setItem('apiAccessToken', response.accessToken)
                        // getUserUPN();
            store.dispatch(getUserProperties());
            return response.accessToken;
        },
    );

}


export async function getGraphAccessToken() {
    var request = {
        scopes: ["User.Read", "User.Read.All", "Directory.Read.All"]
    };

    return myMSALObj.acquireTokenSilent(request).then(
        response => {
            sessionStorage.setItem('graphAccessToken', response.accessToken)
            // getUserUPN();
            store.dispatch(getUserProperties());
            return response.accessToken;
        },
    );
}

function getRedirectURI() {
    var currentURL = window.location.href;
    var redirectURI;

    if (currentURL.includes("localhost")) {
        redirectURI = process.env.REACT_APP_REDIRECT_URI_LOCAL;
    }
    // else if (currentURL.includes("cloudfront")) {
    //     redirectURI = process.env.REACT_APP_REDIRECT_URI_CF;
    // }
    else {
        redirectURI = process.env.REACT_APP_REDIRECT_URI;
    }

    return redirectURI;
}

