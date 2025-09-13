import { Category, Location, Ad } from '../types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Mobile Phones',
    nameAr: 'الهواتف المحمولة',
    icon: 'phone',
  },
  {
    id: '2',
    name: 'Cars',
    nameAr: 'السيارات',
    icon: 'car',
  },
  {
    id: '3',
    name: 'Apartments',
    nameAr: 'الشقق',
    icon: 'home',
  },
  {
    id: '4',
    name: 'Electronics',
    nameAr: 'الإلكترونيات',
    icon: 'laptop',
  },
  {
    id: '5',
    name: 'Furniture',
    nameAr: 'الأثاث',
    icon: 'chair',
  },
  {
    id: '6',
    name: 'Fashion',
    nameAr: 'الموضة',
    icon: 'tshirt',
  },
];

export const locations: Location[] = [
  {
    id: '1',
    name: 'Beirut',
    nameAr: 'بيروت',
  },
  {
    id: '2',
    name: 'Tripoli',
    nameAr: 'طرابلس',
  },
  {
    id: '3',
    name: 'Sidon',
    nameAr: 'صيدا',
  },
  {
    id: '4',
    name: 'Tyre',
    nameAr: 'صور',
  },
  {
    id: '5',
    name: 'Jounieh',
    nameAr: 'جونية',
  },
  {
    id: '6',
    name: 'Zahle',
    nameAr: 'زحلة',
  },
];

export const ads: Ad[] = [
  // Mobile Phones
  {
    id: '1',
    title: 'iPhone 14 Pro Max 256GB',
    titleAr: 'ايفون 14 برو ماكس 256 جيجا',
    description: 'Brand new iPhone 14 Pro Max in Deep Purple color. 256GB storage, excellent condition, comes with original box and charger.',
    descriptionAr: 'ايفون 14 برو ماكس جديد باللون البنفسجي العميق. سعة 256 جيجابايت، حالة ممتازة، يأتي مع الصندوق الأصلي والشاحن.',
    price: 1200,
    currency: 'USD',
    location: locations[0],
    category: categories[0],
    images: ['https://via.placeholder.com/300x200/000000/FFFFFF?text=iPhone+14+Pro'],
    createdAt: '2024-01-15',
    phone: '+961-1-234567',
    isFeatured: true,
  },
  {
    id: '2',
    title: 'Samsung Galaxy S23 Ultra',
    titleAr: 'سامسونج جالاكسي اس 23 الترا',
    description: 'Samsung Galaxy S23 Ultra with S Pen. 512GB storage, Phantom Black. Used for 3 months, excellent condition.',
    descriptionAr: 'سامسونج جالاكسي اس 23 الترا مع قلم اس. سعة 512 جيجابايت، لون أسود فانتوم. مستعمل لمدة 3 أشهر، حالة ممتازة.',
    price: 950,
    currency: 'USD',
    location: locations[1],
    category: categories[0],
    images: ['https://via.placeholder.com/300x200/1a1a1a/FFFFFF?text=Galaxy+S23'],
    createdAt: '2024-01-14',
    phone: '+961-6-345678',
    isFeatured: false,
  },
  {
    id: '3',
    title: 'Google Pixel 7 Pro',
    titleAr: 'جوجل بكسل 7 برو',
    description: 'Google Pixel 7 Pro, 128GB, Obsidian color. Great camera quality, Android 14 ready.',
    descriptionAr: 'جوجل بكسل 7 برو، 128 جيجابايت، لون أوبسيديان. جودة كاميرا رائعة، جاهز لنظام أندرويد 14.',
    price: 650,
    currency: 'USD',
    location: locations[0],
    category: categories[0],
    images: ['https://via.placeholder.com/300x200/4285f4/FFFFFF?text=Pixel+7'],
    createdAt: '2024-01-13',
    phone: '+961-1-456789',
    isFeatured: true,
  },
  
  // Cars
  {
    id: '4',
    title: 'BMW X5 2020',
    titleAr: 'بي ام دبليو اكس 5 موديل 2020',
    description: 'BMW X5 2020, excellent condition, full options, leather seats, panoramic roof, low mileage.',
    descriptionAr: 'بي ام دبليو اكس 5 موديل 2020، حالة ممتازة، فل اوبشن، مقاعد جلد، سقف بانوراما، مسافة قليلة.',
    price: 45000,
    currency: 'USD',
    location: locations[0],
    category: categories[1],
    images: ['https://via.placeholder.com/300x200/1f4e79/FFFFFF?text=BMW+X5'],
    createdAt: '2024-01-12',
    phone: '+961-1-567890',
    isFeatured: true,
  },
  {
    id: '5',
    title: 'Toyota Camry 2019',
    titleAr: 'تويوتا كامري 2019',
    description: 'Toyota Camry 2019, automatic transmission, very clean, single owner, full service history.',
    descriptionAr: 'تويوتا كامري 2019، ناقل حركة أوتوماتيكي، نظيفة جداً، مالك واحد، تاريخ صيانة كامل.',
    price: 18500,
    currency: 'USD',
    location: locations[2],
    category: categories[1],
    images: ['https://via.placeholder.com/300x200/cc0000/FFFFFF?text=Camry'],
    createdAt: '2024-01-11',
    phone: '+961-7-678901',
    isFeatured: false,
  },
  {
    id: '6',
    title: 'Mercedes C-Class 2021',
    titleAr: 'مرسيدس سي كلاس 2021',
    description: 'Mercedes C-Class 2021, AMG package, black interior, premium sound system, under warranty.',
    descriptionAr: 'مرسيدس سي كلاس 2021، باقة ايه ام جي، داخلية سوداء، نظام صوت مميز، تحت الضمان.',
    price: 52000,
    currency: 'USD',
    location: locations[4],
    category: categories[1],
    images: ['https://via.placeholder.com/300x200/2c3e50/FFFFFF?text=Mercedes'],
    createdAt: '2024-01-10',
    phone: '+961-9-789012',
    isFeatured: true,
  },

  // Apartments
  {
    id: '7',
    title: '3BR Apartment in Achrafieh',
    titleAr: 'شقة 3 غرف في الأشرفية',
    description: '3 bedrooms, 2 bathrooms apartment in Achrafieh. 150 sqm, balcony with city view, parking space.',
    descriptionAr: 'شقة 3 غرف نوم و 2 حمام في الأشرفية. مساحة 150 متر مربع، بالكونة مع إطلالة على المدينة، موقف سيارة.',
    price: 1500,
    currency: 'USD',
    location: locations[0],
    category: categories[2],
    images: ['https://via.placeholder.com/300x200/34495e/FFFFFF?text=Apartment'],
    createdAt: '2024-01-09',
    phone: '+961-1-890123',
    isFeatured: false,
  },
  {
    id: '8',
    title: 'Studio in Hamra',
    titleAr: 'ستوديو في الحمرا',
    description: 'Cozy studio apartment in Hamra, perfect for students or young professionals. Furnished, near AUB.',
    descriptionAr: 'شقة ستوديو مريحة في الحمرا، مثالية للطلاب أو المهنيين الشباب. مفروشة، قريبة من الجامعة الأمريكية.',
    price: 800,
    currency: 'USD',
    location: locations[0],
    category: categories[2],
    images: ['https://via.placeholder.com/300x200/8e44ad/FFFFFF?text=Studio'],
    createdAt: '2024-01-08',
    phone: '+961-1-901234',
    isFeatured: true,
  },
  {
    id: '9',
    title: '2BR Apartment with Sea View',
    titleAr: 'شقة غرفتين مع إطلالة بحرية',
    description: '2 bedrooms apartment with stunning sea view in Raouche. Modern building, elevator, security.',
    descriptionAr: 'شقة غرفتي نوم مع إطلالة بحرية خلابة في الروشة. مبنى حديث، مصعد، حراسة.',
    price: 2000,
    currency: 'USD',
    location: locations[0],
    category: categories[2],
    images: ['https://via.placeholder.com/300x200/3498db/FFFFFF?text=Sea+View'],
    createdAt: '2024-01-07',
    phone: '+961-1-012345',
    isFeatured: true,
  },

  // Additional items for other categories
  {
    id: '10',
    title: 'MacBook Pro M2 16-inch',
    titleAr: 'ماك بوك برو ام 2 بحجم 16 إنش',
    description: 'MacBook Pro with M2 chip, 16-inch display, 512GB SSD, Space Gray. Perfect for professionals.',
    descriptionAr: 'ماك بوك برو مع معالج ام 2، شاشة 16 إنش، قرص صلب 512 جيجا، لون رمادي فضائي. مثالي للمهنيين.',
    price: 2200,
    currency: 'USD',
    location: locations[0],
    category: categories[3],
    images: ['https://via.placeholder.com/300x200/95a5a6/FFFFFF?text=MacBook'],
    createdAt: '2024-01-06',
    phone: '+961-1-123456',
    isFeatured: false,
  },
];

export const getAdsAsync = (): Promise<Ad[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(ads);
    }, 1500);
  });
};

export const getCategoriesAsync = (): Promise<Category[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(categories);
    }, 800);
  });
};

export const getLocationsAsync = (): Promise<Location[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(locations);
    }, 500);
  });
};