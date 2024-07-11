import { blogPath, postPath } from "../constants/paths";
import Blog from "../pages/Blog";
import Post from "../pages/Post";

export const allRoutes = [
  {
    id: 1,
    path: blogPath,
    element: <Blog />,
  },
  {
    id: 2,
    path: postPath,
    element: <Post />,
  },
];
