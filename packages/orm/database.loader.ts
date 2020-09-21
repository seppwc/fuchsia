import { DatabaseAdapter } from './adapter.abstract';

export class DatabaseLoader {
  constructor(private db: DatabaseAdapter) {}

  async connect(connection: string, options: any) {
    // console.clear();
    await this.db.connect(connection, options);
  }
}
