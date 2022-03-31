import { Fragment } from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";
import classes from "./AddComment.module.css";

const AddComment = (props) => {
  return (
    <Fragment>
      <Card className={classes.input}>
        <form data-id={props.id || ""} data-commentlvl={props.comment_level || ""}  onSubmit={props.onSubmit}>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" ref={props.nameInputRef} />
          <label htmlFor="comment">Comment</label>
          <textarea id="comment" ref={props.commentInputRef} />
          <Button type="submit">Add Comment</Button>
        </form>
      </Card>
    </Fragment>
  );
};

export default AddComment;
