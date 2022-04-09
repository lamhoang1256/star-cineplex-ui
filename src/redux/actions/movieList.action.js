import axiosClient from "apis/axiosClient";
import {
  GET_MOVIE_LIST_REQUEST,
  GET_MOVIE_LIST_SUCCESS,
  GET_MOVIE_LIST_FAIL,
} from "../constants/movieList.constant";

export const getMovieListAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_MOVIE_LIST_REQUEST });
    const response = await axiosClient.get(`QuanLyPhim/LayDanhSachPhim?maNhom=GP13`);

    // lọc dữ liệu trả về để lấy ra các thể loại phim cho tab Homepage
    const filterTypeMovie = () => {
      const dataFilter = { isShowingMovie: [], comingSoonMovie: [], hotMovie: [] };
      // dùng for lặp 2 lần lọc để trả nhiều dữ liệu phim hơn
      for (let i = 0; i < 2; i++) {
        response.data.content.map((item) => {
          if (item.sapChieu === true) {
            dataFilter.comingSoonMovie.push(item); //phim sắp chiếu
          } else if (item.sapChieu === false) {
            dataFilter.isShowingMovie.push(item); // phim đang chiếu
          }
          if (item.hot === true) {
            dataFilter.hotMovie.push(item); // phim hot
          }
        });
      }
      return dataFilter;
    };
    const data = filterTypeMovie(response);
    dispatch({ type: GET_MOVIE_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: GET_MOVIE_LIST_FAIL, payload: err });
  }
};
