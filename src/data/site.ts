// Zentrale Inhalte. Spätere Datenimporte können diese Struktur bedienen.
export const site = {
  name: 'Snackostore', email: 'info@snackostore.de',
  whatsapp: 'https://wa.me/4915560014295', phone: '+49 15560 014295',
  street: 'Bleichenbacherstraße 1', city: 'Stockheim',
  // Exakte Koordinaten aus dem bestätigten Google-Maps-Eintrag.
  route: 'https://www.google.com/maps/dir/?api=1&destination=50.3222263%2C9.0189347',
};
export const categories = [
  { number: '01', title: 'Snacks', slug: 'snacks', description: 'Für die kleine Pause. Und den Hunger zwischendurch.', symbol: 'snack' },
  { number: '02', title: 'Alkoholfreie Getränke', slug: 'alkoholfreie-getraenke', description: 'Dein Getränk für unterwegs oder einfach für jetzt.', symbol: 'drink' },
  { number: '03', title: 'Spielzeug', slug: 'spielzeug', description: 'Kleine Entdeckungen abseits des Snackregals.', symbol: 'toy' },
  { number: '04', title: 'Alkoholische Getränke', slug: 'alkoholische-getraenke', description: 'Die aktuelle Auswahl findest du direkt im Store.', symbol: 'bottle' },
  { number: '05', title: 'Tabakprodukte', slug: 'tabakprodukte', description: 'Die aktuelle Auswahl findest du direkt am Automaten.', symbol: 'pack' },
];
export const topics = ['Allgemeine Frage', 'Frage zum Sortiment', 'Problem am Automaten', 'Automatenstandort anbieten'];
