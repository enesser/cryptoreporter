/**
 * Application test cases.
 */

'use strict';

const request = require('supertest');
const app = require('../src/app');

/**
 * Test case: reponds with 200 code with image-png. 
 */
describe('app', () => {
  it('responds with a PNG', (done) => {
    request(app)
      .get('/report.png')
      .set('Accept', 'image/png')
      .expect('Content-Type', /png/)
      .expect(200, done);
  });
});