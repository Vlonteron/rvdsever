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


// Панорама для блоку "Про нас"
export const companyPanorama: PanoramaConfig = {
  id: 'about-promimpeks',
  title: 'Виробничий цех та склад «ПРОМІМПЕКС СЄВЄР»',
  description: 'Інтерактивний 360° огляд виробництва та складу компанії в м. Хмельницький',
  panoid: 'CIABIhDKo31uJt9a_drCnhehRYCJ',
  panoramaUrl: '/images/panorama/about.jpg',
  embedUrl: `/panorama/viewer.html?image=${encodeURIComponent('/images/panorama/about.jpg')}`,
  directUrl:
    'https://www.google.com/local/place/fid/0x473207c9d5da0205:0x89f85d0f3d16e14b/photosphere?iu=https://lh3.googleusercontent.com/gps-cs-s/ANWiy9Qu3yQdR4mEjCjnVsOZpv07F_p9dFj2PCHmoFIz96nvY3VFRF9bihmOoElKkT4RbP_oBIvsr_PU3wVSRSBUFZxmwRJrnmdm0uTCz9FkEfhw3CX_cdHIED8Gz4H42Xlr31h5FOqLX56evTuq%3Dw160-h106-k-no-pi0-ya9.8399935-ro-0-fo100&ik=CAoSHENJQUJJaERLbzMxdUp0OWFfZHJDbmhlaFJZQ0o%3D',
  thumbnailUrl: '/images/panorama/about.jpg',
};

// 4 панорами для блоку Галереї / 3D-туру
export const galleryPanoramas: PanoramaConfig[] = [
  {
    id: 1,
    title: 'Локація 1 — Фасад будівлі та парковка',
    description: 'Вхідна зона, паркувальний майданчик та фасад підприємства «ПРОМІМПЕКС СЄВЄР»',
    panoid: 'CIABIhDOXv85pcrKczlcVldzaC0Z',
    panoramaUrl: '/images/panorama/loc-1.jpg',
    embedUrl: `/panorama/viewer.html?image=${encodeURIComponent('/images/panorama/loc-1.jpg')}`,
    directUrl:
      'https://www.google.com/local/place/fid/0x473207c9d5da0205:0x89f85d0f3d16e14b/photosphere?iu=https://lh3.googleusercontent.com/gps-cs-s/ANWiy9SUeuLBfv2thUQ9-64mKFEMQ9CTm3AM3m7h_kOZZMSL8DQh33sryjpGVd1vN44ZiAuXbw7G8ueRIg4ox0NoEeagg0PEy0WB5ZEIliXFktdQ7B6oMbLpWPoDvXk_VmovInvkQk6Zy9do-gax%3Dw160-h106-k-no-pi-10-ya159.3-ro-0-fo100&ik=CAoSHENJQUJJaERPWHY4NXBjcktjemxjVmxkemFDMFo%3D',
    thumbnailUrl: '/images/panorama/loc-1.jpg',
  },
  {
    id: 2,
    title: 'Локація 2 — Склад гідроарматури та РВТ',
    description: 'Широкий асортимент фітингів, муфт, адаптерів та швидкороз\'ємних з\'єднань',
    panoid: 'CIABIhAt-HRIi5xE08_MFfLIb2Ug',
    panoramaUrl: '/images/panorama/loc-2.jpg',
    embedUrl: `/panorama/viewer.html?image=${encodeURIComponent('/images/panorama/loc-2.jpg')}`,
    directUrl:
      'https://www.google.com/local/place/fid/0x473207c9d5da0205:0x89f85d0f3d16e14b/photosphere?iu=https://lh3.googleusercontent.com/gps-cs-s/ANWiy9Tg3EruuqNPqHU6T2GjFSnDeMz34aHa1uzMVcwC_mLqL8TCksUJy2u1dgeNYM0QOMRlqJVUq7qgRKYbnZCTbdvSrKfmdFu2Ei_Ei2Cg1c3eVt3iQXOeZUpJy1IbEkcci8WyUnUO78fbPmlG%3Dw160-h106-k-no-pi-0-ya101.59001-ro-0-fo100&ik=CAoSHENJQUJJaEI3QTBxZXhPSW42MVZPa0pBSVduSUk%3D',
    thumbnailUrl: '/images/panorama/loc-2.jpg',
  },
  {
    id: 3,
    title: 'Локація 3 — Дільниця збірки та ремонту',
    description: 'Робочі пости ремонту гідроциліндрів та випробування продукції',
    panoid: 'CIABIhA2Derxj2W2jzr_zFyHUDNf',
    panoramaUrl: '/images/panorama/loc-3.jpg',
    embedUrl: `/panorama/viewer.html?image=${encodeURIComponent('/images/panorama/loc-3.jpg')}`,
    directUrl:
      'https://www.google.com/local/place/fid/0x473207c9d5da0205:0x89f85d0f3d16e14b/photosphere?iu=https://lh3.googleusercontent.com/gps-cs-s/ANWiy9TWEDbpd6LLwkEdKArLg_3-pq2MAx4b6ClXM3LxcMhSXHTh4ZhQwgvNwJojVgs-ZVMFTvoaPacN6QvluR2rJPM9qcQ00Zpuioql7lucmXZ2sDT_H6O-qSwvXYZS5v1eOacwE1J4p4IZNuA%3Dw160-h106-k-no-pi-0-ya143.70999-ro-0-fo100&ik=CAoSHENJQUJJaEEyRGVyeGoyVzJqenJfekZ5SFVETmY%3D',
    thumbnailUrl: '/images/panorama/loc-3.jpg',
  },
  {
    id: 4,
    title: 'Локація 4 — Зона обслуговування клієнтів та рецепція',
    description: 'Зона прийому замовлень, консультацій та оформлення послуг виготовлення й ремонту РВТ',
    panoid: 'CIABIhDq7gWYxHZfFolnL9dzwMu',
    panoramaUrl: '/images/panorama/loc-4.jpg',
    embedUrl: `/panorama/viewer.html?image=${encodeURIComponent('/images/panorama/loc-4.jpg')}`,
    directUrl:
      'https://www.google.com/local/place/fid/0x473207c9d5da0205:0x89f85d0f3d16e14b/photosphere?iu=https://lh3.googleusercontent.com/gps-cs-s/ANWiy9QshaWw8ME-PaAS_IOgAyrJ-wDS-vqHYjA0jzY4EkAVQrjEMm-3BnjrRAWuTd-OPE_Iv9Ah0fqEEFD_eo_mO86NF4yMix_Z2Stm76jnCgONn6KqoL_sU1XVqv87hQ7eDSVjHOH0qjfc3Dk%3Dw160-h106-k-no-pi0-ya358.68-ro-0-fo100&ik=CAoSHENJQUJJaERxN2dXWXhIWmZGb2xuTDlkenduTXU%3D',
    thumbnailUrl: '/images/panorama/loc-4.jpg',
  },
];
