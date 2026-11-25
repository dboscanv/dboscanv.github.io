export const SITE = {
  title: 'Diego Boscan',
  url: 'https://diegoboscan.com',
  author: 'Diego Boscan',
  role: 'Software Engineer',
  location: 'Montevideo, Uruguay',
  description:
    'Software Engineer con experiencia de punta a punta, desde backend hasta frontend. Escribo sobre ingeniería de software, arquitectura, fundamentos e inteligencia artificial.',
  intro: {
    greeting: 'Hola, soy Diego.',
    headline:
      'Ingeniero de software construyendo sistemas de punta a punta desde Montevideo, Uruguay.',
    summary:
      'Diseño software simple, confiable y mantenible. Me entusiasma la revolución actual de la Inteligencia Artificial y sus implicaciones, convencido de que hoy, más que nunca, marcar la diferencia exige tener bases sólidas de programación e ingeniería de software.',
  },
  social: {
    github: 'https://github.com/dboscanv',
    linkedin: 'https://www.linkedin.com/in/diego-boscan-586b16108/',
    // Si quieres mostrar un enlace de correo en el futuro, coloca tu email aquí (ej. 'hola@diegoboscan.com')
    email: '',
  },
  nav: [
    { label: 'inicio', href: '/' },
    { label: 'blog', href: '/blog' },
    { label: 'sobre-mí', href: '/sobre-mi' },
  ],
} as const;

export function getReadingTime(content: string): {
  minutes: number;
  coffees: string;
  label: string;
} {
  const cleanText = content
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/[#>*_`~\[\]()]/g, ' ')
    .trim();
  const words = cleanText ? cleanText.split(/\s+/).length : 0;
  const minutes = Math.max(1, Math.round(words / 200));
  const coffeeCount = Math.max(1, Math.round(minutes / 5));
  const coffees = '☕️'.repeat(coffeeCount);
  return {
    minutes,
    coffees,
    label: `${coffees} ${minutes} min de lectura`,
  };
}
