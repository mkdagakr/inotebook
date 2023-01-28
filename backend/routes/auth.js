const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "Maheshisagood$boy";

const router = express.Router();

// route 1: create a User using POST "/api/auth/createUser". No login required 
router.post('/createUser', [

    // username must be an email
    body('email', 'Enter a valid email').isEmail(),
    // password must be at least 5 chars long
    body('password', 'your password atleast 5 characters').isLength({ min: 5 })
],

    async (req, response) => {
        let success = false;
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return response.status(400).json({ success, errors: errors.array() });
        }

        try {
            // check the email already registered or not
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return response.status(400).json({ success, error: 'sorry a user with this email already exists' });
            }

            // const userData = await User(req.body);
            // userData.save();
            // response.send(req.body);

            const salt = await bcrypt.genSalt(10);
            const securePassword = await bcrypt.hash(req.body.password, salt)

            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: securePassword
            })
            const data = {
                user: {
                    id: user.id
                }
            }

            const authtoken = jwt.sign(data, JWT_SECRET);
            success = true;
            response.json({ success, authtoken });

        } catch (error) {
            console.log(error.message);
            response.status(500).send('some error occured');

        }

    }
)



// route 2:  Login a User using POST "/api/auth/login". No login required 
router.post('/login', [
    body('email', 'enter a valid email').isEmail(),
    body('password', 'password can not be empty').exists()
],

    async (req, response) => {

        let success = false;

        const errors = validationResult(req);

        if (!errors.isEmpty) {
            return response.status(400).json({success, errors: errors.array() });
        }

        const { email, password } = req.body;

        let user = await User.findOne({email});
        if (!user) {
            return response.status(400).json({success, errors: 'try to login with valid id and password' });
        }

        let passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return response.status(400).json({ success, errors: 'try to login with valid id and password' });
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true
        response.json({success, authtoken });

        try {

        } catch (error) {
            console.log(error.message);
            response.status(500).send('Internal server error occured');

        }


    }

)


// route 3: get  Loggedin User details using POST "/api/auth/getuser". Login required 
router.post('/getuser', fetchuser, async (req, res) => {

    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);

    } catch (error) {
        console.log(error.message);
        response.status(500).send('Internal server error occured');

    }


})

module.exports = router;