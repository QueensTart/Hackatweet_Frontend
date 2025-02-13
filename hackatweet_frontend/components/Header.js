import { useEffect, useState } from "react";

import { Modal } from 'antd';
import Link from 'next/link';

import styles from "../styles/Header.module.css";

function Header()
{
    return (
       <img className={styles.banner} src="banner.png" alt = "banner"/>
    );

}

export default Header;