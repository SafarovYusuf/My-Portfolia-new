import schoolImage from '../assets/projects/school.jpg'
import socialImage from '../assets/projects/social.jpg'
import carsImage from '../assets/projects/cars.jpg'
import weatherImage from '../assets/projects/weather.jpg'
import prayerImage from '../assets/projects/prayer.jpg'

export const projects = [
  {
    id: 'school',
    image: schoolImage,
    tags: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB'],
    link: 'https://16.maktab16.uz',
    linkLabel: '16.maktab16.uz',
  },
  {
    id: 'social',
    image: socialImage,
    tags: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB Atlas'],
    link: 'https://baza.maktab16.uz',
    linkLabel: 'baza.maktab16.uz',
  },
  {
    id: 'cars',
    image: carsImage,
    tags: ['React', 'Node.js', 'Express', 'MongoDB'],
    link: 'https://carpro.maktab16.uz',
    linkLabel: 'carpro.maktab16.uz',
  },
  {
    id: 'weather',
    image: weatherImage,
    tags: ['React', 'Bootstrap', 'Open-Meteo API'],
    link: 'https://weather-uz-for-you.netlify.app',
    linkLabel: 'weather-uz-for-you.netlify.app',
  },
  {
    id: 'prayer',
    image: prayerImage,
    tags: ['React', 'Aladhan API'],
    link: 'https://nomoz-vaqtlar.netlify.app',
    linkLabel: 'nomoz-vaqtlar.netlify.app',
  },
]
