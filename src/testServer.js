/* eslint-disable import/no-extraneous-dependencies */

import { rest } from 'msw';
import { setupServer } from 'msw/node';

import config from './config';

const baseUrl = config.apiBaseUrl;

const server = setupServer(
  rest.get(`${baseUrl}/categories`, async (req, res, ctx) => res(ctx.json({
    categories: [
      {
        id: 1,
        name: 'T-shirts',
      },
    ],
  }))),

  rest.get(`${baseUrl}/products`, async (req, res, ctx) => res(ctx.json({
    page: {
      current: 1,
      total: 1,
    },
    products: [
      {
        id: 1,
        name: 'T-shirt',
        price: 10_000,
        categoryId: 1,
        thumbnailUrl: 1,
      },
    ],
  }))),
);
export default server;
