import React from 'react';
import PropTypes from 'prop-types';
import Navbar from '#src/components/Navbar';
import styles from './index.scss';

const Page = ({children})=> (
  <div>
    <Navbar />
    <div className={styles.page}>{children}</div>
  </div>
);
Page.propTypes = {
  children: PropTypes.any
};

export default Page;
