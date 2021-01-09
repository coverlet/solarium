export const formatAddress = (text: string): string => {
  return `${text.substring(0, 4)}...${text.substring(text.length - 4, text.length)}`;
};
