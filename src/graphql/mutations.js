/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCalculation = /* GraphQL */ `
  mutation CreateCalculation(
    $input: CreateCalculationInput!
    $condition: ModelCalculationConditionInput
  ) {
    createCalculation(input: $input, condition: $condition) {
      id
      calcInput
      createdAt
      updatedAt
    }
  }
`;
export const updateCalculation = /* GraphQL */ `
  mutation UpdateCalculation(
    $input: UpdateCalculationInput!
    $condition: ModelCalculationConditionInput
  ) {
    updateCalculation(input: $input, condition: $condition) {
      id
      calcInput
      createdAt
      updatedAt
    }
  }
`;
export const deleteCalculation = /* GraphQL */ `
  mutation DeleteCalculation(
    $input: DeleteCalculationInput!
    $condition: ModelCalculationConditionInput
  ) {
    deleteCalculation(input: $input, condition: $condition) {
      id
      calcInput
      createdAt
      updatedAt
    }
  }
`;
