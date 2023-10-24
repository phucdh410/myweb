import { Link } from 'react-router-dom';

import './index.scss';

export const CNotFoundError = () => {
  return (
    <div className="notfound-error-page">
      <h1
        style={{
          textAlign: 'center',
          fontSize: '50px',
          letterSpacing: '10px',
        }}
      >
        Error
      </h1>
      <section className="error-container">
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
        <span className="zero">
          <span className="screen-reader-text">0</span>
        </span>
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
      </section>
      <div className="link-container">
        <Link to={'/'} className="more-link">
          Về trang chủ
        </Link>
      </div>
    </div>
  );
};
