import * as path from 'path';

export = {
  /**
   * Absolute path for the main project folder
   */
  root: path.normalize(__dirname + '/../../'),
  /**
   * Absolute path for the client folder
   */
  client: path.normalize(__dirname + '/../../client'),
  /**
   * Absolute path for the server folder
   */
  server: path.normalize(__dirname + '/../')
}
