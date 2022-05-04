import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { postComment } from "redux/actions/movie/movieDetail.action";
import Swal from "sweetalert2";
import "./addComment.scss";

export const AddComment = () => {
  const dispatch = useDispatch();
  const { idDetail } = useParams();
  const { userInfo } = useSelector((state) => state.user);

  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState("");
  const handleAddNewComment = () => {
    if (!userInfo) {
      Swal.fire({
        icon: "error",
        title: "Đăng nhận xét thất bại!",
        text: "Vui lòng đăng nhập để đăng nhận xét!",
        confirmButtonColor: "#d33",
      });
      return;
    }
    if (newComment.length < 40) {
      setError("Nhận xét ít nhất gồm 40 kí tự");
      return;
    }
    if (newComment.length > 400) {
      setError("Nhận xét nhiều nhất gồm 400 kí tự");
      return;
    }
    const requestComment = {
      idMovie: idDetail,
      username: userInfo.taiKhoan,
      content: newComment,
      rating: 0,
      like: 0,
      createdAt: Date.now(),
    };
    dispatch(postComment(requestComment));
    setError("");
    setNewComment("");
  };

  return (
    <div className='addComment'>
      <h3>Thêm nhận xét mới</h3>
      <textarea
        name='addComment-textarea'
        className='addComment-textarea'
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder='Viết nhận xét...'
      ></textarea>
      {error !== "" && <span className='text--primary'>{error}</span>}
      <button className='btn btn--primary addComment-btn' onClick={handleAddNewComment}>
        Nhận xét
      </button>
    </div>
  );
};
