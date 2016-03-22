/**
 * Created by t937426 on 3/22/2016.
 */

module.exports.Factory = {
    produce : function (documentToBeValidated) {
        if (documentToBeValidated == 'project') {
            return require('./project.js');
        } else {
            return null;
        }
    }
}