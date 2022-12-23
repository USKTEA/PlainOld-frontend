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
  rest.get(`${baseUrl}/products/1`, async (req, res, ctx) => res(ctx.json(
    {
      id: 1,
      name: 'T-shirt',
      price: 10_000,
      description: {
        productDetail: 'Very Good',
        productSummary: 'Good',
      },
      image: {
        thumbnailUrl: 'http://url.com',
        productImageUrls: ['http://url.com'],
      },
      shipping: {
        shippingMethod: '택배',
        shippingPee: 2_500,
        freeShippingAmount: 50_000,
      },
      status: 'ON_SALE',
      categoryId: 1,
    },
  ))),
  rest.get(`${baseUrl}/products/2`, async (req, res, ctx) => res(ctx.json(
    {
      id: 2,
      name: 'Pants',
      price: 10_000,
      description: {
        productDetail: 'Very Good',
        productSummary: 'Good',
      },
      image: {
        thumbnailUrl: 'http://url.com',
        productImageUrls: ['http://url.com'],
      },
      shipping: {
        shippingMethod: '택배',
        shippingPee: 2_500,
        freeShippingAmount: 50_000,
      },
      status: 'ON_SALE',
      categoryId: 2,
    },
  ))),
  rest.get(`${baseUrl}/products/9999999`, async (req, res, ctx) => (
    res(ctx.status(400)))),
);

export default server;
