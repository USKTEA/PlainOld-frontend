import { apiService } from '../../services/ApiService';
import Store from '../Store';

export default class CreateReplyStore extends Store {
  constructor() {
    super();

    this.reply = {
      reviewId: null,
      parent: null,
      comment: '',
    };

    this.replyToReply = {
      reviewId: null,
      parent: null,
      comment: '',
    };

    this.toReply = null;

    this.errors = {
      create: '',
    };

    this.errorMessage = {
      create: '잠시 후 다시 시도해주세요',
    };
  }

  async create({ reviewId }) {
    try {
      const { id } = await apiService.createReply(
        { ...this.reply, reviewId },
      );

      return id;
    } catch (error) {
      this.errors.create = this.errorMessage.create;

      return '';
    } finally {
      this.clear();
      this.publish();
    }
  }

  async createReplyToReply({ reviewId }) {
    try {
      const { id } = await apiService.createReply(
        { ...this.replyToReply, reviewId },
      );

      return id;
    } catch (error) {
      this.errors.create = this.errorMessage.create;

      return '';
    } finally {
      this.clear();
      this.publish();
    }
  }

  setParent(parent) {
    this.replyToReply = { ...this.replyToReply, parent };
  }

  setToReply({ replyId }) {
    this.toReply = replyId;

    this.publish();
  }

  removeToReply() {
    this.toReply = null;

    this.replyToReply = {
      reviewId: null,
      parent: null,
      comment: '',
    };

    this.errors = {
      create: '',
    };

    this.publish();
  }

  change(comment) {
    this.reply = { ...this.reply, comment };

    this.publish();
  }

  changeReplyToReply(comment) {
    this.replyToReply = { ...this.replyToReply, comment };

    this.publish();
  }

  validate() {
    if (!this.reply.comment) {
      return false;
    }

    return true;
  }

  validateReplyToReply() {
    if (!this.replyToReply.comment) {
      return false;
    }

    return true;
  }

  clear() {
    this.reply = {
      reviewId: null,
      parent: null,
      comment: '',
    };

    this.replyToReply = {
      reviewId: null,
      parent: null,
      comment: '',
    };

    this.toReply = null;

    this.publish();
  }
}

export const createReplyStore = new CreateReplyStore();
