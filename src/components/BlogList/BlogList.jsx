import React from "react";
import { Link } from "react-router-dom";
import styles from "./BlogList.module.css";
import { BsFillPencilFill, BsTrash3Fill } from "react-icons/bs";
const BlogList = ({
  blogs,
  handleDelete = () => void 0,
  isUserList = false,
}) => {
  const editIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 96 960 960"
      width="24"
    >
      <path d="M769 460 605 296l47-48q25.594-25.5 62.047-26.5 36.453-1 65.987 26.647l38.432 37.706Q848 313.5 845.5 349.75t-28.062 61.812L769 460Zm-52.5 53L289 940.5H124v-164L551.5 349l165 164Z" />
    </svg>
  );
  return (
    <div className={styles["blog-container"]}>
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
                onClick={handleDelete(item._id)}
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
            <h3 className={styles.title}>
              <Link to={`/blog/${item._id}`}>{item.title.substr(0, 23)}{item.title.length > 23 ? '...' : ''}</Link>
            </h3>
            <p className={styles.date}>{item.createdAt}</p>
            <p className={styles.body}>{item.body.replace(/(<([^>]+)>)/ig, '').substr(0, 100)}...</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
