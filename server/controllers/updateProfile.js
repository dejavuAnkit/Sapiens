const GUser = require("../model/user");

const updateProfileController = async (req, res) => {
    const { email, userType } = req.body;
    GUser.findOneAndUpdate({email},{userType, isRegistered: true},{}, (err, dbRes)=>{
        if(err){
            res.json({
                'error': 'Some Error has occured'
            })
        }
        res.json({
            'message': 'Profile Updated Success'
        })
    });
}

module.exports = {
    updateProfileController
}