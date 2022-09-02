// <!--Add buttons to initiate auth sequence and sign out-->
// <button id="authorize_button" onclick="handleAuthClick()">Authorize</button>
// <button id="signout_button" onclick="handleSignoutClick()">Sign Out</button>

/* exported gapiLoaded */
/* exported gisLoaded */
/* exported handleAuthClick */
/* exported handleSignoutClick */

// TODO(developer): Set to client ID and API key from the Developer Console
const CLIENT_ID =
  '650975721235-81qfqcr0vui92b5l28lckmclljkolh47.apps.googleusercontent.com';
const API_KEY = 'AIzaSyCjwwUfOFR95aTaf_Zch-TlEEyS-pTRYxM';

// Discovery doc URL for APIs used by the quickstart
const DISCOVERY_DOC = 'https://gmail.googleapis.com/$discovery/rest?version=v1';
// 'https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest';

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES =
  'https://www.googleapis.com/auth/gmail.readonly, https://www.googleapis.com/auth/calendar.events';

let tokenClient;
let gapiInited = false;
let gisInited = false;

/**
 * Callback after api.js is loaded.
 */
function gapiLoaded() {
  gapi.load('client', intializeGapiClient);
}

/**
 * Callback after the API client is loaded. Loads the
 * discovery doc to initialize the API.
 */
async function intializeGapiClient() {
  await gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: [DISCOVERY_DOC],
  });
  gapiInited = true;
  // maybeEnableButtons();
}

/**
 * Callback after Google Identity Services are loaded.
 */
function gisLoaded() {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: '', // defined later
  });
  gisInited = true;
  // maybeEnableButtons();
}

/**
 * Enables user interaction after all libraries are loaded.
 */
// function maybeEnableButtons() {
//   if (gapiInited && gisInited) {
//     document.getElementById('authorize_button').style.visibility = 'visible';
//   }
// }

/**
 *  Sign in the user upon button click.
 */
export function handleAuthClick() {
  tokenClient.callback = async (resp) => {
    if (resp.error !== undefined) {
      throw resp;
    }
    // document.getElementById('signout_button').style.visibility = 'visible';
    // document.getElementById('authorize_button').innerText = 'Refresh';
    await listLabels();
  };

  if (gapi.client.getToken() === null) {
    // Prompt the user to select a Google Account and ask for consent to share their data
    // when establishing a new session.
    tokenClient.requestAccessToken({ prompt: 'consent' });
  } else {
    // Skip display of account chooser and consent dialog for an existing session.
    tokenClient.requestAccessToken({ prompt: '' });
  }
}

/**
 *  Sign out the user upon button click.
 */
export function handleSignoutClick() {
  const token = gapi.client.getToken();
  if (token !== null) {
    google.accounts.oauth2.revoke(token.access_token);
    gapi.client.setToken('');
    // document.getElementById('content').innerText = '';
    // document.getElementById('authorize_button').innerText = 'Authorize';
    // document.getElementById('signout_button').style.visibility = 'hidden';
  }
}

/**
 * Print all Labels in the authorized user's inbox. If no labels
 * are found an appropriate message is printed.
 */
async function listLabels() {
  let response;
  try {
    response = await gapi.client.gmail.users.labels.list({
      userId: 'me',
    });
  } catch (err) {
    // document.getElementById('content').innerText = err.message;
    console.log(err.message);
    return;
  }
  const labels = response.result.labels;
  if (!labels || labels.length == 0) {
    // document.getElementById('content').innerText = 'No labels found.';
    console.log('no labels found');
    return;
  }
  // Flatten to string to display
  const output = labels.reduce(
    (str, label) => `${str}${label.name}\n`,
    'Labels:\n'
  );
  // document.getElementById('content').innerText = output;
  console.log('LABELS: ', output);
}
