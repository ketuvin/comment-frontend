import { Fragment, useState } from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";
import AddReply from "./AddReply";
import classes from "./CommentsList.module.css";

const CommentsList = (props) => {
  const [selected, setSelected] = useState("");

  const replyCommentHandler = (event) => {
    event.preventDefault();
    setSelected(event.target.value);
  };

  const addRepplyHandler = (reply) => {
    props.onAddReply(reply);
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

                    {+comment.id === +selected && <AddReply id={comment.id} comment_level={comment.comment_level} onAddComment={addRepplyHandler} />}

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

                                {+secondLvlComment.id === +selected && <AddReply id={secondLvlComment.id} comment_level={secondLvlComment.comment_level} onAddComment={addRepplyHandler} />}

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