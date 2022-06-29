// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const Airtable = require('airtable');
const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE_ID);

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

export default async (req, res) => {
  try {
    const records = await tableUsers.select({}).firstPage();
    const minifiedRecords = minifyRecords(records);
    res.status(200);
    res.json(minifiedRecords);
  } catch (err) {
    res.statusCode = 500;
    res.json({ msg: 'Users Error: Something went wrong' })
  }
}
