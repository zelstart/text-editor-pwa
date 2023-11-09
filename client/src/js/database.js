import { openDB } from 'idb';

// initialize the database
const initdb = async () =>
  openDB('jate', 1, {
    // called if the database version is less than the version provided
    upgrade(db) {
      // if the object store already exists, do nothing
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      // create a new object store with an autoincrementing key
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// add/update content to the database
export const putDb = async (content) => {
  // opens the jate database
  const jateDb = await initdb();
  // create a transaction with readwrite permissions
  const tx = jateDb.transaction('jate', 'readwrite');
  // gets the object store
  const store = tx.objectStore('jate');
  // add content to the store with an autoincrementing id
  await store.put({ id: 1, content: content });
  // wait for the transaction to complete before closing the database
  await tx.done;
  console.log('Content added to the database');
};

// get content from the database
export const getDb = async () => {
  // opens the jate database
  const jateDb = await initdb();
  // create a transaction with readonly permissions
  const tx = jateDb.transaction('jate', 'readonly');
  // gets the object store
  const store = tx.objectStore('jate');
  // get content from the store with id 1
  const data = await store.get(1);
  // wait for the transaction to complete
  await tx.done;
  // return the content. if there is no content, return an empty string
  return data ? data.content : '';
};

initdb();