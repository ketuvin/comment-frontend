import { Fragment, useState, useRef } from "react";
import axios from 'axios';

import Card from "../UI/Card";
import Button from "../UI/Button";
import AddComment from "./AddComment";
import classes from "./CommentsList.module.css";

const CommentsList = (props) => {
  const nameInputRef = useRef();
  const commentInputRef = useRef();
  const [selected, setSelected] = useState("");

  const replyCommentHandler = (event) => {
    event.preventDefault();
    setSelected(event.target.value);
  };

  const addCommentHandler = async (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredComment = commentInputRef.current.value;

    const data = {
      name: enteredName,
      body: enteredComment,
      comment_level: +event.target.getAttribute("data-commentlvl") + 1,
      reply_id: +event.target.getAttribute("data-id")
    };

    const response = await axios
      .post("http://api.comment.com/v1/comments", data);

    if (response.status === 200) {
      props.onAddReply();
      setSelected("");
    }

    // not advisable but should suffice for now
    nameInputRef.current.value = "";
    commentInputRef.current.value = "";
  };

  return (
    <Fragment>
      <Card className={classes.comments}>
        {props.comments.length > 0 && (
          <ul>
            {props.comments.map(
              (comment) =>
                comment.comment_level === 1 && (
                  <li key={comment.id}>
                    <p>{comment.name}</p>
                    <p>{comment.body}</p>
                    <Button value={comment.id} onClick={replyCommentHandler}>Reply</Button>

                    {+comment.id === +selected && <AddComment id={comment.id} comment_level={comment.comment_level} nameInputRef={nameInputRef} commentInputRef={commentInputRef} onSubmit={addCommentHandler} />}

                    {comment.replies.length > 0 && (
                      <ul>
                        {comment.replies.map(
                          (secondLvlComment) =>
                            secondLvlComment.comment_level === 2 && (
                              <li key={secondLvlComment.id}>
                                <p>{secondLvlComment.name}</p>
                                <p>{secondLvlComment.body}</p>
                                <Button value={secondLvlComment.id} onClick={replyCommentHandler}>
                                  Reply
                                </Button>

                                {+secondLvlComment.id === +selected && <AddComment id={secondLvlComment.id} comment_level={secondLvlComment.comment_level} nameInputRef={nameInputRef} commentInputRef={commentInputRef} onSubmit={addCommentHandler} />}

                                {secondLvlComment.replies.length > 0 && (
                                  <ul>
                                    {secondLvlComment.replies.map(
                                      (thirdLvlComment) => 
                                        thirdLvlComment.comment_level === 3 && (
                                          <li key={thirdLvlComment.id}>
                                            <p>{thirdLvlComment.name}</p>
                                            <p>{thirdLvlComment.body}</p>
                                          </li>
                                        )
                                    )}
                                  </ul>
                                )}
                              </li>
                            )
                        )}
                      </ul>
                    )}
                  </li>
                )
            )}
          </ul>
        )}
        {props.comments.length === 0 && <ul>No Comments.</ul>}
      </Card>
    </Fragment>
  );
};

export default CommentsList;