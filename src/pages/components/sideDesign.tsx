import React, { useEffect } from 'react';
import styles from '../../styles/sideDesign.module.css';
import { Button, ColorPicker } from 'antd'; 
import { useColors } from '../colorcontex';


const SiteDesign: React.FC = () => {
  const {
    accentColor,
    backgroundColor,
    primaryFontColor,
    secondaryFontColor,
    primaryFontFamily,
    secondaryFontFamily,
    setAccentColor,
    setBackgroundColor,
    setPrimaryFontColor,
    setSecondaryFontColor,
    setPrimaryFontFamily,
    setSecondaryFontFamily,
  } = useColors();

  useEffect(() => {
    const root = document.documentElement;  
    root.style.setProperty('--background-color', backgroundColor);
    root.style.setProperty('--primary-font-color', primaryFontColor);
    root.style.setProperty('--secondary-font-color', secondaryFontColor);
    root.style.setProperty('--primary-font-family', primaryFontFamily);
    root.style.setProperty('--secondary-font-family', secondaryFontFamily);
  }, [backgroundColor, primaryFontColor, secondaryFontColor, primaryFontFamily, secondaryFontFamily]);
  
  const updatePreferences = () => {
    console.log("Updating Preferences:");
    console.log("Accent Color:", accentColor);
    console.log("Background Color:", backgroundColor);
    console.log("Primary Font Color:", primaryFontColor);
    console.log("Secondary Font Color:", secondaryFontColor);
  };

  return (
    <div className={styles.siteDesignContainer}>
      <h2 className={styles.title}>Site Design</h2>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Colors</h3>
        <ul className={styles.colorList}>
          <li>
            <span>Accent</span>
            <ColorPicker
              value={accentColor} 
              onChange={(color) => setAccentColor(color.toHexString())} // Use toHexString() for compatibility
               
            />
          </li>
          <li>
            <span>Background</span>
            <ColorPicker
              value={backgroundColor}
              onChange={(color) => setBackgroundColor(color.toHexString())}
              
            />
          </li>
          <li>
            <span>Primary Font Color</span>
            <ColorPicker
              value={primaryFontColor}
              onChange={(color) => setPrimaryFontColor(color.toHexString())}
              
            />
          </li>
          <li>
            <span>Secondary Font Color</span>
            <ColorPicker
              value={secondaryFontColor}
              onChange={(color) => setSecondaryFontColor(color.toHexString())}
              
            />
          </li>
        </ul>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Fonts</h3>
        <div className={styles.fontPicker}>
          <label>Primary Font</label>
          <select
            value={primaryFontFamily}
            className={styles.select}
            onChange={(e) => setPrimaryFontFamily(e.target.value)}
          >
            <option value="Roboto">Roboto</option>
            <option value="Arial">Arial</option>
            <option value="Georgia">Georgia</option>
          </select>
        </div>
        <div className={styles.fontPicker}>
          <label>Secondary Font</label>
          <select
            value={secondaryFontFamily}
            className={styles.select}
            onChange={(e) => setSecondaryFontFamily(e.target.value)}
          >
            <option value="Roboto">Roboto</option>
            <option value="Arial">Arial</option>
            <option value="Georgia">Georgia</option>
          </select>
        </div>
      </div>

      <Button
        className={styles.customButton}
        onClick={updatePreferences}
        style={{ backgroundColor: accentColor }}
      >
        Update Preferences
      </Button>
    </div>
  );
};

export default SiteDesign;
