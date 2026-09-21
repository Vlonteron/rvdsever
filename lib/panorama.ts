export interface PanoramaConfig {
  id: string | number;
  title: string;
  description: string;
  panoid: string;
  panoramaUrl: string;
  embedUrl: string;
  directUrl: string;
  thumbnailUrl: string;
}

const aboutImg =
  'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWmZqCeywFgcEMWVVHkzIz8dfqSAupJVIiDRmq3WUZ-C_4xLfUAfDx_AitIOdQUkIDoPcXP5wBjD_Baed2V4UYQ4gMkudw01cUIRAvqZ2XgbmUaCUdmHiYAMf39t8xSX4DGkLNkDsNqWx72T';

const loc1Img =
  'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWm_RAbDByIS-zXCaCvzdr1XY9D03ACbEuJnMLrzvR7s8CJDoHmAqfe7Mo-YZJNgg32CIFeFrlhVlkHwUtL_T9948FAi2zI_TR-3ZAtMAq_YY5WQK7huDTc3B2Q4ZY-dS0u_Lz3TUnUwc9sd';

const loc2Img =
  'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWnDBgGzEDjmaMd5-SiCwn7j85GWzBn-MhDYQllPdYNnzoPdXtr3vQIupGNt74KtgxGgbKHW7G0vEl69xpym2TmkILIuc44dftOQ9ysCKbDSi2VhKK2dGi6j1mwsof-Oq17DSk0kLEDIcUk7';

const loc3Img =
  'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWnQErCMDs6AiRwyxQuhqTkd_FwaJ8kh3dKTQ9FaigrqVnag_OOpe4agUBp1waSiIKbaKAJEvSsLPqZS7QVne5Bc093MhrSTCYoMiuG8lRGDz0cDTJcwM2P4sfDyWg8Pud0sduAZrfg2Yog';

const loc4Img =
  'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWmTIXuABAVyBHdkI0d5W9biSrrFodYHgW0oXZZYc2QvavAEg9Bq0WWHE_Wxpa0sX2XiL5Rgesn8n4TxI_VnDBFn2zZkFua07JMuN83G5-lf6QINwHcY_OItuTTq2aLGq0hDFHzxY4JR488s';

// Панорама для блоку "Про нас"
export const companyPanorama: PanoramaConfig = {
  id: 'about-promimpeks',
  title: 'Виробничий цех та склад «ПРОМІМПЕКС СЄВЄР»',
  description: 'Інтерактивний 360° огляд виробництва та складу компанії в м. Хмельницький',
  panoid: 'CIABIhDKo31uJt9a_drCnhehRYCJ',
  panoramaUrl: `${aboutImg}=w2048`,
  embedUrl: `/panorama/viewer.html?image=${encodeURIComponent(`${aboutImg}=w2048`)}`,
  directUrl:
    'https://www.google.com/local/place/fid/0x473207c9d5da0205:0x89f85d0f3d16e14b/photosphere?iu=https://lh3.googleusercontent.com/gps-cs-s/AHRPTWmZqCeywFgcEMWVVHkzIz8dfqSAupJVIiDRmq3WUZ-C_4xLfUAfDx_AitIOdQUkIDoPcXP5wBjD_Baed2V4UYQ4gMkudw01cUIRAvqZ2XgbmUaCUdmHiYAMf39t8xSX4DGkLNkDsNqWx72T%3Dw160-h106-k-no-pi0-ya9.8399935-ro-0-fo100&ik=CAoSHENJQUJJaERLbzMxdUp0OWFfZHJDbmhlaFJZQ0o%3D',
  thumbnailUrl: `${aboutImg}=w800-h600-k-no`,
};

// 4 панорами для блоку Галереї / 3D-туру
export const galleryPanoramas: PanoramaConfig[] = [
  {
    id: 1,
    title: 'Локація 1 — Виробнича лінія та обладнання',
    description: 'Дільниця обтискання та виготовлення рукавів високого тиску',
    panoid: 'CIABIhB7A0qexOIn61VOkJAIWnII',
    panoramaUrl: `${loc1Img}=w2048`,
    embedUrl: `/panorama/viewer.html?image=${encodeURIComponent(`${loc1Img}=w2048`)}`,
    directUrl:
      'https://www.google.com/local/place/fid/0x473207c9d5da0205:0x89f85d0f3d16e14b/photosphere?iu=https://lh3.googleusercontent.com/gps-cs-s/AHRPTWm_RAbDByIS-zXCaCvzdr1XY9D03ACbEuJnMLrzvR7s8CJDoHmAqfe7Mo-YZJNgg32CIFeFrlhVlkHwUtL_T9948FAi2zI_TR-3ZAtMAq_YY5WQK7huDTc3B2Q4ZY-dS0u_Lz3TUnUwc9sd%3Dw160-h106-k-no-pi-0-ya101.59001-ro-0-fo100&ik=CAoSHENJQUJJaEI3QTBxZXhPSW42MVZPa0pBSVduSUk%3D',
    thumbnailUrl: `${loc1Img}=w800-h600-k-no`,
  },
  {
    id: 2,
    title: 'Локація 2 — Склад гідроарматури та РВТ',
    description: 'Широкий асортимент фітингів, муфт, адаптерів та швидкороз\'ємних з\'єднань',
    panoid: 'CIABIhAt-HRIi5xE08_MFfLIb2Ug',
    panoramaUrl: `${loc2Img}=w2048`,
    embedUrl: `/panorama/viewer.html?image=${encodeURIComponent(`${loc2Img}=w2048`)}`,
    directUrl:
      'https://www.google.com/local/place/fid/0x473207c9d5da0205:0x89f85d0f3d16e14b/photosphere?iu=https://lh3.googleusercontent.com/gps-cs-s/AHRPTWnDBgGzEDjmaMd5-SiCwn7j85GWzBn-MhDYQllPdYNnzoPdXtr3vQIupGNt74KtgxGgbKHW7G0vEl69xpym2TmkILIuc44dftOQ9ysCKbDSi2VhKK2dGi6j1mwsof-Oq17DSk0kLEDIcUk7%3Dw160-h106-k-no-pi-0-ya40.929993-ro-0-fo100&ik=CAoSHENJQUJJaEF0LUhSSWk1eEUwOF9NRmZMSWIyVWc%3D',
    thumbnailUrl: `${loc2Img}=w800-h600-k-no`,
  },
  {
    id: 3,
    title: 'Локація 3 — Дільниця збірки та ремонту',
    description: 'Робочі пости ремонту гідроциліндрів та випробування продукції',
    panoid: 'CIABIhA2Derxj2W2jzr_zFyHUDNf',
    panoramaUrl: `${loc3Img}=w2048`,
    embedUrl: `/panorama/viewer.html?image=${encodeURIComponent(`${loc3Img}=w2048`)}`,
    directUrl:
      'https://www.google.com/local/place/fid/0x473207c9d5da0205:0x89f85d0f3d16e14b/photosphere?iu=https://lh3.googleusercontent.com/gps-cs-s/AHRPTWnQErCMDs6AiRwyxQuhqTkd_FwaJ8kh3dKTQ9FaigrqVnag_OOpe4agUBp1waSiIKbaKAJEvSsLPqZS7QVne5Bc093MhrSTCYoMiuG8lRGDz0cDTJcwM2P4sfDyWg8Pud0sduAZrfg2Yog%3Dw160-h106-k-no-pi-0-ya143.70999-ro-0-fo100&ik=CAoSHENJQUJJaEEyRGVyeGoyVzJqenJfekZ5SFVETmY%3D',
    thumbnailUrl: `${loc3Img}=w800-h600-k-no`,
  },
  {
    id: 4,
    title: 'Локація 4 — Цех та сервісна зона',
    description: 'Зона технічного обслуговування гідравлічних систем та вузлів',
    panoid: 'CIABIhCFs2Kiog80Yj7FqYqb4d2G',
    panoramaUrl: `${loc4Img}=w2048`,
    embedUrl: `/panorama/viewer.html?image=${encodeURIComponent(`${loc4Img}=w2048`)}`,
    directUrl:
      'https://www.google.com/local/place/fid/0x473207c9d5da0205:0x89f85d0f3d16e14b/photosphere?iu=https://lh3.googleusercontent.com/gps-cs-s/AHRPTWmTIXuABAVyBHdkI0d5W9biSrrFodYHgW0oXZZYc2QvavAEg9Bq0WWHE_Wxpa0sX2XiL5Rgesn8n4TxI_VnDBFn2zZkFua07JMuN83G5-lf6QINwHcY_OItuTTq2aLGq0hDFHzxY4JR488s%3Dw160-h106-k-no-pi-10-ya196.07-ro0-fo100&ik=CAoSHENJQUJJaENGczJLaW9nODBZajdGcVlxYjRkMkc%3D',
    thumbnailUrl: `${loc4Img}=w800-h600-k-no`,
  },
];
