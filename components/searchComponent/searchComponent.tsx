import React, { useEffect, useState } from 'react';
import { SearchBox } from 'react-instantsearch-dom';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import { InstantSearch } from 'react-instantsearch-dom';
import Results from './result';
import Modal from 'react-modal';
import styles from './searchComponent.module.css';
import IconSearch from '@components/icons/icon-search';
import { useRouter } from 'next/router';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    width: '100%',
    maxWidth: '800px',
    borderRadius: '8px',
    bottom: 'auto',
    backgroundColor: '#111111',
    padding: '2rem',
    transform: 'translate(-50%, -50%)',
    borderColor: '#555',
    boxShadow: '0 0 1px rgb(0 0 0 / 3%), 0 10px 32px -5px rgb(0 0 0 / 10%)'
  }
};

const searchClient = instantMeiliSearch(
  process.env.NEXT_PUBLIC_HOST_NAME || '',
  process.env.NEXT_PUBLIC_API_KEY
);

const AllSearch = () => {
  const router = useRouter();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (modalIsOpen) {
      setModalIsOpen(false);
    }
    // eslint-disable-next-line
  }, [router.asPath]);

  return (
    <>
      <InstantSearch indexName={'all'} searchClient={searchClient}>
        <button
          type="button"
          className={styles.searchIconButton}
          onClick={() => setModalIsOpen(!modalIsOpen)}
        >
          <IconSearch />
        </button>
        <Modal
          isOpen={modalIsOpen}
          style={customStyles}
          onRequestClose={() => setModalIsOpen(false)}
          ariaHideApp={false}
        >
          <label
            htmlFor="email-input-field"
            className={`${styles['input-label']} ais-searchbox-wrapper`}
          >
            <SearchBox />
          </label>
          <Results />
        </Modal>
      </InstantSearch>
    </>
  );
};

export default AllSearch;
