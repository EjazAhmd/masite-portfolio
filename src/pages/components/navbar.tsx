import React from "react"; 
import { Button } from "antd";
import styles from '../../styles/navbar.module.css';
import { useSession } from "next-auth/react";
import { PhoneOutlined } from '@ant-design/icons';
import { useColors } from '../colorcontex';

interface NavProps {
    accentColor: string;
    primaryFontFamily: string;
    secondaryFontFamily: string;
}

const Nav: React.FC<NavProps> = ({ accentColor, primaryFontFamily, secondaryFontFamily }) => {
    const { data: session } = useSession();
    const { primaryFontColor, secondaryFontColor } = useColors(); // Access primary and secondary font colors

    return (
        <header className={styles.header}>
            <nav className={styles.topnav}>
                <div className={styles.hamburger}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <h2
                 className={styles.siteTitle}
                 style={{ color: primaryFontColor, fontFamily: primaryFontFamily }}
                >
                 {session?.user?.name ? session.user.name.toUpperCase() : "Anonymous"}
               </h2>

                <ul className={styles.navList}>
                    <li><a href="#About" style={{ color: secondaryFontColor, fontFamily: secondaryFontFamily }}>About</a></li>
                    <li><a href="#Article" style={{ color: secondaryFontColor, fontFamily: secondaryFontFamily }}>Articles</a></li>
                    <li><a href="#Project" style={{ color: secondaryFontColor, fontFamily: secondaryFontFamily }}>Project</a></li>
                    <li><a href="#Presentations" style={{ color: secondaryFontColor, fontFamily: secondaryFontFamily }}>Presentations</a></li>
                </ul>
                <Button className={styles.customButton} icon={<PhoneOutlined />} style={{ backgroundColor: accentColor, borderColor: accentColor }}>
                    For Contact Us 
                </Button>
            </nav>
        </header>
    );
};

export default Nav;
