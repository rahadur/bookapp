export interface Book {
  id: string;
  title: string;
  author: {
    id: string;
    name: string;
  };
  description: string;
  genres: [
    genres_id: {
      id: number;
      title: string;
    }
  ];
  thumbnail: string;
  locked: boolean;
  audible: boolean;
  downloadable: boolean;
}
