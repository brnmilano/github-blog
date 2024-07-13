export interface UserProps {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
  company: string;
  bio: string;
  followers: number;
}

export interface PostProps {
  number: number;
  title: string;
  body: string;
  created_at: string;
}

export type PostDetailsProps = UserProps & {
  title: string;
  body: string;
  created_at: string;
  comments: string;
  html_url: string;
  number: number;
};
