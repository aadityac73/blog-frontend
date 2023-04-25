import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../main-app/http/api";
import styles from './BlogPage.module.css'

const BlogPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  useEffect(() => {
    const getBlog = async () => {
      const res = await api.getBlogById({ id });
      const data = res.getValue();
      setBlog(data);
    };
    getBlog();
  }, [id]);
  return (
    <>
      {blog && (
        <div className="container">
          <div className={styles.blogContainer}>
            <div className={styles.image}>
              <img src={blog.image} alt={blog.title} />
            </div>
            <h1 className={styles.title}>{blog.title}</h1>
            <p className={styles.date}>{moment(blog.createdAt).format('MMMM DD, YYYY')}</p>
            <div className={styles.body}>
              <div dangerouslySetInnerHTML={{ __html: blog.body }} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogPage;
