export interface IResponse {
  episodes: Episode[];
  shortcast: Episode[];
}

export interface Episode {
  title: string;
  name: string;
  thumbnail: string;
}
