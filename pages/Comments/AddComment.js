import { Fragment, useRef } from "react";
import axios from 'axios';

import Card from "../UI/Card";
import Button from "../UI/Button";
import classes from "./AddComment.module.css";

const AddComment = (props) => {
  const nameInputRef = useRef();
  const commentInputRef = useRef();

  const addCommentHandler = async (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredComment = commentInputRef.current.value;

    const data = {
      name: enteredName,
      body: enteredComment,
      comment_level: 1,
      reply_id: 0
    };

    const response = await axios
      .post("http://api.comment.com/v1/comments", data);

    if (response.status === 200) {
      props.onAddComment(response.data.comment);
    }

    nameInputRef.current.value = "";
    commentInputRef.current.value = "";
  };

  return (
    <Fragment>
      <Card className={classes.input}>
        <form onSubmit={addCommentHandler}>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" ref={nameInputRef} />
          <label htmlFor="comment">Comment</label>
          <textarea id="comment" ref={commentInputRef} />
          <Button type="submit">Add Comment</Button>
        </form>
      </Card>
    </Fragment>
  );
};

export default AddComment;
