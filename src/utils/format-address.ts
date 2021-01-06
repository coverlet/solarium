export const formatAddress = (text: string) => {
  return `${text.substring(0, 5)}...${text.substring(text.length - 5, text.length)}`;
};
