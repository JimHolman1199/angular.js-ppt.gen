const fs = require('fs');

// module.exports = {

//   friendlyName: 'Slide',

//   description: 'Save new slide data.',

//   inputs: {
//     data: {
//       type: 'string'
//     }
//   },


//   exits: {

//   },


//   fn: async function (data) {
//     console.log(data)
//     await fs.writeFileSync('changedData.json', JSON.stringify(data));
//     // All done.
//     return true;

//   }
// };

module.exports = async function save (req, res) {

  await fs.writeFileSync('changedData.json', JSON.stringify(req.body));
  return true;

}
