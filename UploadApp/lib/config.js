module.exports.getConfig = function () {
    switch (process.env.NODE_ENV) {
        case 'local_machine': /* Local Machine */
            return {
                "port":3000
            };
        default:
            return {
                "port":3000
            };
    }


}