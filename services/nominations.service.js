const { SAG } = require("../schema/sag.database.js");

module.exports = {
  getInfo: async () => {
    const array_with_info = await SAG.find().exec();
    //console.log(array_with_info);
    return array_with_info;
  },
};
