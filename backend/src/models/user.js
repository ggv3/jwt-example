import { Model } from 'objection';
import Knex from 'knex';
import knexfile from '../../knexfile';

const knex = Knex(knexfile);
Model.knex(knex);

class User extends Model {
  static get tableName() {
    return 'user';
  }
}

module.exports = User;
