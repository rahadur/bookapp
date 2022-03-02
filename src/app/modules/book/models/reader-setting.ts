export type Font = 'contemporary' | 'geometric' | 'modern' | 'postmodern' | 'slab' | 'vintage';
export type Alignment = 'justify' | 'left';
export type LineSpace = 'small' | 'medium' | 'large';
export type ScrollDirection = 'leftRight' | 'topDown';
export type Theme = 'white' | 'paper' | 'grey' | 'dark';

export interface ReaderSetting {
  font: Font;
  fontSize: number;
  alignment: Alignment;
  lineSpace: LineSpace;
  scrollDirection: ScrollDirection;
  theme: Theme;
  autoBright: boolean;
  brightness: number;
}
