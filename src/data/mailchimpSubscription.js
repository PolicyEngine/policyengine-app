import jsonp from "jsonp";

/**
 * @typedef {Promise} MailchimpReturn
 * @property {Boolean} isSuccessful Whether or not form submitted
 * successfully
 * @property {String} message A message representing Mailchimp's response
 */

/**
 * Async function that submits an email to the PolicyEngine Mailchimp list, returning
 * two values: a Boolean representing whether or not submission was successful,
 * and a success or failure message, housed in an Object within a Promise
 * @param {String} email The email address to submit
 * @returns {MailchimpReturn} 
 */
export function submitToMailchimp(email) {

  // PolicyEngine's Mailchimp form submission address
  const submitLink =
    "https://policyengine.us5.list-manage.com/subscribe/post-json?u=e5ad35332666289a0f48013c5&amp;id=71ed1f89d8&amp;f_id=00f173e6f0";


  // "error" is if there is a connection issue, while "data" is Mailchimp's
  // res object, including signup errors
  let promise = new Promise(
    function(resolve, reject) {
      jsonp(
        `${submitLink}&EMAIL=${email}`,
        { param: "c" },
        (error, data) => {
          if (error) {
            reject({
              isSuccessful: false,
              message: "There was an issue processing your subscription; please try again later."
            });
          }
          if (data) {
            // "data" also contains "result" param
            // of either "success" or "error"
            const { msg } = data;
            resolve({
              isSuccessful: data.result === "error" ? false : true,
              message: msg
            });
          }
        },
      );
    }
  )
  return promise;

  /*
  jsonp(
    `${submitLink}&EMAIL=${email}`,
    { param: "c" },
    (error, data) => {
      if (error) {
        result.isSuccessful = false;
        result.message = "There was an issue processing your subscription; please try again later."
        return "testVal";
      }
      if (data) {
        // "data" also contains "result" param
        // of either "success" or "error"
        const { msg } = data;
        if (typeof msg === "string") {
          console.log(data);
          result.isSuccessful = true;
          result.message = msg;
        }
        return "testVal";
      }
    },
  ).then((data) => data);
  */
  // return result;
}