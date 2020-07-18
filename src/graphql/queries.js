/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCalculations = /* GraphQL */ `
  query GetCalculations($id: ID!) {
    getCalculations(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const listCalculationss = /* GraphQL */ `
  query ListCalculationss(
    $filter: ModelCalculationsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCalculationss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
