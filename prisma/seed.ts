import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@japacademy.uz' },
    update: {},
    create: {
      email: 'admin@japacademy.uz',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'JAP',
      role: Role.ADMIN,
    },
  });

  // Topics with questions
  const topicsData = [
    {
      name: 'Atom tuzilishi',
      symbol: 'At',
      number: '001',
      color: '#dc2626',
      sortOrder: 1,
      questions: [
        { text: 'Atomning markaziy qismi qanday nomlanadi?', optionA: 'Yadro', optionB: 'Elektron', optionC: 'Neytrino', optionD: 'Foton', correct: 0 },
        { text: 'Protonning zaryadi qanday?', optionA: 'Manfiy', optionB: 'Neytral', optionC: 'Musbat', optionD: "O'zgaruvchan", correct: 2 },
        { text: 'Neytronning massasi qanchaga teng?', optionA: '0', optionB: '1', optionC: '2', optionD: '0.5', correct: 1 },
        { text: 'Elektronlar atomning qaysi qismida joylashgan?', optionA: 'Yadroda', optionB: 'Elektron bulutda', optionC: 'Proton ichida', optionD: 'Neytron ichida', correct: 1 },
        { text: 'Atom raqami nimani bildiradi?', optionA: 'Neytronlar soni', optionB: 'Protonlar soni', optionC: 'Elektronlar soni', optionD: 'Massa soni', correct: 1 },
        { text: 'Izotoplar nimasi bilan farqlanadi?', optionA: 'Protonlar soni', optionB: 'Elektronlar soni', optionC: 'Neytronlar soni', optionD: 'Zaryadi', correct: 2 },
        { text: 'Elektronning zaryadi qanday?', optionA: 'Musbat', optionB: 'Manfiy', optionC: 'Neytral', optionD: 'Ikkilangan', correct: 1 },
        { text: 'Massa soni (A) nimaga teng?', optionA: 'Z+N', optionB: 'Z-N', optionC: 'Z*N', optionD: 'Z/N', correct: 0 },
        { text: 'Atom yadrosi nimalardan tashkil topgan?', optionA: 'Proton va elektron', optionB: 'Proton va neytron', optionC: 'Elektron va neytron', optionD: 'Faqat proton', correct: 1 },
        { text: 'Vodorod atomida nechtada neytron bor?', optionA: '1', optionB: '2', optionC: '0', optionD: '3', correct: 2 },
        { text: 'Qaysi element eng yengil?', optionA: 'Geliy', optionB: 'Vodorod', optionC: 'Litiy', optionD: 'Bor', correct: 1 },
        { text: "Atomning o'lchami taxminan qancha?", optionA: '10⁻¹⁰ m', optionB: '10⁻⁵ m', optionC: '10⁻¹⁵ m', optionD: '10⁻² m', correct: 0 },
        { text: "Elektronlar qaysi bo'yicha harakat qiladi?", optionA: "To'g'ri chiziq", optionB: 'Orbital', optionC: 'Aylana', optionD: 'Spiral', correct: 1 },
        { text: 's-orbital qanday shaklga ega?', optionA: 'Sharsimon', optionB: 'Gantelsimon', optionC: 'Konussimon', optionD: 'Kubsimon', correct: 0 },
        { text: "Birinchi energetik sathda nechta elektron sig'adi?", optionA: '2', optionB: '8', optionC: '18', optionD: '32', correct: 0 },
        { text: 'p-orbital qanday shaklga ega?', optionA: 'Sharsimon', optionB: 'Gantelsimon', optionC: 'Uchburchak', optionD: 'Kvadrat', correct: 1 },
        { text: 'Atom spektri nima?', optionA: 'Atom rangi', optionB: "Nurlanish chiziqlarining yig'indisi", optionC: 'Atom massasi', optionD: 'Atom hajmi', correct: 1 },
        { text: "Kvant soni 'n' nimani bildiradi?", optionA: 'Orbital shakli', optionB: 'Energetik sath', optionC: 'Magnit xossasi', optionD: 'Spin', correct: 1 },
        { text: 'Pauli prinsipi nimani anglatadi?', optionA: "Bitta orbitalda 2 ta bir xil spinli e⁻ bo'lmaydi", optionB: 'Elektronlar yadro atrofida aylanadi', optionC: "Atom massasi o'zgarmaydi", optionD: "Protonlar soni o'zgarmaydi", correct: 0 },
        { text: 'Xund qoidasi nimani bildiradi?', optionA: "Elektronlar orbitallarni bitta-bitta to'ldiradi", optionB: "Elektronlar juft bo'lib to'ldiradi", optionC: 'Protonlar teng taqsimlanadi', optionD: 'Neytronlar ortadi', correct: 0 },
      ],
    },
    {
      name: "Kimyoviy bog'lanish",
      symbol: 'Kb',
      number: '002',
      color: '#2563eb',
      sortOrder: 2,
      questions: [
        { text: "Ion bog'lanish qanday hosil bo'ladi?", optionA: 'Elektronlar umumiylashadi', optionB: "Elektronlar bir atomdan ikkinchisiga o'tadi", optionC: 'Elektronlar erkin harakatlanadi', optionD: 'Yadrolar birlashadi', correct: 1 },
        { text: "Kovalent bog'lanishda nima sodir bo'ladi?", optionA: "Elektronlar o'tadi", optionB: 'Elektronlar umumiylashadi', optionC: "Ionlar hosil bo'ladi", optionD: 'Metallar birlashadi', correct: 1 },
        { text: "NaCl qanday bog'lanish turiga ega?", optionA: 'Kovalent', optionB: 'Ion', optionC: 'Metall', optionD: 'Vodorod', correct: 1 },
        { text: "Metall bog'lanish qayerda kuzatiladi?", optionA: 'Tuz kristallarida', optionB: 'Metallarda', optionC: 'Gazlarda', optionD: 'Suvda', correct: 1 },
        { text: "Qutbli kovalent bog'lanish qachon hosil bo'ladi?", optionA: 'Bir xil atomlar orasida', optionB: 'Turli elektromanfiylikdagi atomlar orasida', optionC: 'Faqat metallarda', optionD: 'Faqat gazlarda', correct: 1 },
        { text: "Vodorod bog'lanish qaysi moddalarda kuzatiladi?", optionA: 'Metallarda', optionB: 'H₂O, HF, NH₃', optionC: 'Tuzlarda', optionD: 'Nodir gazlarda', correct: 1 },
        { text: "Sigma bog' qanday hosil bo'ladi?", optionA: 'Yonma-yon qoplanishi', optionB: 'Old tomondan qoplanishi', optionC: "Elektronlarning o'tishi", optionD: 'Yadrolarning yaqinlashishi', correct: 1 },
        { text: "Pi bog' qanday hosil bo'ladi?", optionA: 'Old tomondan qoplanishi', optionB: 'Yonma-yon qoplanishi', optionC: "Ion hosil bo'lishi", optionD: 'Metall tortishishi', correct: 1 },
        { text: 'Elektromanfiylik nima?', optionA: 'Atomning elektron tortish qobiliyati', optionB: 'Atom massasi', optionC: 'Atom radiusi', optionD: 'Atom zaryadi', correct: 0 },
        { text: 'Eng katta elektromanfiylikka ega element?', optionA: 'Kislorod', optionB: 'Xlor', optionC: 'Ftor', optionD: 'Azot', correct: 2 },
        { text: "Donor-akseptor bog' nima?", optionA: 'Ikkala atom e⁻ beradi', optionB: 'Bir atom e⁻ juftini beradi', optionC: "Ionlar hosil bo'ladi", optionD: 'Metallar birlashadi', correct: 1 },
        { text: "CO₂ molekulasida qanday bog'lanish bor?", optionA: 'Ion', optionB: 'Kovalent qutbli', optionC: 'Metall', optionD: 'Vodorod', correct: 1 },
        { text: 'Kristall panjara nima?', optionA: 'Tartibsiz joylashuv', optionB: 'Tartibli joylashuv', optionC: 'Suyuqlik holati', optionD: 'Gaz holati', correct: 1 },
        { text: 'Ion kristall panjaraga misol?', optionA: 'Olmos', optionB: 'NaCl', optionC: 'Temir', optionD: 'Muz', correct: 1 },
        { text: 'Molekulalar orasidagi kuch nima deyiladi?', optionA: 'Kovalent kuch', optionB: 'Van-der-Vaals kuchi', optionC: 'Yadroviy kuch', optionD: 'Magnit kuch', correct: 1 },
        { text: "Qaysi moddada vodorod bog' bor?", optionA: 'CH₄', optionB: 'H₂O', optionC: 'CO₂', optionD: 'NaCl', correct: 1 },
        { text: "Metall bog'da elektronlar qanday?", optionA: 'Lokalizatsiyalangan', optionB: 'Delokalizatsiyalangan', optionC: "Yo'q", optionD: "Juft bo'lgan", correct: 1 },
        { text: "Ikki atomli molekulada nechta sigma bog'?", optionA: '0', optionB: '1', optionC: '2', optionD: '3', correct: 1 },
        { text: "N₂ molekulasida nechta bog' bor?", optionA: '1', optionB: '2', optionC: '3', optionD: '4', correct: 2 },
        { text: 'Gibridlanish nima?', optionA: 'Orbitallarning aralashishi', optionB: "Elektronlarning yo'qolishi", optionC: 'Atomlarning parchalanishi', optionD: "Ionlarning hosil bo'lishi", correct: 0 },
      ],
    },
    {
      name: 'Oksidlanish-qaytarilish',
      symbol: 'Oq',
      number: '003',
      color: '#16a34a',
      sortOrder: 3,
      questions: [
        { text: "Oksidlanish jarayonida nima sodir bo'ladi?", optionA: 'Elektron qabul qilinadi', optionB: 'Elektron beriladi', optionC: 'Proton beriladi', optionD: "Neytron qo'shiladi", correct: 1 },
        { text: "Qaytarilish jarayonida nima sodir bo'ladi?", optionA: 'Elektron beriladi', optionB: 'Elektron qabul qilinadi', optionC: 'Proton beriladi', optionD: 'Atom parchalanadi', correct: 1 },
        { text: 'Oksidlovchi modda nima qiladi?', optionA: 'Elektron beradi', optionB: 'Elektron qabul qiladi', optionC: 'Proton beradi', optionD: "O'zgarmaydi", correct: 1 },
        { text: 'Qaytaruvchi modda nima qiladi?', optionA: 'Elektron qabul qiladi', optionB: 'Elektron beradi', optionC: 'Proton qabul qiladi', optionD: "O'zgarmaydi", correct: 1 },
        { text: 'Fe⁰ → Fe²⁺ jarayoni nima?', optionA: 'Qaytarilish', optionB: 'Oksidlanish', optionC: 'Neytrallanish', optionD: 'Parchalanish', correct: 1 },
        { text: 'Cu²⁺ → Cu⁰ jarayoni nima?', optionA: 'Oksidlanish', optionB: 'Qaytarilish', optionC: 'Almashinish', optionD: 'Birikish', correct: 1 },
        { text: 'Oksidlanish darajasi nima?', optionA: 'Atom massasi', optionB: 'Shartli zaryad', optionC: 'Elektron soni', optionD: 'Proton soni', correct: 1 },
        { text: 'Oddiy moddada oksidlanish darajasi?', optionA: '1', optionB: '-1', optionC: '0', optionD: '2', correct: 2 },
        { text: 'H₂O da vodorodning oks. darajasi?', optionA: '-1', optionB: '0', optionC: '+1', optionD: '+2', correct: 2 },
        { text: 'H₂O da kislorodning oks. darajasi?', optionA: '+2', optionB: '-1', optionC: '-2', optionD: '0', correct: 2 },
        { text: 'KMnO₄ da Mn ning oks. darajasi?', optionA: '+4', optionB: '+7', optionC: '+2', optionD: '+6', correct: 1 },
        { text: 'Galvanik element nima?', optionA: 'Kimyoviy → elektr energiya', optionB: 'Elektr → kimyoviy energiya', optionC: 'Issiqlik ishlab chiqaradi', optionD: "Yorug'lik ishlab chiqaradi", correct: 0 },
        { text: 'Elektroliz nima?', optionA: 'Elektr toki bilan kimyoviy reaksiya', optionB: 'Kimyoviy reaksiyadan tok', optionC: 'Issiqlikdan parchalanish', optionD: "Yorug'likdan reaksiya", correct: 0 },
        { text: 'Anod nima?', optionA: 'Manfiy elektrod', optionB: 'Musbat elektrod', optionC: 'Neytral elektrod', optionD: 'Referens elektrod', correct: 1 },
        { text: 'Katod nima?', optionA: 'Musbat elektrod', optionB: 'Manfiy elektrod', optionC: 'Neytral elektrod', optionD: 'Yordamchi elektrod', correct: 1 },
        { text: 'Korroziya nima?', optionA: 'Metallning oksidlanishi', optionB: 'Metallning qaytarilishi', optionC: 'Metallning erishi', optionD: 'Metallning qotishi', correct: 0 },
        { text: 'Zanglanish qaysi metallga xos?', optionA: 'Oltin', optionB: 'Kumush', optionC: 'Temir', optionD: 'Platina', correct: 2 },
        { text: 'Kuchlanishlar qatori kim nomi bilan?', optionA: 'Mendeleyev', optionB: 'Beketov', optionC: 'Lavuazye', optionD: 'Dalton', correct: 1 },
        { text: 'Eng kuchli qaytaruvchi metall?', optionA: 'Oltin', optionB: 'Litiy', optionC: 'Natriy', optionD: 'Kaliy', correct: 1 },
        { text: 'OQR tenglashtirish usuli?', optionA: 'Elektron balans', optionB: 'Massa balans', optionC: 'Hajm balans', optionD: 'Energiya balans', correct: 0 },
      ],
    },
    {
      name: 'Organik kimyo',
      symbol: 'Or',
      number: '004',
      color: '#ea580c',
      sortOrder: 4,
      questions: [
        { text: "Organik kimyo nimani o'rganadi?", optionA: 'Metallarni', optionB: 'Uglerod birikmalarini', optionC: 'Kislotalarni', optionD: 'Tuzlarni', correct: 1 },
        { text: 'Metan formulasi qanday?', optionA: 'C₂H₆', optionB: 'CH₄', optionC: 'C₃H₈', optionD: 'C₂H₄', correct: 1 },
        { text: 'Alkanlarning umumiy formulasi?', optionA: 'CₙH₂ₙ', optionB: 'CₙH₂ₙ₊₂', optionC: 'CₙH₂ₙ₋₂', optionD: 'CₙHₙ', correct: 1 },
        { text: 'Alkenlarning umumiy formulasi?', optionA: 'CₙH₂ₙ₊₂', optionB: 'CₙH₂ₙ', optionC: 'CₙH₂ₙ₋₂', optionD: 'CₙHₙ', correct: 1 },
        { text: "Etilen qanday bog'ga ega?", optionA: 'Bitta', optionB: 'Ikkita', optionC: 'Uchta', optionD: "To'rtta", correct: 1 },
        { text: "Atsetilen qanday bog'ga ega?", optionA: 'Bitta', optionB: 'Ikkita', optionC: 'Uchta', optionD: "To'rtta", correct: 2 },
        { text: 'Benzol formulasi?', optionA: 'C₆H₆', optionB: 'C₆H₁₂', optionC: 'C₅H₅', optionD: 'C₇H₈', correct: 0 },
        { text: 'Spirtlarning funksional guruhi?', optionA: '-COOH', optionB: '-OH', optionC: '-NH₂', optionD: '-CHO', correct: 1 },
        { text: 'Aldegidlarning funksional guruhi?', optionA: '-OH', optionB: '-COOH', optionC: '-CHO', optionD: '-NH₂', correct: 2 },
        { text: 'Karboksil kislotalar funksional guruhi?', optionA: '-CHO', optionB: '-OH', optionC: '-NH₂', optionD: '-COOH', correct: 3 },
        { text: 'Metanol formulasi?', optionA: 'C₂H₅OH', optionB: 'CH₃OH', optionC: 'C₃H₇OH', optionD: 'C₄H₉OH', correct: 1 },
        { text: 'Sirka kislotasi formulasi?', optionA: 'HCOOH', optionB: 'CH₃COOH', optionC: 'C₂H₅COOH', optionD: 'C₃H₇COOH', correct: 1 },
        { text: 'Izomeriya nima?', optionA: 'Bir xil formula, turli tuzilish', optionB: 'Turli formula, bir xil tuzilish', optionC: 'Bir xil xossalar', optionD: 'Turli massalar', correct: 0 },
        { text: 'Gomologik qator nima?', optionA: 'Bir xil moddalar', optionB: "CH₂ ga farq qiluvchi qator", optionC: 'Izomerlar qatori', optionD: 'Polimer zanjiri', correct: 1 },
        { text: 'Polimer nima?', optionA: 'Kichik molekula', optionB: 'Katta takrorlanuvchi molekula', optionC: 'Oddiy modda', optionD: 'Element', correct: 1 },
        { text: 'Polimerlanish reaksiyasi nima?', optionA: 'Parchalanish', optionB: 'Kichik molekulalar birlashishi', optionC: 'Oksidlanish', optionD: 'Qaytarilish', correct: 1 },
        { text: 'Etanol nima uchun ishlatiladi?', optionA: "Yoqilg'i va erituvchi", optionB: 'Faqat dori', optionC: 'Faqat oziq-ovqat', optionD: 'Faqat plastmassa', correct: 0 },
        { text: 'Glukoza formulasi?', optionA: 'C₆H₁₂O₆', optionB: 'C₁₂H₂₂O₁₁', optionC: 'C₆H₆', optionD: '(C₆H₁₀O₅)ₙ', correct: 0 },
        { text: 'Aminokislotalar qanday birikmalar?', optionA: '-NH₂ va -COOH guruhli', optionB: 'Faqat -OH guruhli', optionC: 'Faqat -CHO guruhli', optionD: 'Faqat -COOH guruhli', correct: 0 },
        { text: 'Oqsillarning monomerlari?', optionA: 'Glukoza', optionB: 'Aminokislotalar', optionC: 'Nukleotidlar', optionD: "Yog' kislotalari", correct: 1 },
      ],
    },
  ];

  // Skip seeding if topics already exist
  const existingTopics = await prisma.topic.count();
  if (existingTopics > 0) {
    console.log(`Seed skipped — ${existingTopics} topics already exist`);
    return;
  }

  for (const topicData of topicsData) {
    const { questions, ...topicFields } = topicData;
    const topic = await prisma.topic.create({ data: topicFields });
    for (const q of questions) {
      await prisma.question.create({
        data: { ...q, topicId: topic.id },
      });
    }
  }

  console.log('Seed completed — 4 topics with 80 questions created');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
