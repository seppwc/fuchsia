import { DatabaseAdapter } from '../adapter.abstract';

export class GraphQLAdapter extends DatabaseAdapter {
  constructor() {
    super('GRAPHQL');
  }

  async connect() {}
}
