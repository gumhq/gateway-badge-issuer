import { gql } from 'graphql-request';
import { DATA_MODEL_ID, GUM_ORG_ID } from '../config';

export const CREATE_CREDENTIAL = gql`
  mutation createCredential(
    $profileAddress: String!,
    $issuerAddress: String!,
    $badgeAddress: String!,
    $gumTld: String!,
    $appName: String!,
    $dateJoined: String!
    $recipientUserGatewayIdOrWallet: String!
    ) {
      createCredential(
        createCredentialInput: {
          issuerOrganizationId: "${GUM_ORG_ID}",
          title: "Gateway Member", 
          description: "Credential to verifiably attest employment at Gateway", 
          recipientUserGatewayIdOrWallet: $recipientUserGatewayIdOrWallet", 
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