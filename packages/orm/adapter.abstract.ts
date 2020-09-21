export enum Database {
  SQL = 'SQL',
  MONGO = 'MONGO',
  GRAPHQL = 'GRAPHQL',
}

export type DatabaseTypes = keyof typeof Database;

export abstract class DatabaseAdapter {
  path: string;
  kind: Database;
  constructor(database: DatabaseTypes) {
    this.kind = Database[database];
  }

  abstract async connect(connection: string, options: any): Promise<any>;
}
