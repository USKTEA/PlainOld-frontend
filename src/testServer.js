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
        shippingFee: 2_500,
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
        shippingFee: 2_500,
        freeShippingAmount: 50_000,
      },
      status: 'ON_SALE',
      categoryId: 2,
    },
  ))),
  rest.get(`${baseUrl}/products/3`, async (req, res, ctx) => res(ctx.json(
    {
      id: 3,
      name: 'T-Shirt',
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
        shippingFee: 2_500,
        freeShippingAmount: 50_000,
      },
      status: 'ON_SALE',
      categoryId: 1,
      optionData: {
        colors: [
          {
            name: 'Gray', red: 120, green: 120, blue: 120,
          },
          {
            name: 'Black', red: 0, green: 0, blue: 0,
          },
          {
            name: 'White', red: 255, green: 255, blue: 255,
          },
        ],
        sizes: ['XL', 'L', 'M'],
      },
    },
  ))),
  rest.get(`${baseUrl}/products/9999999`, async (req, res, ctx) => (
    res(ctx.status(400))
  )),
  rest.post(`${baseUrl}/orders`, async (req, res, ctx) => {
    // 로그인하면 header에 accessToken 넣어야지
    const orderSpecification = await req.json();

    const { orderItems } = orderSpecification;

    if (orderItems[0].productId === 9_999_999) {
      return rest(ctx.status(400));
    }

    return res(
      ctx.json({
        orderNumber: 'tjrxo1234-2022122993760',
        cost: 50_000,
        receiver: {
          name: '김뚜루',
          phoneNumber: '010-1111-1111',
        },
        shippingAddress: {
          zipCode: '111111',
          address1: '서울시 성동구 상원12길 34',
          address2: '에이원지식산업센터',
        },
      }),
    );
  }),
);

export default server;
