export const ETHSCAN_API_ENDPOINT = "https://api.etherscan.io/api";
export const ETHSCAN_GET_TRANSACTIONS_API_ENDPOINT =
  "?module=account&action=txlist&startblock=0&endblock=99999999&sort=asc&offset=20&apikey=" +
  process.env.ETHSCAN_API_KEY;
export const HASURA_POSTGRES_DB_ENDPOINT =
  "https://stable-sunbird-40.hasura.app/v1/graphql";
