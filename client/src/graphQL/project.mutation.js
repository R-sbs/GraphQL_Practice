import { gql } from "@apollo/client";

const ADD_PROJECT = gql`
  mutation addProject($name: string!, $description: string, $status: string, clientId: ID!) {
    addProject {
      name
      description
      status
      client {
        name
        id
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
