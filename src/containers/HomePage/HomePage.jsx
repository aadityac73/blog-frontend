import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BlogList from "../../components/BlogList/BlogList";
import api from "../../main-app/http/api";

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const getBlogs = async () => {
      const res = await api.getAllBlogs();
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
  return (
    <div className="container">
      {blogs.length > 0 ? (
        <BlogList blogs={blogs} />
      ) : (
        <p className="noContent">No Content Available</p>
      )}
    </div>
  );
};

export default HomePage;
