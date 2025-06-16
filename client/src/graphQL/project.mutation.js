import { gql } from "@apollo/client";

const ADD_PROJECT = gql`
  mutation addProject($name: String!, $description: String!, $status: ProjectStatus!, $clientId: ID!) {
    addProject ( name: $name, description: $description, status: $status, clientId: $clientId) {
      name
      description
      status
      client {
        id
        name
      }
    }
  }
`;

const DELETE_PROJECT = gql`
  mutation deleteProject($id: ID!) {
    deleteProject(id: $id) {
      name
      description
      client {
        id
        name
      }
      status
    }
  }
`;

export { DELETE_PROJECT, ADD_PROJECT };
