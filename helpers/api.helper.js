const { defaultErrorMessage } = require("../utils/messages");

module.exports = {
  response: (status = false, message = "", data = []) => ({
    status,
    message,
    data,
  }),
  defaultErrorResponse: (
    status = false,
    message = defaultErrorMessage(),
    data = []
  ) => ({
    status,
    message,
    data,
  }),
};
