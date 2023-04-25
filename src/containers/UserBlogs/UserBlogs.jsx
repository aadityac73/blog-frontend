import { useEffect, useState } from "react";
import BlogList from "../../components/BlogList/BlogList";
import api from "../../main-app/http/api";

const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const getBlogs = async () => {
      const res = await api.getUserBlogs();
      setBlogs(Array.isArray(res.getValue()) ? res.getValue() : []);
    };
    getBlogs();
    return () => {
      setBlogs([]);
    };
  }, []);

  const handleDelete = (id) => async () => {
    await api.deleteBlog({ id });
    const res = await api.getUserBlogs();
    setBlogs(res.getValue());
  };
  return (
    <div className="container">
      <BlogList isUserList handleDelete={handleDelete} blogs={blogs} />
    </div>
  );
};

export default UserBlogs;
