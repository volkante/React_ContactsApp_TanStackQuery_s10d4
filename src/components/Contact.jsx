import React from 'react';
import { useParams } from 'react-router-dom';
import { useContactDetails } from '../services/tanStack';
import { useDeleteContact } from '../services/tanStack';
import { useHistory } from 'react-router-dom';

export default function Contact() {
  const { contactId } = useParams();
  const { data: contact, isPending, error } = useContactDetails(contactId); //data as contacts
  const deleteContactMutation = useDeleteContact();
  const history = useHistory();

  if (isPending) return 'Loading';

  if (error) return 'An error has occured...';

  return (
    <div id="contact">
      <div>
        <img key={contact.avatar} src={contact.avatar || null} />
      </div>

      <div>
        <h1 data-testid="full_name">
          {contact.first_name || contact.last_name ? (
            <>
              {contact.first_name} {contact.last_name}
            </>
          ) : (
            <i>No Name</i>
          )}{' '}
        </h1>

        {contact.email && (
          <p>
            <a target="_blank" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
          </p>
        )}

        {contact.description && <p>{contact.description}</p>}

        <div>
          <button
            className="delete"
            onClick={() => {
              deleteContactMutation.mutate(contactId);
              history.push('/');
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
