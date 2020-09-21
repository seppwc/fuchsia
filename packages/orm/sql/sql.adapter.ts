import { DatabaseAdapter } from '../adapter.abstract';

export class SQLAdapter extends DatabaseAdapter {
  constructor() {
    super('SQL');
  }

  async connect() {}
}
