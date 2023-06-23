import { request } from 'graphql-request';
import { GATEWAY_URL, API_KEY, BEARER_TOKEN } from '../config';

export const callApi = async (query: string, variables: any) => {
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
