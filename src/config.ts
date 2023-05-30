require('dotenv').config();

const GATEWAY_STAGING_URL = 'https://staging.protocol.mygateway.xyz/v1/graphql';
const GATEWAY_STAGING_GUM_ORG_ID = 'fb8f85a9-ca8b-49bb-8cb0-9f10da283777';
const GATEWAY_STAGING_DATA_MODEL_ID = '01ba3e7c-3de2-4b4f-a581-0197c1bf7860';

const GATEWAY_PROD_URL = 'https://protocol.mygateway.xyz/v1/graphql';
const GATEWAY_PROD_GUM_ORG_ID = '5363cd5f-1f99-420f-84ae-d7c7261cc45e';
const GATEWAY_PROD_DATA_MODEL_ID = '859a851d-5b94-4ef3-9f50-8e3070147986';

const GATEWAY_URL = process.env.NODE_ENV === 'production' ? GATEWAY_PROD_URL : GATEWAY_STAGING_URL;
const GUM_ORG_ID = process.env.NODE_ENV === 'production' ? GATEWAY_PROD_GUM_ORG_ID : GATEWAY_STAGING_GUM_ORG_ID;
const DATA_MODEL_ID = process.env.NODE_ENV === 'production' ? GATEWAY_PROD_DATA_MODEL_ID : GATEWAY_STAGING_DATA_MODEL_ID;

const API_KEY = process.env.API_KEY;
const BEARER_TOKEN = process.env.BEARER_TOKEN;

if (!API_KEY || !BEARER_TOKEN) {
  throw new Error('API_KEY or BEARER_TOKEN is not set');
}

export {
  GATEWAY_URL,
  GUM_ORG_ID,
  DATA_MODEL_ID,
  API_KEY,
  BEARER_TOKEN
};