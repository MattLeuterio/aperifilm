import { FormattedMessage } from "react-intl";
import { Link, MenuContainer, MenuSection, MenuSectionLinks, SidebarContainer } from "./style";
import Montserrat from "../../typography/montserrat";
import { ActiveLink, Icon } from "../../atoms";
import theme from "../../theme";
import { infoRoutes, primaryRoutes, userRoutes } from "../../routes";
import { useSelector } from "react-redux";

const Sidebar = () => {
	const user = useSelector((state) => state.userData);

	return (
			<SidebarContainer className="sidebar">
				<MenuContainer>
					<MenuSection>
						<Montserrat type="sidebarMenuSectionTitle">
							<FormattedMessage defaultMessage={"sidebarMenuTitle"} id={"sidebarMenuTitle"} />
						</Montserrat>
						<MenuSectionLinks>
							{primaryRoutes?.map((route, index) => (
								<ActiveLink key={index} activeClassName="active" href={route.to}>
									<div className="link">
										<Icon
											stroke="transparent"
											fill={theme.colors.element.dark}
										>
											{route.icon}
										</Icon>
										<a className="nav-link">
											<FormattedMessage defaultMessage={route.title} id={route.title} />
										</a>
									</div>
								</ActiveLink>
							))}
						</MenuSectionLinks>
						{user?.email && (
							<>
								<Montserrat type="sidebarMenuSectionTitle">
									<FormattedMessage defaultMessage={"sidebarYourListTitle"} id={"sidebarYourListTitle"} />
								</Montserrat>
								<MenuSectionLinks>
									{userRoutes?.map((route, index) => (
										<ActiveLink key={index} activeClassName="active" href={route.to}>
											<div className="link">
												<Icon
													stroke="transparent"
													fill={theme.colors.element.dark}
												>
													{route.icon}
												</Icon>
												<a className="nav-link">
													<FormattedMessage defaultMessage={route.title} id={route.title} />
												</a>
											</div>
										</ActiveLink>
									))}
								</MenuSectionLinks>
							</>
						)}
						<MenuSectionLinks>
							{infoRoutes?.map((route, index) => (
								<ActiveLink key={index} activeClassName="active" href={route.to}>
									<div className="link">
										<Icon
											stroke="transparent"
											fill={theme.colors.element.dark}
										>
											{route.icon}
										</Icon>
										<a className="nav-link">
											<FormattedMessage defaultMessage={route.title} id={route.title} />
										</a>
									</div>
								</ActiveLink>
							))}
						</MenuSectionLinks>
					</MenuSection>
				</MenuContainer>
			</SidebarContainer>
	)
};

export default Sidebar;