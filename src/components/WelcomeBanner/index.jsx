import theme from '../../theme';
import { Welcome, WelcomeBannerContainer, WelcomeDescription, WelcomeTitle } from './style';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
import { useEffect, useState } from 'react';
import { Icon, Image } from '../../atoms';
import { Router } from 'next/router';
import { XCircleIcon } from '@heroicons/react/outline';
import AperitifBottleWhite from "../../assets/icons/aperitif-bottle-disable.png"
import AperitifBottleHalf from "../../assets/icons/aperitif-bottle-half.png"
import Montserrat from '../../typography/montserrat';
import IconWelcome from "../../assets/icons/apericheers-red.png";
import { useSelector } from 'react-redux';


const WelcomeBanner = ({
	className, active, size, action, product
}) => {
	const [welcomeVisible, setWelcomeVisible] = useState(true);

	const userLanguageState = useSelector((state) => state.userData.language);

	return (
		<>
			{welcomeVisible && (
				<WelcomeBannerContainer
				>
					<Welcome>
						<Icon
							className="welcome-close-icon"
							handleOnClick={() => setWelcomeVisible(false)}
							stroke={theme.colors.element.dark}
							fill="transparent"
							width="25px"
							height="25px"
						>
							<XCircleIcon />
						</Icon>
						<WelcomeTitle>
						<Image
							className="apericheers-red-icon" 
							src={IconWelcome.src}
							alt="aperifilm.com logo" 
							width="32px"
							layout="fixed" 
						/>
							<Montserrat htmlAttribute={'span'} type="h1">
								{userLanguageState === 'it' ? 'Benvenuto!' : 'Welcome!'}
							</Montserrat>
						</WelcomeTitle>
						<WelcomeDescription>
							<Montserrat type="h1">
								{userLanguageState === 'it' ? (
									<Montserrat configuration={{lineHeight: '17px'}}>
										<Link href="/api/auth/login">
											<a>
												<Montserrat htmlAttribute={'span'} type="link">Crea il tuo account</Montserrat>
											</a>
										</Link>
										e tieni traccia di tutti i <strong>film</strong> e le <strong>serie tv</strong> sulle quali hai messo gli occhi. <br />
										Vota usando i nostri <Montserrat htmlAttribute={'span'} configuration={{color: theme.colors.mainBrandColors.dark, fontStyle: 'italic'}}>Aperitivini</Montserrat> che contengono la vitamina F (Felicitina). Tutto completamente gratuito.
									</Montserrat>
								) : (
									<Montserrat configuration={{lineHeight: '17px'}}>
										<Link href="/api/auth/login">
											<a>
												<Montserrat htmlAttribute={'span'} type="link">Crea il tuo account</Montserrat>
											</a>
										</Link>
										INGLESE <strong>film</strong> e le <strong>serie tv</strong> sulle quali hai messo gli occhi. <br />
										Vota usando i nostri <Montserrat htmlAttribute={'span'} configuration={{color: theme.colors.mainBrandColors.dark, fontStyle: 'italic'}}>Aperitivini</Montserrat> che contengono la vitamina F (Felicitina). Tutto completamente gratuito.
									</Montserrat>
								)}
							</Montserrat>
						</WelcomeDescription>
					</Welcome>
				</WelcomeBannerContainer>
			)}
		</>
	)
};


WelcomeBanner.defaultProps = {
}

export default WelcomeBanner;