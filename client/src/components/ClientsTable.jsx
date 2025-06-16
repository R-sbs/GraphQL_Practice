import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@@/components/ui/table";
import { Button } from "./ui/button";
import { gql, useMutation, useQuery } from "@apollo/client";
import Spinner from "./Spinner";
import { GET_CLIENTS } from "@/graphQL/client.query";
import { Trash, Trash2, Variable } from "lucide-react";
import { DELETE_CLIENT } from "@/graphQL/client.mutation";

const ClientsTable = (props) => {
  const { loading, error, data } = useQuery(GET_CLIENTS);
  const [deleteClient, { data: deleteData }] = useMutation(DELETE_CLIENT, {
    refetchQueries: [GET_CLIENTS],
  });

  const clients = data?.clients || [];

  if (error) {
    console.log("ERROR", error);
  }

  const handleDelete = (clientId) => {
    console.log(clientId);
    deleteClient({ variables: { id: clientId } });
  };

  if (loading) return <Spinner />;

  return (
    <Table {...props}>
      <TableCaption>A list of your Clients</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">S.I.</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>email</TableHead>
          <TableHead>phone</TableHead>
          <TableHead className="text-right">Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clients &&
          clients.map((client, index) => (
            <TableRow key={client.name}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{client.name}</TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell>{client.phone}</TableCell>
              <TableCell className="flex justify-end">
                <Button type="button" variant='ghost' className='group hover:bg-red-600 p-0' onClick={() => handleDelete(client.id)}>
                  <Trash2 className="text-red-600 group-hover:text-white" size={16} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default ClientsTable;
