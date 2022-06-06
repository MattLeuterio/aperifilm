import { useEffect, useState } from 'react';
import { Header, Sidebar } from '../index';
import styles from './GlobalLayout.module.scss';

const GlobalLayout = ({ children }) => {
	const [allVocabulary, setAllVocabulary] = useState([]);
	const [languageSelected, setLanguageSelected] = useState('en');

	// const getVocabulary = () => {
	// 	return fetch('/api/vocabulary')
	// 	.then(res => res.json())
	// 	.then(data => data);
	// }

	// useEffect(() => {
	// 	getVocabulary().then(res => setAllVocabulary(res));
	// }, []);

	// useEffect(() => {
	// 	const listVocabulary = allVocabulary.reduce((acc, obj) => {
	// 		console.log(obj.fields);
	// 		return [
	// 			...acc,
	// 			{
	// 				value: obj.fields.value,
	// 				label: obj.fields[`${languageSelected}_label`]
	// 			}
	// 		]
	// 	}, [])

	// 	console.log('listVocabulary', listVocabulary);
	// }, [allVocabulary]);

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