/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCalculations = /* GraphQL */ `
  mutation CreateCalculations(
    $input: CreateCalculationsInput!
    $condition: ModelCalculationsConditionInput
  ) {
    createCalculations(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const updateCalculations = /* GraphQL */ `
  mutation UpdateCalculations(
    $input: UpdateCalculationsInput!
    $condition: ModelCalculationsConditionInput
  ) {
    updateCalculations(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const deleteCalculations = /* GraphQL */ `
  mutation DeleteCalculations(
    $input: DeleteCalculationsInput!
    $condition: ModelCalculationsConditionInput
  ) {
    deleteCalculations(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
