// Body
module.exports = (error = false, data = {}) => ({
    success: !error,
    error,
    data,
});
