import { useEffect, useState } from 'react';
import { Header, Sidebar } from '../index';
import styles from './GlobalLayout.module.scss';

const GlobalLayout = ({ children }) => {
	return (
			<div className={styles.container}>
        <Sidebar />
				<div className={styles.content}>
					<Header />
					<main className={styles.main}>
						{ children }
					</main>
				</div>
			</div>
	)
};

export default GlobalLayout;