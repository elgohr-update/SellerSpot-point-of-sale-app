import React, { useState } from 'react';
import leftNavStyles from './leftnav.module.css';
import { FaBoxOpen, FaCashRegister, IoMdCart } from 'react-icons/all';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../../../../config/routes';

interface INavItem {
    style: React.CSSProperties;
    Icon: React.ComponentType;
    title: string;
    active: boolean;
    route: string;
    onClick: () => void;
}

const NavItem = ({ Icon, style, onClick, title, active }: INavItem): JSX.Element => {
    return (
        <div
            className={`${leftNavStyles.navItem} ${active ? leftNavStyles.navItemActive : ''}`}
            style={style}
            onClick={onClick}
        >
            <div className={leftNavStyles.navIcon}>
                <Icon />
            </div>
            <div className={leftNavStyles.navTitle}>{title}</div>
        </div>
    );
};

export const LeftNav = (): JSX.Element => {
    const history = useHistory();
    const [currentNavRoute, setCurrentNavRoute] = useState(history.location.pathname);
    history.listen((location) => {
        setCurrentNavRoute(location.pathname);
    });

    const navItem: Omit<INavItem, 'active' | 'onClick'>[] = [
        {
            Icon: IoMdCart,
            style: {
                color: 'var(--sales-color)',
            },
            title: 'sales',
            route: ROUTES.SALES,
        },
        {
            Icon: FaBoxOpen,
            style: {
                color: 'var(--inventory-color)',
            },
            title: 'inventory',
            route: ROUTES.INVENTORY,
        },
        {
            Icon: FaCashRegister,
            style: {
                color: 'var(--cashregister-color)',
            },
            title: 'cash register',
            route: ROUTES.CASH_REGISTER,
        },
    ];
    return (
        <div className={leftNavStyles.leftNavWrapper}>
            <div className={leftNavStyles.contentWrapper}>
                <div className={leftNavStyles.storeNameHolder}>Store Name</div>
                {navItem.map((item, key) => (
                    <NavItem
                        key={key}
                        Icon={item.Icon}
                        style={item.style}
                        onClick={() => history.push(item.route)}
                        title={item.title}
                        route={item.route}
                        active={item.route === currentNavRoute}
                    />
                ))}
            </div>
        </div>
    );
};
