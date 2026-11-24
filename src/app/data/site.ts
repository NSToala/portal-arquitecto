/** Datos de muestra. Reemplazar por los reales. */
export const SITE = {
  brand: 'Vovo Studio',
  fullName: 'Ing. Arq. Oscar Ramírez Toala',
  tagline: 'Arquitectura y mobiliario a medida',
  email: 'contacto@ejemplo.com',
  phone: '+593 99 999 9999',
  whatsapp: '593999999999',
  city: 'Ciudad, País',
  address: 'Calle Ejemplo 123 y Av. Principal',
  schedule: 'Lunes a viernes, 9:00 a 18:00',
  instagram: 'https://instagram.com/',
  facebook: 'https://facebook.com/',
  linkedin: 'https://linkedin.com/',
};

/** Cifras de muestra para la franja de la portada. Reemplazar por las reales. */
export const STATS = [
  { value: '12+', label: 'Años de experiencia' },
  { value: '80+', label: 'Proyectos entregados' },
  { value: '150+', label: 'Muebles a medida' },
  { value: '100%', label: 'Clientes atendidos de forma directa' },
];

/**
 * Integrantes del estudio (portada y "Sobre nosotros"). Las fotos son de referencia:
 * reemplazar public/images/retrato.jpg y public/images/equipo-mujer.jpg. Los cargos son de muestra.
 */
export const TEAM = [
  { name: 'Ing. Arq. Oscar Ramírez Toala', role: 'Arquitectura y obra', image: 'images/retrato.jpg' },
  { name: 'Vianey Elizabeth Diaz Ramirez', role: 'Diseño de interiores', image: 'images/equipo-mujer.jpg' },
];

export const PROCESS = [
  {
    title: 'Contacto',
 icon: 'chat',
 image: 'images/ref/oficinas2.jpg',
    text: 'Cuéntanos tu idea, tu terreno o tu espacio. Respondemos en un máximo de 3 días hábiles y, si hace falta, agendamos una reunión.',
  },
  {
    title: 'Propuesta',
 icon: 'pencil',
 image: 'images/ref/estudio2.jpg',
    text: 'Con tus necesidades desarrollamos ideas y opciones creativas y económicas para que puedas ver el proyecto con claridad.',
  },
  {
    title: 'Ejecución',
 icon: 'house',
 image: 'images/ref/cocina2.jpg',
    text: 'Entregamos planos ejecutivos, calendario de obra y detalles finales. Los muebles se fabrican a medida en nuestro taller.',
  },
];
