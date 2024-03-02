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

  export const putDb = async (content) => {
    try {
      const db = await openDB('jate', 1);
      const tx = db.transaction('jate', 'readwrite');
      const store = tx.objectStore('jate');
      const result = await store.put({ id: 1, content });  
      console.log('Data was saved to the database!', result);
      await tx.done;
      return result;
    } catch (error) {
      console.error('Could not save data to the database', error);
      throw new Error('putDb operation failed');
    }
  };
  
  export const getDb = async () => {
    try {
      const db = await openDB('jate', 1);
      const tx = db.transaction('jate', 'readonly');
      const store = tx.objectStore('jate');
      const result = await store.getAll();
      console.log('Data retrieved successfully!', result);
      await tx.done;
      return result;
    } catch (error) {
      console.error('Could not retrieve data from the database', error);
      throw new Error('getDb operation failed');
    }
  };

initdb();
