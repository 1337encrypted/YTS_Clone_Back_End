async function completeRequest(req, res) {
    return res.status(200).send(res.body);
}

module.exports = {
    completeRequest,
};
