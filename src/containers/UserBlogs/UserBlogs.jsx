import { useEffect, useState } from "react";
import BlogList from "../../components/BlogList/BlogList";
import api from "../../main-app/http/api";

const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const getBlogs = async () => {
      const res = await api.getUserBlogs();
      const data = res.getValue();
      if (!res.isError && Array.isArray(data)) {
        setBlogs(data);
      } else {
        console.log("Internal server error");
      }
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
      {blogs.length > 0 ? (
        <BlogList isUserList handleDelete={handleDelete} blogs={blogs} />
      ) : (
        <p className="noContent">No Content Available</p>
      )}
    </div>
  );
};

export default UserBlogs;
