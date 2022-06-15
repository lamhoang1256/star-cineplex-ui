import { formatLocaleDateString } from "utilities/formatDate";
import styled from "styled-components";
import Description from "components/text/Description";
import Field from "components/field/FieldText";

const StyledDetailOverview = styled.div`
  font-size: 1.8rem;
  line-height: 2;
  flex: 1;
  color: var(--white);
  span {
    color: #9692c7;
    font-weight: 500;
    margin-right: 10px;
  }
`;

const DetailOverview = ({ data }) => {
  const { tenPhim, ngayKhoiChieu, danhGia } = data;
  return (
    <StyledDetailOverview>
      <Field>
        <span>Tên phim:</span>
        <Description>{tenPhim}</Description>
      </Field>
      <Field>
        <span>Ngày công chiếu:</span>
        {formatLocaleDateString(ngayKhoiChieu)}
      </Field>
      <Field>
        <span>Điểm đánh giá:</span>
        <Description>{danhGia / 2 + "/ 5"}</Description>
      </Field>
      <Field>
        <span>Đạo diễn:</span>
        <Description>Adam Wingard</Description>
      </Field>
      <Field>
        <span>Diễn viên:</span>
        <Description>Kyle Chandler, Rebecca Hall, Eiza González, Millie Bobby Brown</Description>
      </Field>
    </StyledDetailOverview>
  );
};

export default DetailOverview;
