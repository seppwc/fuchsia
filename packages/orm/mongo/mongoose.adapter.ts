import mongoose from 'mongoose';
import { ConnectionOptions, Connection } from 'mongoose';
import { DatabaseAdapter } from '../adapter.abstract';
import {MONGOOSE_CONSTANTS} from './constants'

export class MongooseAdapter extends DatabaseAdapter {
  db: Connection;
  constructor() {
    super('MONGO');
  }

  async connect(connection: string, options: ConnectionOptions): Promise<void> {

    const dbOptions = {...MONGOOSE_CONSTANTS, ...options}

    try {
      mongoose.connect(connection, dbOptions);
      this.db = mongoose.connection;
      this.db.on('connected', this.handleConnectionSuccess.bind(this));
      this.db.on('error', this.handleConnectionError.bind(this));
    } catch (err) {
      console.log('DATATBASE CONNECTION ERROR: ' + err);
    }
  }

  async handleConnectionError() {
    console.error('I am Error');
  }

  async handleConnectionSuccess() {
    console.log('Connection to Mongo database successful!');
  }
}
