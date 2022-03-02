export interface Chapter {
  id: string;
  book: number;
  title: string;
  content: string;
  sectionable: boolean;
  sections: any;
  date_creates: string;
  date_updated: string;
}
