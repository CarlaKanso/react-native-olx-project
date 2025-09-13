import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { I18nManager } from 'react-native';
import { useTranslation } from 'react-i18next';

interface LanguageContextType {
  currentLanguage: string;
  changeLanguage: (language: string) => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const [isRTL, setIsRTL] = useState(i18n.language === 'ar');

  useEffect(() => {
    const isArabic = i18n.language === 'ar';
    setIsRTL(isArabic);
    
    if (I18nManager.isRTL !== isArabic) {
      I18nManager.allowRTL(isArabic);
      I18nManager.forceRTL(isArabic);
    }
  }, [i18n.language]);

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    setCurrentLanguage(language);
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};