import { gql } from "@apollo/client";

const GET_CLIENTS = gql`
  query {
    clients {
      id
      name
      email
      phone
    }
  }
`;

const GET_CLIENT = gql`
  query getClient($id: ID!) {
    client(id: $id) {
      name
      email
      phone
    }
  }
`;

export { GET_CLIENTS, GET_CLIENT };
