import i18n from 'i18next';
import {initReactI18next} from 'react-i18next'; // Import kết nối giữa i18next và React
import en from './locales/en.json'; // File ngôn ngữ tiếng Anh
import vi from './locales/vi.json'; // File ngôn ngữ tiếng Việt

// Cấu hình i18next
i18n.use(initReactI18next).init({
  resources: {
    en: {translation: en},
    vi: {translation: vi},
  },
  lng: 'vi', // Ngôn ngữ mặc định
  fallbackLng: 'vi', // Ngôn ngữ dự phòng khi không tìm thấy bản dịch
  interpolation: {
    escapeValue: false, // Không cần escape HTML
  },
});

export default i18n;
