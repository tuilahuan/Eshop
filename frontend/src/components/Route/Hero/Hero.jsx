import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";

const Hero = () => {
  return (
    <div
      className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex}`}
      style={{
        backgroundImage: "url(background.jpg)",
      }}
    >
      <div className={`${styles.section} ml-44 w-[90%] 800px:w-[60%]`}>
        <h1
          className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize`}
        >
          Bộ Sưu Tập Tốt Nhất Để
          <br /> Trang Trí Nhà Cửa
        </h1>
        <p className="pt-5 text-[18px] font-[400] text-[#000000ba]">
          Bản thân công ty đã là một công ty rất thành công. May mắn, giả sử? Do
          đó, bất cứ ai
          <br /> việc thực hiện lao động hay thậm chí là khắc nghiệt hơn với nỗi
          đau, sự lựa chọn được trả vào những lúc được khen ngợi sẽ dẫn đến việc
          từ bỏ
          <br /> một số nhiệm vụ. Chúng thường không giúp giảm đau.
        </p>
        <Link to="/products" className="inline-block">
          <div className={`${styles.button} mt-5`}>
            <span className="text-[#fff] font-[Poppins] text-[18px]">
              Mua ngay
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
