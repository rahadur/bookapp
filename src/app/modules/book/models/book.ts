export interface Book {
  id: string;
  title: string;
  description: string;
  genre: {
    id: number;
    title: string;
  };
  thumbnail: string;
  locked: boolean;
  audible: boolean;
  downloadable: boolean;
}
