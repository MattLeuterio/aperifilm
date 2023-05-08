import theme from '../../theme';
import { ActionButtonsContainer, TabsContainer } from './style';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
import { useState } from 'react';
import Icon from '../Icon';
import { Router } from 'next/router';
import { HeartIcon } from '@heroicons/react/outline';
import Button from '../Button';
import { useEffect } from 'react';

export const defaultTabsList = [
	{
		id: 'movie',
		label: 'productTypeFilm',
		icon: null
	},
	{
		id: 'tv',
		label: 'productTypeTvSeries',
		icon: null
	}
]

const Tabs = ({
	className, sizeButtons, tabsList, selected, onChange, number, disabled, isSearch, iconFill, iconStroke
}) => {
	const [selectedTab, setSelectedTab] = useState(false);

	useEffect(() => {
		setSelectedTab(selected);
	}, [selected])


	const handleOnClickTab = (tab) => {
		setSelectedTab(tab);
		if (onChange) onChange(tab)
	}

		return (
			<TabsContainer className={className}>
				{tabsList?.map((tab, index) => (
					<Button
						key={index}
						disabled={isSearch && !tab?.number}
						hide={isSearch && !tab?.number}
						number={tab?.number || 0}
						size={sizeButtons}
						iconFill={iconFill}
						iconStroke={iconStroke}
						className="collection-action-btn"
						handleOnClick={() => handleOnClickTab(tab)}
						active={tab.id === selectedTab.id}
						text={tab.label}
					>
						{tab.icon && (
							<>
								{tab.icon}
							</>
						)}
					</Button>
				))}
			</TabsContainer>
		)
};

Tabs.defaultProps = {
}

export default Tabs;