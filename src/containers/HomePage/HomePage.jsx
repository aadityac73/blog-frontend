import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BlogList from "../../components/BlogList/BlogList";
import api from "../../main-app/http/api";

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const getBlogs = async () => {
      const res = await api.getAllBlogs()
      setBlogs(res.getValue())
    }
    getBlogs()
    return () => {
      setBlogs([]);
    };
  }, []);
  return (
    <div className='container'>
      <BlogList blogs={blogs} />
    </div>
  );
};

export default HomePage;
