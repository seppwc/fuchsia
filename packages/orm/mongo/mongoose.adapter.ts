import mongoose from 'mongoose';
import { ConnectionOptions, Connection } from 'mongoose';
import { DatabaseAdapter } from '../adapter.abstract';

export class MongooseAdapter extends DatabaseAdapter {
  db: Connection;
  constructor() {
    super('MONGO');
  }

  async connect(connection: string, options: ConnectionOptions): Promise<void> {
    try {
      mongoose.connect(connection, options);
      this.db = mongoose.connection;
      this.db.on('open', this.handleConnectionSuccess.bind(this));
      this.db.on('error', this.handleConnectionError.bind(this));
    } catch (err) {
      console.log('DATATBASE CONNECTION ERROR: ' + err);
    }
  }

  async handleConnectionError() {
    console.error('I am Error');
  }

  async handleConnectionSuccess() {
    console.log('Connection to Mongo database successfull!');
  }
}
