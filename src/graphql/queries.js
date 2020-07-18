/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCalculation = /* GraphQL */ `
  query GetCalculation($id: ID!) {
    getCalculation(id: $id) {
      id
      calcInput
      createdAt
      updatedAt
    }
  }
`;
export const listCalculations = /* GraphQL */ `
  query ListCalculations(
    $filter: ModelCalculationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCalculations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        calcInput
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
