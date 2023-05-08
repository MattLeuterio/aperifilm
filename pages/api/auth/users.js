var Airtable = require('airtable');
const base = new Airtable({apiKey: 'keyESc9omNcoIm3Y8'}).base('apppG6gm1dzWPJzLP');

export const tableUsers = base('users');

export const minifyRecords = (records) => {
  return records.map(record => getMinifiedRecord(record));
}

const getMinifiedRecord = (record) => {
  return {
    id: record.id,
    fields: record.fields,
  }
}

export const retrieveUser = async (id) => {
  const retrieveRecord = await tableUsers.find(id);
  return retrieveRecord;
}

export const getUser = async (id) => {
  const airtableField = 'email';
  const records = await tableUsers.select({maxRecords: 1,filterByFormula: `${airtableField} = "${id}"`}).firstPage();
  return records;
}

export const createUser = async (fields) => {
  const createRecord = await tableUsers.create(fields);
  return createRecord;
}

export const updateUser = async (id, fields) => {
  const updateRecord = await tableUsers.update(id, fields);
  return updateRecord;
}