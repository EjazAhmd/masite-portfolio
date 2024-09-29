import React from 'react'; 
import { Layout, Button, Input, Form } from 'antd';
import Sidebar from './components/sidebar';
import styles from '../styles/navigation.module.css';
import Navbar from './components/navbar';

const { Content } = Layout;

const NavigationPage: React.FC = () => {
    return (
        <Layout className={styles.navContainer}>
            <Sidebar />
            <Layout className={styles.mainLayout}>
                <Navbar accentColor={''} primaryFontFamily={''} secondaryFontFamily={''} />
                <Content className={styles.contentContainer}>
                    <div className={styles.siteDesignContainer}>
                        <h1 className={styles.title}>Navigation</h1>
                        <Form layout="vertical">
                            <div className={styles.section}>
                                <h3 className={styles.subtitle}>Display Name</h3>
                                <Form.Item label="First name">
                                    <Input className={styles.customInput} placeholder="John" />
                                </Form.Item>
                                <Form.Item label="Last name">
                                    <Input className={styles.customInput} placeholder="Doe" />
                                </Form.Item>
                            </div>
                            <div className={styles.section}>
                                <h3 className={styles.subtitle}>Navigation Links</h3>
                                <Form.Item label="About">
                                    <Input className={styles.customInput} placeholder="#about" />
                                </Form.Item>
                                <Form.Item label="Articles">
                                    <Input className={styles.customInput} placeholder="#articles" />
                                </Form.Item>
                                <Form.Item label="Projects">
                                    <Input className={styles.customInput} placeholder="#projects" />
                                </Form.Item>
                                <Form.Item label="Talks">
                                    <Input className={styles.customInput} placeholder="#talks" />
                                </Form.Item>
                            </div>
                            <div className={styles.section}>
                                <h3 className={styles.subtitle}>Contact Button</h3>
                                <Form.Item label="Button text">
                                    <Input className={styles.customInput} placeholder="Contact Us" />
                                </Form.Item>
                            </div>
                            <Button className={styles.customButton}>
                                Update 
                            </Button>
                        </Form>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default NavigationPage;
