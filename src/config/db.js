const mongoose = require("mongoose");

const dbURLs = {
  general:
    "mongodb+srv://astroman6569:zCMSXHfmQ5RhpjE2@hindusim.uwrnlbv.mongodb.net/genral?retryWrites=true&w=majority",

  profiles:
    "mongodb+srv://astroman6569:zCMSXHfmQ5RhpjE2@hindusim.uwrnlbv.mongodb.net/profiles?retryWrites=true&w=majority",

  users:
    "mongodb+srv://astroman6569:zCMSXHfmQ5RhpjE2@hindusim.uwrnlbv.mongodb.net/users?retryWrites=true&w=majority",

  places:
    "mongodb+srv://astroman6569:zCMSXHfmQ5RhpjE2@hindusim.uwrnlbv.mongodb.net/places?retryWrites=true&w=majority",

  topics:
    "mongodb+srv://astroman6569:zCMSXHfmQ5RhpjE2@hindusim.uwrnlbv.mongodb.net/topics?retryWrites=true&w=majority",

  community:
    "mongodb+srv://astroman6569:zCMSXHfmQ5RhpjE2@hindusim.uwrnlbv.mongodb.net/community?retryWrites=true&w=majority",

  books:
    "mongodb+srv://astroman6569:zCMSXHfmQ5RhpjE2@hindusim.uwrnlbv.mongodb.net/books?retryWrites=true&w=majority",

  technology:
    "mongodb+srv://astroman6569:zCMSXHfmQ5RhpjE2@hindusim.uwrnlbv.mongodb.net/technology?retryWrites=true&w=majority",

  events:
    "mongodb+srv://astroman6569:zCMSXHfmQ5RhpjE2@hindusim.uwrnlbv.mongodb.net/events?retryWrites=true&w=majority",

  blogs:
    "mongodb+srv://astroman6569:zCMSXHfmQ5RhpjE2@hindusim.uwrnlbv.mongodb.net/blogs?retryWrites=true&w=majority",

  organisations:
    "mongodb+srv://astroman6569:zCMSXHfmQ5RhpjE2@hindusim.uwrnlbv.mongodb.net/organisations?retryWrites=true&w=majority",

  festivals:
    "mongodb+srv://astroman6569:zCMSXHfmQ5RhpjE2@hindusim.uwrnlbv.mongodb.net/festivals?retryWrites=true&w=majority",

  temples:
    "mongodb+srv://astroman6569:zCMSXHfmQ5RhpjE2@hindusim.uwrnlbv.mongodb.net/temples?retryWrites=true&w=majority",
};

const createConnection = (url) => {
  return mongoose.createConnection(url, {
    serverSelectionTimeoutMS: 60000,
  });
};

const profileConnection = createConnection(dbURLs.profiles);
const userConnection = createConnection(dbURLs.users);
const placeConnection = createConnection(dbURLs.places);
const topicConnection = createConnection(dbURLs.topics);
const communityConnection = createConnection(dbURLs.community);
const bookConnection = createConnection(dbURLs.books);
const techConnection = createConnection(dbURLs.technology);
const eventConnection = createConnection(dbURLs.events);
const blogConnection = createConnection(dbURLs.blogs);
const organisationConnection = createConnection(dbURLs.organisations);
const festivalConnection = createConnection(dbURLs.festivals);
const templeConnection = createConnection(dbURLs.temples);

const connections = [
  { name: "User", connection: userConnection },
  { name: "Places", connection: placeConnection },
  { name: "Profile", connection: profileConnection },
  { name: "Topics", connection: topicConnection },
  { name: "Community", connection: communityConnection },
  { name: "Book", connection: bookConnection },
  { name: "Technology", connection: techConnection },
  { name: "Event", connection: eventConnection },
  { name: "Blog", connection: blogConnection },
  { name: "Organisation", connection: organisationConnection },
  { name: "Festival", connection: festivalConnection },
  { name: "Temple", connection: templeConnection },
];

connections.forEach((conn) => {
  conn.connection.on("open", () => {
    console.log(`${conn.name} DB connected!`);
    const allConnected = connections.every(
      (c) => c.connection.readyState === 1
    );
    if (allConnected) {
      console.log("All DBs connected!");
    }
  });
});

const ConnectDB = async () => {
  try {
    mongoose.connect(dbURLs.general);
    console.log("General DB connected!");
  } catch (error) {
    console.error("ERROR in connecting to the general database:", error);
  }
};

const closeConnections = async () => {
  try {
    await mongoose.disconnect();
    await profileConnection.close();
    await userConnection.close();
    await placeConnection.close();
    await topicConnection.close();
    await communityConnection.close();
    await bookConnection.close();
    await techConnection.close();
    await eventConnection.close();
    await blogConnection.close();
    await organisationConnection.close();
    await festivalConnection.close();
    await templeConnection.close();
    console.log("All connections closed!");
  } catch (error) {
    console.error("Error closing connections:", error);
  }
};

process.on("exit", closeConnections);
process.on("SIGINT", closeConnections);
process.on("SIGTERM", closeConnections);

module.exports = {
  ConnectDB,
  profileConnection,
  userConnection,
  placeConnection,
  topicConnection,
  communityConnection,
  bookConnection,
  techConnection,
  eventConnection,
  blogConnection,
  organisationConnection,
  festivalConnection,
  templeConnection,
};
