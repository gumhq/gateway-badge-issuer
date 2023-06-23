import { CREATE_CREDENTIAL } from './graphql/mutations';
import { FIND_CREDENTIALS_BY_CREDENTIAL_ID, FIND_CREDENTIALS_BY_ISSUER_GATEWAY_ID, FIND_USER_CREDENTIALS_BY_WALLET_ADDRESS } from './graphql/queries';
import { callApi } from './services/api';

export const issueGatewayBadge = async (userWallet: string, profileAddress: string, issuerAddress: string, badgeAddress: string, gumTld: string, appName: string, dateJoined: string) => {
  const variables = {
    profileAddress, 
    issuerAddress, 
    badgeAddress, 
    gumTld, 
    appName, 
    dateJoined,
    recipientUserGatewayIdOrWallet: userWallet
  };

  try {
    const data = await callApi(CREATE_CREDENTIAL, variables);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const queryCredentialsByIssuerGatewayId = async (issuerGatewayId: string) => {
  const variables = {
    issuerGatewayId
  };

  try {
    const data = await callApi(FIND_CREDENTIALS_BY_ISSUER_GATEWAY_ID, variables);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const queryCredentialsByCredentialId = async (credentialId: string) => {
  const variables = {
    id: credentialId,
  };

  try {
    const data = await callApi(FIND_CREDENTIALS_BY_CREDENTIAL_ID, variables);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const queryCredentialsByUserWallet = async (userWallet: string) => {
  const variables = {
    wallet: userWallet,
  };

  try {
    const data = await callApi(FIND_USER_CREDENTIALS_BY_WALLET_ADDRESS, variables);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
