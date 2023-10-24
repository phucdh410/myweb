export interface ICreateLinksParams {
  youth: string;
  online: string;
  certificate: string;
  support: string;
  facebook: string;
}

// Category:
// YOUTH = 1, // Youth
// ONLINE = 2, // Online sinh viên
// CERTIFICATE = 3, // Đăng ký giấy chứng nhận
// SUPPORT = 4, // Hỗ trợ sinh viên
// FACEBOOK = 5, // Facebook
export interface ILinkData {
  id: string;
  title: string;
  url: string;
  category: 1 | 2 | 3 | 4 | 5;
}

export interface IUpdateLinksParams extends ICreateLinksParams {}
