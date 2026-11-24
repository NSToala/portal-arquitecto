export type ProjectCategory = 'Residencial' | 'Comercial' | 'Interiorismo' | 'Remodelación';

export type FurnitureCategory = 'Cocinas' | 'Closets' | 'Sala y comedor' | 'Escritorios' | 'Baños';

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  year: number;
  location: string;
  area: string;
  summary: string;
  description: string[];
  featured: boolean;
  /** Color de muestra mientras no haya foto. */
  tone: string;
  /** Ruta de imagen, por ejemplo 'images/proyectos/casa-lago.jpg' (carpeta public/). */
  image?: string;
  gallery?: string[];
}

export interface Furniture {
  id: string;
  title: string;
  category: FurnitureCategory;
  summary: string;
  materials: string;
  dimensions: string;
  finish: string;
  featured: boolean;
  tone: string;
  image?: string;
}
