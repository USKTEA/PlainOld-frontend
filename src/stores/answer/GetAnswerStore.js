import { apiService } from '../../services/ApiService';
import Store from '../Store';

export default class GetAnswerStore extends Store {
  constructor() {
    super();

    this.answers = new Map();
  }

  async fetchAnswers({ inquiryIds }) {
    const { answers } = await apiService.fetchAnswers({ inquiryIds });

    this.answers = answers.reduce((acc, answer) => {
      if (acc.get(answer.inquiryId)) {
        acc.set(answer.inquiryId, [...acc.get(answer.inquiryId), answer]);

        return acc;
      }

      acc.set(answer.inquiryId, [answer]);

      return acc;
    }, new Map());

    this.publish();
  }

  clear() {
    this.answers = new Map();
  }
}

export const getAnswerStore = new GetAnswerStore();
