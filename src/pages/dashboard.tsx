import React from 'react';
import { Layout } from 'antd';
import { useSession, signIn } from 'next-auth/react';
import { useColors } from '../pages/colorcontex'; 
import Sidebar from '../pages/components/sidebar';  
import SiteDesign from '../pages/components/sideDesign'; 
import Navbar from '../pages/components/navbar'; 
import styles from '../styles/dashboard.module.css';  

const { Content } = Layout;

const Dashboard: React.FC = () => {
  const { status } = useSession();
  const {
    accentColor,
    backgroundColor,
    secondaryFontColor,
  } = useColors();  

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    signIn();
    return null;
  }

  return (
    <Layout className={styles.dashboardContainer} style={{ backgroundColor: backgroundColor }}>
      <Sidebar />
      <Layout className={styles.mainLayout} style={{ backgroundColor: backgroundColor }}>
    
          <Navbar accentColor={accentColor} primaryFontFamily={''} secondaryFontFamily={''} /> 
    
        <Content className={styles.content} style={{ color: secondaryFontColor }}>
        </Content>
      </Layout>
      <SiteDesign />
    </Layout>
  );
};
export default Dashboard;

