import * as sqlite3  from "sqlite3";
const dbFilePath: string = "";
export const databaseTest = new sqlite3.Database(dbFilePath, (err) => {
  if (err) {
    console.log('Could not connect to database', err)
  } else {
    console.log('Connected to database')
  }
})
