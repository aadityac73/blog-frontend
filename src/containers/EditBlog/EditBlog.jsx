import React, { useEffect, useState } from "react";
import api from "../../main-app/http/api";
import styles from "./EditBlog.module.css";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams } from "react-router-dom";

const EditBlog = () => {
  const defaultState = {
    title: "",
    image: "",
  };
  const [state, setState] = useState(defaultState);
  const [body, setBody] = useState('')
  const {id} = useParams()
  useEffect(() => {
    const getBlog = async () => {
      const res = await api.getBlogById({ id });
      const data = res.getValue();
      setState({title: data.title, image: data.image});
      setBody(data.body)
    };
    getBlog();
  }, [id])
  const handleChange = (key) => (e) => {
    e.preventDefault()
    setState((prev) => ({ ...prev, [key]: e.target.value }));
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const res = await api.updateBlog({ id, body: {...state, body} });
  };
  return (
    <div className={`container ${styles.formContainer}`}>
      <div className={styles.card}>
        <h2 className={styles.h2}>Create New Blog</h2>
        <div className={styles.form}>
          <form onSubmit={handleFormSubmit}>
            <div className={styles.formControl}>
              <label className={styles.label} htmlFor="title">
                Blog Title
              </label>
              <input
                required
                className={styles.input}
                type="text"
                value={state.title}
                onChange={handleChange("title")}
              />
            </div>
            <div className={styles.formControl}>
              <label className={styles.label} htmlFor="title">
                Image
              </label>
              <input
                required
                className={styles.input}
                type="text"
                value={state.image}
                onChange={handleChange("image")}
              />
            </div>
            <div className={styles.formControl}>
              <label className={styles.label} htmlFor="title">
                Blog Body
              </label>
              <ReactQuill style={{height: 100}} className={styles.inputBig} theme="snow" value={body} onChange={setBody} />
              {/* <textarea
                required
                className={styles.inputBig}
                type="text"
                onChange={handleChange("body")}
                rows={5}
              >
                {state.body}
              </textarea> */}
            </div>
            <button className={styles.button} type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;
