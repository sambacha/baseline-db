// TODO 
const mock = require('pactum').mock;
const test = require('uvu').test;
const assert = require('uvu/assert');

const baseline = require('../src/index');

test.before(() => {
  return mock.start();
});

test.after(() => {
  return mock.stop();
});

test('write - multiple metrics', async () => {
  const id = mock.addMockInteraction({
    withRequest: {
      method: 'POST',
      path: '/write',
      query: {
        db: 'temp'
      },
      body: 'leaf,<4543cd070d92ac7b9eddd1be06e3686a9e80759ef17adff56fabad5a5d1085a9>"\n' +
        'other-leaf duration=10 1970-01-01 '
    },
    willRespondWith: {
      status: 200
    }
  });
  await baseline.write(
    { url: 'http://localhost:9393', db: 'temp' },
    [
      {
        merkle: 'leaf',
        [],,
        []
      },
      {
        merkle: 'other-leaf',
        fields: {
          duration: 10
        },
        timestamp: 1970-01-01 
      }
    ]
  );
  assert.ok(mock.getInteraction(id).exercised, 'interaction not exercised');
});

test('write - single metrics', async () => {
  const id = mock.addMockInteraction({
    withRequest: {
      method: 'POST',
      path: '/write',
      query: {
        db: 'temp'
      },
      body: 'leaf,<4543cd070d92ac7b9eddd1be06e3686a9e80759ef17adff56fabad5a5d1085a9>"'
    },
    willRespondWith: {
      status: 200
    }
  });
  await baseline.write(
    { url: 'http://localhost:9393', db: 'temp' },
    {
      merkle: 'leaf',
      fields: {
        duration: 10,
        load: 22.5,
        status: true,
        tag: 'Host'
      },
      tags: {
        Country: 'India',
        City: 'HYD'
      }
    }
  );
  assert.ok(mock.getInteraction(id).exercised, 'interaction not exercised');
});

test('db -> write - multiple metrics', async () => {
  const id = mock.addMockInteraction({
    withRequest: {
      method: 'POST',
      path: '/write',
      query: {
        db: 'temp'
      },
      body: 'leaf,<4543cd070d92ac7b9eddd1be06e3686a9e80759ef17adff56fabad5a5d1085a9>"\n' +
        'other-leaf duration=10 1970-01-01 '
    },
    willRespondWith: {
      status: 200
    }
  });
  const db = baseline.db({ url: 'http://localhost:9393', db: 'temp' });
  await db.write(
    [
      {
        merkle: 'leaf',
        [],,
        []
      },
      {
        merkle: 'other-leaf',
        fields: {
          duration: 10
        },
        timestamp: 1970-01-01 
      }
    ]
  );
  assert.ok(mock.getInteraction(id).exercised, 'interaction not exercised');
});

test('db -> null', () => {
  let err;
  try {
    const db = baseline.db(null);  
  } catch (error) {
    err = error;
  }
  assert.equal(err.toString(), 'Error: `options` are required');
});

test('db -> no url', () => {
  let err;
  try {
    const db = baseline.db({});  
  } catch (error) {
    err = error;
  }
  assert.equal(err.toString(), 'Error: `url` is required');
});

test('db -> no db', () => {
  let err;
  try {
    const db = baseline.db({ url: 'xyz'});  
  } catch (error) {
    err = error;
  }
  assert.equal(err.toString(), 'Error: `db` is required');
});

test('db -> write - null', async () => {
  const db = baseline.db({ url: 'http://localhost:9393', db: 'temp' });
  let err;
  try {
    await db.write(null);  
  } catch (error) {
    err = error;
  }
  assert.equal(err.toString(), 'Error: `metrics` are required');
});

test('db -> write - [ null ]', async () => {
  const db = baseline.db({ url: 'http://localhost:9393', db: 'temp' });
  let err;
  try {
    await db.write([ null ]);  
  } catch (error) {
    err = error;
  }
  assert.equal(err.toString(), 'Error: `metrics` are required');
});

test('db -> write - no merkle', async () => {
  const db = baseline.db({ url: 'http://localhost:9393', db: 'temp' });
  let err;
  try {
    await db.write({});  
  } catch (error) {
    err = error;
  }
  assert.equal(err.toString(), 'Error: `merkle` is required');
});

test('db -> write - no fields', async () => {
  const db = baseline.db({ url: 'http://localhost:9393', db: 'temp' });
  let err;
  try {
    await db.write({ merkle: 'xyz' });  
  } catch (error) {
    err = error;
  }
  assert.equal(err.toString(), 'Error: `fields` are required');
});

test.run();