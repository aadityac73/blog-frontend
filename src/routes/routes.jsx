import AddBlog from "../containers/AddBlog/AddBlog";
import BlogPage from "../containers/BlogPage/BlogPage";
import EditBlog from "../containers/EditBlog/EditBlog";
import HomePage from "../containers/HomePage/HomePage";
import Login from "../containers/Login/Login";
import Register from "../containers/Register/Register";
import UserBlogs from "../containers/UserBlogs/UserBlogs";

const routes = [
  {
    id: 1,
    index: true,
    element: <HomePage />,
    path: '/',
  },
  {
    id: 2,
    path: 'blog/new',
    element: <AddBlog />,
    protected: true
  },
  {
    id: 3,
    path: 'blog/user',
    element: <UserBlogs />,
    protected: true
  },
  {
    id: 4,
    path: 'blog/edit/:id',
    element: <EditBlog />,
    protected: true
  },
  {
    id: 5,
    path: 'blog/:id',
    element: <BlogPage />
  },
  {
    id: 6,
    path: 'sign-in',
    element: <Login />,
    public: true
  },
  {
    id: 7,
    path: 'sign-up',
    element: <Register />,
    public: true
  },
];

export default routes;
