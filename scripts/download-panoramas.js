const fs = require('fs');
const path = require('path');
const https = require('https');

const targetDir = path.join(__dirname, '..', 'public', 'images', 'panorama');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}


// 5 360-degree panorama images from Google
const panoramas = [
  {
    name: 'about.jpg',
    url: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9Qu3yQdR4mEjCjnVsOZpv07F_p9dFj2PCHmoFIz96nvY3VFRF9bihmOoElKkT4RbP_oBIvsr_PU3wVSRSBUFZxmwRJrnmdm0uTCz9FkEfhw3CX_cdHIED8Gz4H42Xlr31h5FOqLX56evTuq=w4096',
    desc: 'Про нас — Виробничий цех та склад'
  },
  {
    name: 'loc-1.jpg',
    url: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9SUeuLBfv2thUQ9-64mKFEMQ9CTm3AM3m7h_kOZZMSL8DQh33sryjpGVd1vN44ZiAuXbw7G8ueRIg4ox0NoEeagg0PEy0WB5ZEIliXFktdQ7B6oMbLpWPoDvXk_VmovInvkQk6Zy9do-gax=w4096',
    desc: 'Локація 1 — Фасад будівлі, парковка та вхід'
  },
  {
    name: 'loc-2.jpg',
    url: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9Tg3EruuqNPqHU6T2GjFSnDeMz34aHa1uzMVcwC_mLqL8TCksUJy2u1dgeNYM0QOMRlqJVUq7qgRKYbnZCTbdvSrKfmdFu2Ei_Ei2Cg1c3eVt3iQXOeZUpJy1IbEkcci8WyUnUO78fbPmlG=w4096',
    desc: 'Локація 2 — Виробнича лінія та обладнання'
  },
  {
    name: 'loc-3.jpg',
    url: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9TWEDbpd6LLwkEdKArLg_3-pq2MAx4b6ClXM3LxcMhSXHTh4ZhQwgvNwJojVgs-ZVMFTvoaPacN6QvluR2rJPM9qcQ00Zpuioql7lucmXZ2sDT_H6O-qSwvXYZS5v1eOacwE1J4p4IZNuA=w4096',
    desc: 'Локація 3 — Дільниця збірки та ремонту'
  },
  {
    name: 'loc-4.jpg',
    url: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9QshaWw8ME-PaAS_IOgAyrJ-wDS-vqHYjA0jzY4EkAVQrjEMm-3BnjrRAWuTd-OPE_Iv9Ah0fqEEFD_eo_mO86NF4yMix_Z2Stm76jnCgONn6KqoL_sU1XVqv87hQ7eDSVjHOH0qjfc3Dk=w4096',
    desc: 'Локація 4 — Цех та сервісна зона'
  }
];

function downloadImage(item) {
  return new Promise((resolve, reject) => {
    const dest = path.join(targetDir, item.name);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 100000) {
      console.log(`Пропуск [${item.name}]: вже збережено (${fs.statSync(dest).size} байт)`);
      resolve();
      return;
    }
    console.log(`Завантаження [${item.name}]: ${item.desc}...`);

    const options = new URL(item.url);
    const req = https.get(
      item.url,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
        }
      },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          // Handle redirect
          https.get(res.headers.location, (redirectRes) => {
            if (redirectRes.statusCode !== 200) {
              reject(new Error(`HTTP ${redirectRes.statusCode} on redirect`));
              return;
            }
            const fileStream = fs.createWriteStream(dest);
            redirectRes.pipe(fileStream);
            fileStream.on('finish', () => {
              fileStream.close();
              console.log(` Успішно збережено: ${item.name} (${fs.statSync(dest).size} байт)`);
              resolve();
            });
          });
          return;
        }

        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} помилка для ${item.url}`));
          return;
        }

        const fileStream = fs.createWriteStream(dest);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          console.log(` Успішно збережено: ${item.name} (${fs.statSync(dest).size} байт)`);
          resolve();
        });
      }
    );

    req.on('error', (err) => {
      reject(err);
    });
  });
}

async function run() {
  console.log(`Збереження панорам у ${targetDir}...\n`);
  for (const item of panoramas) {
    try {
      await downloadImage(item);
    } catch (e) {
      console.error(` Помилка завантаження ${item.name}:`, e.message);
    }
  }
  console.log('\nЗавершено! Перевірте файли в public/images/panorama/');
}

run();
