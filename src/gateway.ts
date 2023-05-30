import { request, gql } from 'graphql-request';
import { DATA_MODEL_ID, GATEWAY_URL, GUM_ORG_ID, API_KEY, BEARER_TOKEN } from './config';


const issueGatewayBadge = async (userWallet: string, profileAddress: string, issuerAddress: string, badgeAddress: string, gumTld: string, appName: string, dateJoined: string) => {
  const mutation = gql`
    mutation createCredential(
      $profileAddress: String!,
      $issuerAddress: String!,
      $badgeAddress: String!,
      $gumTld: String!,
      $appName: String!,
      $dateJoined: String!
    ) {
      createCredential(
        createCredentialInput: {
          issuerOrganizationId: "${GUM_ORG_ID}",
          title: "Gateway Member", 
          description: "Credential to verifiably attest employment at Gateway", 
          recipientUserGatewayIdOrWallet: "${userWallet}", 
          tags: ["membership"], 
          dataModelId: "${DATA_MODEL_ID}", 
          claim: {
            profileAddress: $profileAddress,
            issuerAddress: $issuerAddress,
            badgeAddress: $badgeAddress,
            gumTld: $gumTld,
            appName: $appName,
            dateJoined: $dateJoined
          }
        }
      ) {
        id
        claim
      }
    }
  `;

  const variables = {
    profileAddress, 
    issuerAddress, 
    badgeAddress, 
    gumTld, 
    appName, 
    dateJoined
  };

  if (!API_KEY || !BEARER_TOKEN) {
    throw new Error('API_KEY or BEARER_TOKEN is not set');
  }

  try {
    const data = await request(GATEWAY_URL, mutation, variables, {
      'x-api-key': API_KEY,
      'authorization': `Bearer ${BEARER_TOKEN}`
    });

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const queryCredentialsByIssuerGatewayId = async (issuerGatewayId: string) => {
  const query = gql`
    query MyQuery($issuerGatewayId: String!) {
      findCredentialsByIssuerGatewayId(issuerGatewayId: $issuerGatewayId) {
        id
        issuerOrganization {
          id
          gatewayId
        }
        status
        claim
        dataModel {
          schema
        }
      }
    }
  `;

  const variables = {
    issuerGatewayId,
  };

  if (!API_KEY || !BEARER_TOKEN) {
    throw new Error('API_KEY or BEARER_TOKEN is not set');
  }

  const headers = {
    'authorization': `Bearer ${BEARER_TOKEN}`,
    'x-api-key': API_KEY
  };
  
  try {
    const data = await request(GATEWAY_URL, query, variables, headers);

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export {
  issueGatewayBadge,
  queryCredentialsByIssuerGatewayId
};