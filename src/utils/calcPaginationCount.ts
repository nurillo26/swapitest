export const calcPaginationCount = (totalElements: number, elementsOnPage: number) => {
  return Math.ceil(totalElements / elementsOnPage);
};
