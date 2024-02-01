import React from 'react';
import style from './Header.module.css'
import {NavLink} from "react-router-dom";

const Header = () => {
	return (
		<div className={style.headerContainer}>
			<div className={style.linkContainer}>
				<NavLink to='/' className={({isActive}) => isActive ? style.pageSuccess : style.linkPage}>All Cats</NavLink>
				<NavLink to='/favoriteCats/' className={({isActive}) => isActive ? style.pageSuccess : style.linkPage}>Favorite Cats</NavLink>
			</div>
		</div>
	);
};

export default Header;

// {({isActive}) => isActive ? style.pageSuccess : style.linkPage}