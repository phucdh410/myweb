export const formatSearchValue = (searchInput: string): string => {
  const text = searchInput
    .normalize('NFD')
    .toLowerCase()
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đ]/g, 'd');
  return text;
};

export const checkYoutubeLink = (link: string): boolean => {
  // Regular expression to match YouTube video URLs
  const youtubeRegex =
    /^(https?:\/\/)?(www\.)?(youtube|youtu|youtube-nocookie)\.(com|be)\/(watch\?v=|embed\/|v\/|.+\?v=)?([^&=%?]{11})/;
  return youtubeRegex.test(link);
};
