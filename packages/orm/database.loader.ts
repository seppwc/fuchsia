import { DatabaseAdapter } from './adapter.abstract';

export class DatabaseLoader {
  constructor(private db: DatabaseAdapter) {}

  async connect(connection: string, options: any) {
    await this.db.connect(connection, options);
  }
}
