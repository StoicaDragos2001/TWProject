const { SAG } = require("../schema/sag.database.js");

module.exports = {
  getInfoStatisticsNominations: async () => {
    const array_with_info_for_statistics_nominations = await SAG.aggregate([
      { $match: { full_name: { $ne: "" } } },
      {
        $group: {
          _id: { full_name: "$full_name", year: "$year" },
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]).exec();
    return array_with_info_for_statistics_nominations;
  },
  getInfoStatisticsAboutAWinner: async (name) => {
    let result = name.replace("_", " ");
    const array_with_info_for_statistics_only_a_winner = await SAG.aggregate([
      { $match: { full_name: { $eq: result }, won: { $eq: "True" } } },
      {
        $group: {
          _id: { full_name: "$full_name", year: "$year" },
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]).exec();
    return array_with_info_for_statistics_only_a_winner;
  },
};
