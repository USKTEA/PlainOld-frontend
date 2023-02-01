import { apiService } from '../../services/ApiService';
import Store from '../Store';

export default class GetReplyStore extends Store {
  constructor() {
    super();

    this.replies = new Map();
  }

  async fetchReplies({ reviewIds }) {
    const { replies } = await apiService.fetchReplies({ reviewIds });

    this.replies = replies.reduce((acc, reply) => {
      const reviewsReply = acc.get(reply.reviewId);

      if (reviewsReply) {
        if (reply.parent) {
          const parentIndex = reviewsReply.findIndex(
            (i) => i[0].id === reply.parent,
          );

          acc.set(reply.reviewId, [...reviewsReply.slice(0, parentIndex),
            [...reviewsReply[parentIndex], reply],
            ...reviewsReply.slice(parentIndex + 1),
          ]);

          return acc;
        }

        acc.set(reply.reviewId, [...reviewsReply, [reply]]);

        return acc;
      }

      acc.set(reply.reviewId, [[reply]]);

      return acc;
    }, new Map());

    this.publish();
  }
}

export const getReplyStore = new GetReplyStore();
