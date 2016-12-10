import React from 'react';
import uniqueId from 'lodash/uniqueId';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';
import { ItemOrItemForm } from './';

const props = {
  expense: fromJS({
    cid: uniqueId('expense_'),
    id: 0,
    email: '',
    role: 100,
    edit: false,
    saving: false,
    deleting: false,
  }),
  labels: [],
};

describe('ItemOrItemForm', () => {
  it('renders without errors when edit=false', () => {
    shallow(<ItemOrItemForm {...props} />);
  });
  it('renders without erros when edit=true', () => {
    props.expense = props.expense.set('edit', true);
    shallow(<ItemOrItemForm {...props} />);
  });
});