export enum WordSources {
  youtube = 'youtube',
  facebookReels = 'facebookReels',
  facebookVideos = 'facebookVideos',
  tiktok = 'tiktok',
  dailymotion = 'dailymotion',
}

export interface User {
  username: string;
  id: number;
  // Add other user properties as needed
}

export interface CustomRequest extends Request {
  user?: User; // Optionally make `user` required if it's always present
}
