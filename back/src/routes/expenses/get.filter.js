import co from 'co';
import Joi from 'joi';
import Boom from 'boom';
import { Expense } from '../../db';
import { handleInternalError } from '../utils';

const route = {
  method: 'GET',

  path: '/expenses/filter',

  config: {
    tags: ['api'],

    validate: {
      query: {
        user: Joi.string().optional().description('String that is present in user`s email.'),
        comment: Joi.string().optional().description('String that is present in comment of the expense.'),
        description: Joi.string().optional().description('String that is present in description of the expense.'),
        amountMax: Joi.number().optional().description('The maximum amount spent.'),
        amountMin: Joi.number().optional().description('The minimum amount spent.'),
        dateFrom: Joi.date().optional().description('The expenses made after this date inclusive.'),
        dateTo: Joi.date().optional().description('The expenses made before this date inclusive.'),
      },
    },

    handler: (request, reply) => co(function* gen() {
      // const client = request.auth.credentials;
      const query = (request.query);
      const items = yield Expense.findFilter(query);
      reply(items);
    }).catch((err) => {
      handleInternalError(err);
      reply(Boom.internal());
    }),
  },
};

export default route;
