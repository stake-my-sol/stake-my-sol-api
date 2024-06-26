import app from "./server";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import ValidatorsDAO from "./dao/validatorsDAO";
import CommissionHistoryDAO from "./dao/commissionHistoryDAO";
import VotePerformanceHistoryDao from "./dao/votePerformanceHistoryDAO";
import updateValidatorsData from "./tasks/updateValidatorsData";

dotenv.config();

const PORT = parseInt(process.env.PORT) || 8000;
const UPDATE_INTERVAL = parseInt(process.env.UPDATE_INTERVAL);

MongoClient.connect(process.env.MONGO_CONNECT_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .catch((err) => {
    console.log(err);
    process.exit(1);
  })
  .then(async (client) => {
    await ValidatorsDAO.injectDB(client);
    await CommissionHistoryDAO.injectDB(client);
    await VotePerformanceHistoryDao.injectDB(client);

    await updateValidatorsData();

    setInterval(async () => {
      await updateValidatorsData();
    }, UPDATE_INTERVAL);

    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`);
    });
  });
