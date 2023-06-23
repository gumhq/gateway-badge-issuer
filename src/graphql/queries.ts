import { gql } from 'graphql-request';

export const FIND_CREDENTIALS_BY_ISSUER_GATEWAY_ID = gql`
  query findCredentialsByIssuerGatewayId($issuerGatewayId: String!) {
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

export const FIND_CREDENTIALS_BY_CREDENTIAL_ID = gql`
  query findCredentialById($id: String!) {
      credential(id: $id) {
        id
        issuerOrganization {
          id
          gatewayId
          description
        }
        claim
        status
        recipientUser {
          gatewayId
          primaryWallet {
            address
            chain
            primary
            id
          }
        }
      }
    }
`;

export const FIND_USER_CREDENTIALS_BY_WALLET_ADDRESS = gql`
  query findUserCredentialsByWalletAddress($wallet: String!) {
      userByWallet(wallet: $wallet) {
        gatewayId
        id
        status
        updatedAt
        arweaveUrl
        createdAt
        receivedCredentials {
          claim
          createdAt
          id
          issuerOrganization {
            gatewayId
            id
            description
          }
        }
      }
    }
`;
