import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./BlogList.module.css";
import { BsFillPencilFill, BsTrash3Fill } from "react-icons/bs";
import ConfimModal from "../ConfimModal/ConfimModal";
import api from "../../main-app/http/api";
const BlogList = ({
  blogs,
  setBlogs = () => void 0,
  isUserList = false,
}) => {
  const replceHtmlEntities = (str) => {
    const translate_re = /&(nbsp|amp|quot|lt|gt);/g;
    const translate = {
      nbsp: " ",
      amp: "&",
      quot: '"',
      lt: "<",
      gt: ">",
    };
    return str.replace(translate_re, (match, entity) => {
      return translate[entity];
    })
  };
  const [deleteId, setDeleteId] = useState(null)
  const [modal, setModal] = useState(false)
  const handleClose = () => {
    setModal(false)
    setDeleteId(null)
  }
  const putifyHtml = (str) => {
    let newStr = str.replace(/(<([^>]+)>)/gi, "");
    return replceHtmlEntities(newStr).substr(0,100);
  };
  const handleDelete = async (id) => {
    await api.deleteBlog({ id });
    const res = await api.getUserBlogs();
    setBlogs(res.getValue());
  };
  const onClickDelete = (id) => () => {
    setDeleteId(id)
    setModal(true)
  }
  const deleteBlog = () => {
    handleDelete(deleteId)
    setModal(false)
  }
  return (
    <div className={styles["blog-container"]}>
      {modal && <ConfimModal handleSubmit={deleteBlog} handleClose={handleClose} />}
      {blogs.map((item) => (
        <div key={item._id} className={styles.item}>
          {isUserList && (
            <>
              <Link
                title="Edit"
                className={`${styles.edit} ${styles.btn}`}
                to={`/blog/edit/${item._id}`}
              >
                <BsFillPencilFill color="#222222" />
              </Link>
              <button
                onClick={onClickDelete(item._id)}
                title="Delete"
                className={`${styles.delete} ${styles.btn}`}
              >
                <BsTrash3Fill color="#222222" />
              </button>
            </>
          )}
          <div className={styles.image}>
            <Link to={`/blog/${item._id}`}>
              <img src={item.image} alt={item.title} />
            </Link>
          </div>
          <div className={styles.content}>
            <h3 title={item.title} className={styles.title}>
              <Link to={`/blog/${item._id}`}>
                {item.title.substr(0, 23)}
                {item.title.length > 23 ? "..." : ""}
              </Link>
            </h3>
            <p className={styles.date}>{item.createdAt}</p>
            <p className={styles.body}>
              {putifyHtml(item.body)}...
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
