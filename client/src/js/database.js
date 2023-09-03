import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate");
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  let db = await initdb();
  db.put("jate", content, "content");
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  let db = await initdb();
  let allContent = await db.getAll("jate");
  return allContent.toString();
};

initdb();
