import React from 'react';
import { Layout, Menu, Typography } from 'antd';
import { AppstoreOutlined, UserOutlined } from '@ant-design/icons';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router'; 
import Image from 'next/image'; // Import Image from next/image
import styles from '../../styles/sidebar.module.css';  

const { Sider } = Layout;
const { Text } = Typography;

const Sidebar: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter(); 

  return (
    <Sider width={250} className={styles.sidebarContainer} theme='light'>
      <div className={styles.userProfile}>
        <Image
          src={session?.user?.image || '/public/img/markkk-logo.png'} // Use Image component
          alt="User Profile" // Add alt text for accessibility
          width={40} // Set the width
          height={40} // Set the height
          className={styles.img} // Control size via CSS if needed
        />
        <div className={styles.userInfo}>
          <Text strong className={styles.userName}>
            {session?.user?.name || 'Guest'}
          </Text>
          <Text type="secondary" className={styles.userEmail}>
            {session?.user?.email || 'guest@example.com'}
          </Text>
        </div>
      </div>

      <Menu mode="inline" defaultSelectedKeys={['1']} className={styles.menu}>
        <Menu.Item key="1" icon={<AppstoreOutlined />} onClick={() => router.push('/dashboard')}>
          Site Design
        </Menu.Item>
        <Menu.SubMenu key="sub1" icon={<UserOutlined />} title="Sections">
          <Menu.Item key="2" onClick={() => router.push('/navigation')}>Navigation</Menu.Item>
          <Menu.Item key="3" onClick={() => router.push('/about')}>About</Menu.Item>
          <Menu.Item key="4" onClick={() => router.push('/articles')}>Articles</Menu.Item>
          <Menu.Item key="5" onClick={() => router.push('/projects')}>Projects</Menu.Item>
          <Menu.Item key="6" onClick={() => router.push('/presentations')}>Presentations</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
