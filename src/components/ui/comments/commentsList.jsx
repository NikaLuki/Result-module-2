import React, { useEffect } from "react";
import Comment from "./comment";
import { orderBy } from "lodash";
import AddCommentForm from "./addCommentForm";
import { useDispatch, useSelector } from "react-redux";
import {
    createComment,
    getComments,
    getCommentsLoadingStatus,
    loadCommentsList,
    removeComment
} from "../../../store/comments";
import { useParams } from "react-router-dom";
import { getCurrentUserId } from "../../../store/users";

const CommentsList = () => {
    const { userId } = useParams();
    const currentUserId = useSelector(getCurrentUserId());
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadCommentsList(userId));
    }, [userId]);
    const isLoading = useSelector(getCommentsLoadingStatus());

    const comments = useSelector(getComments());
    const handleSubmit = (data) => {
        dispatch(
            createComment({ ...data, pageId: userId, userId: currentUserId })
        );
    };

    const handleRemove = (id) => {
        dispatch(removeComment(id));
    };
    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);
    return (
        <>
            <div className="card mb-2">
                <div className="card-body ">
                    <AddCommentForm onSubmit={handleSubmit} />
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-body ">
                    <h2>Comments</h2>
                    <hr />
                    {!isLoading
                        ? sortedComments.map((comment) => {
                              return (
                                  <Comment
                                      key={comment._id}
                                      content={comment.content}
                                      id={comment._id}
                                      userId={comment.userId}
                                      publishedTime={comment.created_at}
                                      onRemove={handleRemove}
                                  />
                              );
                          })
                        : "Loading"}
                    {}
                </div>
            </div>
        </>
    );
};

export default CommentsList;
