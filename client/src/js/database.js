import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {

  // opens the jate database
  const jateDb = await openDB('contact', 1);
  // create a transaction with readwrite permissions
  const tx = jateDb.transaction('jate', 'readwrite')
  // gets the object store
  const store = tx.objectStore('jate');
  // adds the text editor content to the object store
  await store.put(content)
  // wait for transaction to end
  await tx.done;

};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {

  // opens the database
  const jateDb = await openDB('contact', 1);
  // create a transaction with readonly permissions
  const tx = jateDb.transaction('jate', 'readonly')
  // gets the object store
  const store = tx.objectStore('jate');
  // retrieve all content from the object store
  const request = store.getAll();
  const result = await request;
  // return the result of the GET
  return result;
}

initdb();
