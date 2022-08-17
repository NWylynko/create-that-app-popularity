// yonked from an old project https://github.com/NWylynko/business-primary-color/blob/main/functions/src/index.ts

export const initDatabase = async () => {
  const admin = await import("firebase-admin");
  const app = admin.apps[0] ?? admin.initializeApp();

  const database = app.database();
  const { ServerValue } = admin.database;
  const statsRef = database.ref("stats");

  const increment = (name: string) => {
    return statsRef.child(name).set(ServerValue.increment(1));
  };

  const list = () => {
    return new Promise((resolve, reject) => {
      statsRef
        .orderByValue()
        .once("value", (snapshots) => {
          resolve(snapshots.val());
        })
    })
  }

  return {
    database,
    ServerValue,
    increment,
    list
  };
};