// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const Airtable = require('airtable');
const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE_ID);

export const tableVocabulary = base('vocabulary');

export const minifyRecords = (records) => {
  return records.map(record => getMinifiedRecord(record));
}

const getMinifiedRecord = (record) => {
  return {
    id: record.id,
    value: record.fields.value,
    en_label: record.fields.en_label,
    it_label: record.fields.it_label
  }
}

export default async (req, res) => {
  try {
    const records = await tableVocabulary.select({}).firstPage();
    const minifiedRecords = minifyRecords(records);
    res.status(200);
    res.json(minifiedRecords);
  } catch (err) {
    res.statusCode = 500;
    res.json({ msg: 'Vocabulary Error: Something went wrong' })
  }
}
