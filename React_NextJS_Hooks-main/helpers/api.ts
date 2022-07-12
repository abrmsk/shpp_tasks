const url = process.env.NEXT_PUBLIC_DOMAIN;

export const API = {
  topPage: {
    find: url + '/api/top-page/find',
    byAlias: url + '/api/top-page/byAlias/'
  },
  product: {
    find: url + '/api/product/find',
  },
  review: {
    createDemo: url + '/api/review/create-demo',
  }
};
