export interface AuthStateInterface {
  appId: string | null;
  apiKey: string | null;
  token: string | null;
}

function state(): AuthStateInterface {
  return {
    appId: null,
    apiKey: null,
    token: null,
  };
}

export default state;
