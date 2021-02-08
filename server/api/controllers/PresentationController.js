const {PresentationData} = require('../models/PresentationData');

module.exports = {
    get: async function (req, res) {
        PresentationData.findAll()
            .then(data => res.send(data))
            .catch(err => console.log(err));
    },
};
