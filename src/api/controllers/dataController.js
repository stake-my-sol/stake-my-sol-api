import ValidatorsDAO from "../../dao/validatorsDAO";

export default class DataController {
  static async apiGetGeneralData(req, res) {
    try {
      const { network } = req.body.data;

      let {
        count,
        maxActiveStake,
        names,
        asns,
        softwareVersions,
        dataCenters,
      } = await ValidatorsDAO.getGetGeneralData(network);

      res.send({
        count,
        maxActiveStake,
        names,
        asns,
        softwareVersions,
        dataCenters,
      });
    } catch (err) {
      console.error(`Unable to get search-form data in DataController: ${err}`);
    }
  }

  static async apiGetSingleValidatorData(req, res) {
    try {
      const { account, network } = req.body.data;

      let validatorData = await ValidatorsDAO.getSingleValidatorData(
        network,
        account
      );

      res.send(validatorData);
    } catch (err) {
      console.error(
        `Unable to get single validator data in DataController: ${err}`
      );
    }
  }

  static async apiGetGroupValidatorsData(req, res) {
    try {
      const {
        network,
        page,
        perPage,
        sort: { sortBy, direction },
      } = req.body.data;

      let validatorsData = await ValidatorsDAO.getGroupValidatorsData(
        network,
        page,
        perPage,
        sortBy,
        direction
      );

      res.send(validatorsData);
    } catch (err) {
      console.error(
        `Unable to get group of validators data in DataController: ${err}`
      );
    }
  }
}
