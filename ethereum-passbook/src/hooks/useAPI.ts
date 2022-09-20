import { HASURA_ADMIN_SECRET, HASURA_POSTGRES_DB_ENDPOINT } from "../constants";

/**
 * @function persistTransactions persists provided list of transactions to database
 * @param transactions a list of transactions
 * @returns
 */
export const persistTransactions = async (transactions: []) => {
  const queryString = `
    mutation insert_multiple_transactions {
      insert_transactions(
        objects: ${JSON.stringify(transactions)}
      ) {
          returning {
            hash
          }
        }
      }
  `.replace(/"(\w+)"\s*:/g, "$1:");

  return fetch(HASURA_POSTGRES_DB_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": HASURA_ADMIN_SECRET,
    },
    body: JSON.stringify({
      query: queryString,
    }),
  })
    .then((res) => res.json())
    .then((result) => console.log(result));
};
