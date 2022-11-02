export interface Comment {
  id:        string;
  name:      string;
  body:      string;
  mediaType: string;
  mediaId:   string;
  user:      User;
}

export interface User {
  id:       string;
  email:    string;
  fullName: string;
  isActive: boolean;
  roles:    string[];
}
