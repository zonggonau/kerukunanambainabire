function getUserByEmail(email) {
  const qs = require("qs");
  const query = qs.stringify(
    {
      filters: {
        email: {
          $eq: email,
        },
      },
    },
    // {
    //   populate: "*",
    // },
    {
      encodeValuesOnly: true,
    }
  );

  return query;
}

export { getUserByEmail };
