exports.getDeviceId = (token) => {
    const decodedToken = jwt.decode(token);
    const device_id = decodedToken.device_id;
    return device_id;
};