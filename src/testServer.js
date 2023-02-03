/* eslint-disable import/no-extraneous-dependencies */
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import config from './configuration';

const baseUrl = config.apiBaseUrl;

const server = setupServer(
  rest.post(`${baseUrl}/session`, async (req, res, ctx) => {
    const { username, password } = await req.json();

    if (username === 'tjrxo1234@gmail.com' && password === 'Password1234!') {
      return res(
        ctx.json({
          accessToken: 'ACCESSTOKEN',
        }),
      );
    }

    return res(
      ctx.status(400),
      ctx.json({
        message: '아이디 혹은 비밀번호가 맞지 않습니다',
      }),
    );
  }),
  rest.get(`${baseUrl}/users/me`, async (req, res, ctx) => {
    const accessToken = req.headers.get('authorization').split(' ')[1];

    if (accessToken === 'INVALIDACCESSTOKEN') {
      return res(
        ctx.status(400),
      );
    }

    if (accessToken === 'ADMIN') {
      return res(
        ctx.json({
          username: 'admin@admin.com',
          role: 'ADMIN',
        }),
      );
    }

    return res(
      ctx.json({
        username: 'tjrxo1234@gmail.com',
        role: 'MEMBER',
      }),
    );
  }),
  rest.get(`${baseUrl}/categories`, async (req, res, ctx) => res(ctx.json({
    categories: [
      {
        id: 1,
        name: 'T-shirts',
      },
    ],
  }))),
  rest.get(`${baseUrl}/products`, async (req, res, ctx) => res(ctx.json({
    products: [
      {
        id: 1,
        name: 'T-shirt',
        price: 10_000,
        categoryId: 1,
        thumbnailUrl: 1,
      },
    ],
    page: {
      current: 1,
      total: 1,
      counts: 1,
    },
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
  rest.get(`${baseUrl}/orders`, async (req, res, ctx) => {
    const productId = req.url.searchParams.get('productId');

    if (productId === '1') {
      return res(ctx.json({
        orderNumber: 'tjrxo1234-202301061131',
      }));
    }

    return res(ctx.status(400));
  }),
  rest.post(`${baseUrl}/orders`, async (req, res, ctx) => {
    const orderSpecification = await req.json();

    const { orderItems } = orderSpecification;

    if (orderItems[0].productId === 9_999_999) {
      return res(ctx.status(400));
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
  rest.get(`${baseUrl}/carts`, async (req, res, ctx) => res(
    ctx.json({
      items: [
        {
          productId: 1,
          price: 10_000,
          name: 'T-Shirt',
          thumbnailUrl: '1',
          shippingFee: 2_500,
          freeShippingAmount: 50_000,
          quantity: 1,
          totalPrice: 10_000,
          option: { size: 'L', color: 'Black' },
        },
      ],
    }),
  )),
  rest.post(`${baseUrl}/carts`, async (req, res, ctx) => res(
    ctx.json({
      counts: 1,
    }),
  )),
  rest.get(`${baseUrl}/reviews`, async (req, res, ctx) => {
    const productId = req.url.searchParams.get('productId');
    const photoReviews = req.url.searchParams.get('photoReviews');

    if (productId === '2') {
      return res(ctx.json({
        reviews: [],
        page: {
          current: 1,
          total: 1,
          counts: 0,
        },
      }));
    }

    if (productId === '3') {
      return res(
        ctx.json({
          reviews: [
            {
              id: 3,
              productId: 3,
              reviewer: {
                username: 'tjrxo1234@gmail.com',
                nickname: '김뚜루',
              },
              rate: 5,
              comment: '좋은 상품입니다',
              imageUrl: '1',
              cratedAt: '2022-01-15 12:45',
            },
            {
              id: 4,
              productId: 3,
              reviewer: {
                username: 'tjrxo1234@gmail.com',
                nickname: '김뚜루',
              },
              rate: 5,
              comment: '매우 좋은 상품입니다',
              cratedAt: '2022-01-15 12:45',
            },
          ],
          page: {
            current: 1,
            total: 1,
            counts: 2,
          },
        }),
      );
    }

    if (photoReviews === 'true') {
      return res(
        ctx.json({
          reviews: [
            {
              id: 1,
              productId: 1,
              reviewer: {
                username: 'tjrxo1234@gmail.com',
                nickname: '김뚜루',
              },
              rate: 5,
              comment: '좋은 상품입니다',
              imageUrl: '1',
              cratedAt: '2022-01-15 12:45',
            },
          ],
          page: {
            current: 1,
            total: 1,
            counts: 1,
          },
        }),
      );
    }

    return res(
      ctx.json({
        reviews: [
          {
            id: 1,
            productId: 1,
            reviewer: {
              username: 'tjrxo1234@gmail.com',
              nickname: '김뚜루',
            },
            rate: 5,
            comment: '좋은 상품입니다',
            imageUrl: '1',
            cratedAt: '2022-01-15 12:45',
          },
          {
            id: 2,
            productId: 1,
            reviewer: {
              username: 'tjrxo1234@gmail.com',
              nickname: '김뚜루',
            },
            rate: 5,
            comment: '매우 좋은 상품입니다',
            cratedAt: '2022-01-15 12:45',
          },
        ],
        page: {
          current: 1,
          total: 1,
          counts: 2,
        },
      }),
    );
  }),
  rest.post(`${baseUrl}/reviews`, async (req, res, ctx) => {
    const review = await req.json();

    if (review.orderNumber === 'invalidOrderNumber') {
      return res(ctx.status(400));
    }

    return res(ctx.json({
      reviewId: 1,
    }));
  }),
  rest.patch(`${baseUrl}/reviews`, async (req, res, ctx) => {
    const review = await req.json();

    if (review.id === 9999999) {
      return res(ctx.status(400));
    }

    return res(ctx.json({
      reviewId: review.id,
    }));
  }),
  rest.delete(`${baseUrl}/reviews/1`, async (req, res, ctx) => res(
    ctx.json({ reviewId: 1 }),
  )),
  rest.delete(`${baseUrl}/reviews/9999999`, async (req, res, ctx) => res(
    ctx.status(400),
  )),
  rest.post(`${baseUrl}/files`, async (req, res, ctx) => {
    const formData = await req.arrayBuffer();

    const fileType = formData.get('file').type;

    const fileName = formData.get('file').name;

    if (fileType !== 'image/png' || fileName === 'shouldNotUploaded.png') {
      return res(ctx.status(400));
    }

    return res(ctx.json({
      url: 'fileUrl',
    }));
  }),
  rest.get(`${baseUrl}/replies`, async (req, res, ctx) => {
    const reviewIds = req.url.searchParams.get('reviewIds').split(',');

    if (reviewIds[0] === '3' && reviewIds[1] === '4') {
      return res(
        ctx.json({
          replies: [
            {
              id: 1,
              parent: null,
              reviewId: 3,
              comment: '정말 좋아보여요',
              replier: {
                username: 'tjrxo1234@gmail.com',
                nickname: '김뚜루',
              },
              createdAt: '2022-01-15 12:45',
            },
          ],
        }),
      );
    }

    return res(
      ctx.status(204),
    );
  }),
  rest.post(`${baseUrl}/replies`, async (req, res, ctx) => {
    const { reviewId } = await req.json();

    if (reviewId === 9_999_999) {
      return res(
        ctx.status(400),
      );
    }

    return res(
      ctx.json({
        id: 1,
      }),
    );
  }),
  rest.patch(`${baseUrl}/replies`, async (req, res, ctx) => {
    const { id } = await req.json();

    if (id === 9_999_999) {
      return res(
        ctx.status(400),
      );
    }

    return res(
      ctx.json({
        id,
      }),
    );
  }),
  rest.delete(`${baseUrl}/replies/1`, async (req, res, ctx) => res(
    ctx.json({
      id: 1,
    }),
  )),
  rest.delete(`${baseUrl}/replies/9999999`, async (req, res, ctx) => res(
    ctx.status(400),
  )),
  rest.get(`${baseUrl}/inquiries`, async (req, res, ctx) => {
    const productId = req.url.searchParams.get('productId');

    if (productId === '1') {
      return res(
        ctx.json({
          inquiries: [
            {
              id: 1,
              productId: 1,
              status: 'PENDING',
              type: 'PUBLIC',
              title: '사이즈 문의드립니다',
              content: '이렇게 입으면 클까요',
              querist: {
                username: 'tjrxo1234@gmail.com',
                nickname: '김뚜루',
              },
              createdAt: '2023-01-29 14:32',
            },
            {
              id: 2,
              productId: 1,
              status: 'PENDING',
              type: 'PUBLIC',
              title: '색상 문의드립니다',
              content: '이런 색상인가요',
              querist: {
                username: 'rlatjrxo1234@gmail.com',
                nickname: '안김뚜루',
              },
              createdAt: '2023-01-29 15:32',
            },
            {
              id: 3,
              productId: 1,
              status: 'FINISHED',
              type: 'SECRET',
              title: '비밀글입니다.',
              content: '비밀글입니다.',
              querist: {
                username: 'rlatjrxo1234@gmail.com',
                nickname: '안김뚜루',
              },
              createdAt: '2023-01-30 14:32',
            },
          ],
          page: {
            current: 1,
            total: 1,
            counts: 4,
          },
        }),
      );
    }

    if (productId === '3') {
      return res(
        ctx.json({
          inquiries: [
            {
              id: 4,
              productId: 2,
              status: 'PENDING',
              type: 'PUBLIC',
              title: '이렇게 입으면 될까요',
              content: '이렇게 입으면 좋을까요',
              querist: {
                username: 'tjrxo1234@gmail.com',
                nickname: '김뚜루',
              },
              createdAt: '2023-01-30 15:32',
            },
          ],
          page: {
            current: 1,
            total: 1,
            counts: 1,
          },
        }),
      );
    }

    return res(ctx.status(204));
  }),
  rest.post(`${baseUrl}/inquiries`, async (req, res, ctx) => {
    const inquiry = await req.json();

    if (inquiry.productId === 9_999_999) {
      return res(
        ctx.status(400),
      );
    }

    return res(
      ctx.json(
        { id: 1 },
      ),
    );
  }),
  rest.patch(`${baseUrl}/inquiries`, async (req, res, ctx) => {
    const inquiry = await req.json();

    if (inquiry.id === 9_999_999) {
      return res(
        ctx.status(400),
      );
    }

    return res(
      ctx.json(
        { id: 1 },
      ),
    );
  }),
  rest.delete(`${baseUrl}/inquiries/1`, async (req, res, ctx) => res(
    ctx.json({ id: 1 }),
  )),
  rest.delete(`${baseUrl}/inquiries/9999999`, async (req, res, ctx) => res(
    ctx.status(400),
  )),
  rest.get(`${baseUrl}/answers`, async (req, res, ctx) => {
    const inquiryIds = req.url.searchParams.get('inquiryIds').split(',');

    if (inquiryIds[0] === '4') {
      return res(
        ctx.json({
          answers: [
            {
              id: 1,
              inquiryId: 4,
              answerer: {
                username: 'admin@admin.com',
                nickname: '관리자',
              },
              content: '맞습니다 그렇게 입으시면 됩니다',
              createdAt: '2023-01-30 16:32',
            },
          ],
        }),
      );
    }

    return res(
      ctx.status(204),
    );
  }),
  rest.post(`${baseUrl}/answers`, async (req, res, ctx) => {
    const answer = await req.json();

    if (answer.inquiryId === 9_999_999) {
      return res(
        ctx.status(400),
      );
    }

    return res(
      ctx.json({ id: 1 }),
    );
  }),
  rest.patch(`${baseUrl}/answers`, async (req, res, ctx) => {
    const answer = await req.json();

    if (answer.id === 9_999_999) {
      return res(
        ctx.status(400),
      );
    }

    return res(
      ctx.json({ id: answer.id }),
    );
  }),
  rest.delete(`${baseUrl}/answers/1`, async (req, res, ctx) => res(
    ctx.json({ id: 1 }),
  )),
  rest.delete(`${baseUrl}/answers/9999999`, async (req, res, ctx) => res(
    ctx.status(400),
  )),
);

export default server;
