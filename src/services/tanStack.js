import axios from 'axios';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';

export const getContacts = async () => {
  let data = [];
  await axios
    .get('https://65b36193770d43aba479a2f2.mockapi.io/users')
    .then((res) => {
      data = res.data;
    });
  return data;
};

export const getContactDetails = async (id) => {
  let data = {};
  if (!id) return data;

  await axios
    .get(`https://65b36193770d43aba479a2f2.mockapi.io/users/${id}`)
    .then((res) => {
      data = res.data;
    });
  return data;
};

export const addNewContact = async (payload) => {
  let data = {};

  await axios
    .post(`https://65b36193770d43aba479a2f2.mockapi.io/users`, payload)
    .then((res) => {
      data = res.data;
    });
  return data;
};

export const deleteContact = async (id) => {
  let data = {};

  await axios
    .delete(`https://65b36193770d43aba479a2f2.mockapi.io/users/${id}`)
    .then((res) => {
      data = res.data;
    });
  return data;
};

export function useAddNewContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => addNewContact(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['contacts', 'list'] });
    },
  });
}

export function useDeleteContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteContact(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['contacts', 'list'] });
      await queryClient.invalidateQueries({
        queryKey: ['contacts', 'details', id],
      });
    },
  });
}

export function useContacts() {
  return useQuery({ queryKey: ['contacts', 'list'], queryFn: getContacts });
}

export function useContactDetails(id) {
  return useQuery({
    queryKey: ['contacts', 'detail', id],
    queryFn: () => getContactDetails(id),
  });
}
