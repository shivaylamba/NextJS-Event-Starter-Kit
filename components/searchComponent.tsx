import React, { useState } from 'react';
import { SearchBox } from 'react-instantsearch-dom';
import cn from 'classnames';
import Modal from 'react-modal';
import styles from './searchComponent.module.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    backgroundColor: '#111111',
    padding: '2rem',
    transform: 'translate(-50%, -50%)',
    borderColor: 'none'
  }
};

const AllSearch = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  return (
    <>
      <button
        type="button"
        className={styles.searchIconButton}
        onClick={() => setModalIsOpen(!modalIsOpen)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M23.111 20.058l-4.977-4.977c.965-1.52 1.523-3.322 1.523-5.251 0-5.42-4.409-9.83-9.829-9.83-5.42 0-9.828 4.41-9.828 9.83s4.408 9.83 9.829 9.83c1.834 0 3.552-.505 5.022-1.383l5.021 5.021c2.144 2.141 5.384-1.096 3.239-3.24zm-20.064-10.228c0-3.739 3.043-6.782 6.782-6.782s6.782 3.042 6.782 6.782-3.043 6.782-6.782 6.782-6.782-3.043-6.782-6.782zm2.01-1.764c1.984-4.599 8.664-4.066 9.922.749-2.534-2.974-6.993-3.294-9.922-.749z" />
        </svg>
      </button>
      <Modal isOpen={modalIsOpen} style={customStyles} onRequestClose={() => setModalIsOpen(false)}>
        <label htmlFor="email-input-field" className={styles['input-label']}>
          <SearchBox />
        </label>
      </Modal>
    </>
  );
};

export default AllSearch;
