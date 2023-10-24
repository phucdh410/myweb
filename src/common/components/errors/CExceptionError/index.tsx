import { Link } from 'react-router-dom';

import img from '@/assets/images/error.jpg';

import './index.scss';

export const CExceptionError = () => {
  return (
    <div className="error-page">
      <h1
        style={{
          textAlign: 'center',
          fontSize: '50px',
          letterSpacing: '10px',
        }}
      >
        Đã xảy ra lỗi !
      </h1>

      <img
        src={img}
        alt=""
        style={{ maxHeight: '60%', width: 'auto', objectFit: 'cover' }}
      />

      <div className="link-container">
        <Link to={'/'} className="more-link">
          Về trang chủ
        </Link>
      </div>
    </div>
  );
};
