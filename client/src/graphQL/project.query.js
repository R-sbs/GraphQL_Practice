import { gql } from "@apollo/client";
const GET_PROJECTS = gql`
  query {
    projects {
      name
      status
      client {
        name
      }
    }
  }
`;

const GET_PROJECT = gql`
  query getProject($id: ID!) {
    project(id: $id) {
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

export { GET_PROJECTS, GET_PROJECT };
