const models = require("./../models")
const bcrypt = require('bcryptjs')
const moment = require('moment')
const jwt = require("jsonwebtoken")
const nodemailer = require('nodemailer');


module.exports = {
    // ---------------------------------------------------------------------------
    // GET /accounts
    get: (req, res) => {
        models.accounts.findAll({ limit: 100 }).then(employee => {
            if (employee === null) {
                return res.send({
                    message: "data not fund"
                })
            }

            res.send({
                data: employee
            })
        })
    },
    // ---------------------------------------------------------------------------
    // GET /accounts/login
    login: async (req, res) => {
        console.log(req.body.email)
        try {

            //1. find the accunt
            let account = await models.accounts.findOne({ where: { email: req.body.email } }).then(account => account)

            //2. check if the account is exist
            if (account === null) {
                return res.send({
                    message: "account not found"
                })
            }

            //3. password validation
            const validPassword = bcrypt.compareSync(
                req.body.password,
                account.password
            )
            if (!validPassword) {
                return res.send({
                    message: "password is not valid"
                })
            }

            //4. create payload
            let token_data = {}
            token_data.payload = {
                name: `${account.first_name} ${account.last_name}`,
                email: account.email
            }
            token_data.secret = process.env.JWT_SECRET
            token_data.options = {
                expiresIn: "30d" // EXPIRATION: 30 days
            }
            const token = jwt.sign(token_data.payload, token_data.secret, token_data.options)
            res.send({
                message: "You are logged in",
                email: req.body.email,
                token: token
            })


        } catch (err) {
            res.send({
                message: "error",
                error: err
            })
        }

    },
    // ---------------------------------------------------------------------------
    // GET /accounts/:emp_no
    getById: (req, res) => {
        req.params.emp_no = JSON.parse(req.params.emp_no)
        models.employees.findOne({ where: { emp_no: req.params.emp_no } }).then(employee => {
            if (employee === null) {
                return res.send({
                    message: "data not fund"
                })
            }

            res.send({
                data: employee
            })
        })
    },
    // ---------------------------------------------------------------------------
    // POST /accounts/register
    register: async (req, res) => {
        const SALT_WORK_FACTOR = 10
        const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);

        req.body.password = bcrypt.hashSync(req.body.password, salt);

        models.accounts.create(req.body).then(account => {
            res.send({
                message: "insert account data success",
                data: account
            })
        }).catch(err => {
            res.send({
                message: "error",
                error: err
            })
        })

    },
    // ---------------------------------------------------------------------------
    // PUT /accounts/:email
    put: async (req, res) => {
        console.log(req.decoded)

        // models.accounts.findOne({ where: { emp_no: req.params.emp_no } }).then(employee => {
        //     if (employee) {
        //         return employee.update(req.body).then(updated_employee => res.send({
        //             message: "update data success",
        //             data: updated_employee
        //         })).catch(err => Promise.reject(err))
        //     } else {
        //         res.send({
        //             message: "data not found",
        //         })
        //     }
        // }).catch(err => {
        //     res.send({
        //         message: "error",
        //         error: err
        //     })
        // })


        // using async await
        // try {
        //     let employee = await models.employees.findOne({ where: { emp_no: req.params.emp_no } }).then(employee => employee)

        //     if (employee) {
        //         await employee.update(req.body).then(updated_employee => res.send({
        //             message: "update data success",
        //             data: updated_employee
        //         }))
        //     } else {
        //         res.send({
        //             message: "data not found",
        //         })
        //     }
        // } catch (err) {
        //     res.send({
        //         message: "error",
        //         error: err
        //     })
        // }

    },
    // ---------------------------------------------------------------------------
    // POST /accounts/generate_sign_up_form
    generateSignUpForm: async (req, res) => {
        const email = req.body.email
        models.accounts.findOne({ where: { email: email } }).then(account => {
            if (account === null) {
                return res.send({
                    message: "Email Not Found"
                })
            } else if (account.passowrd !== null) {
                //generate token
                let token_data = {}
                token_data.payload = {
                    name: `${account.first_name} ${account.last_name}`,
                    email: account.email
                }
                token_data.secret = process.env.JWT_SECRET
                token_data.options = {
                    expiresIn: "1d" // EXPIRATION: 1 days
                }
                const token = jwt.sign(token_data.payload, token_data.secret, token_data.options)

                //email config
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'moehammadhaekal@gmail.com',
                        pass: ''
                    }
                });

                const mailOptions = {
                    from: 'moehammadhaekal@gmail.com', // sender address
                    to: '93haekal@gmail.com', // list of receivers
                    subject: 'Subject of your email', // Subject line
                    html: `<p>Set your password: ${process.env.CLIENT_URL}/signup/${token} </p>` // plain text body
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return res.send({
                            error: error
                        })
                    }
                    console.log('Message sent: %s', info.messageId);
                    // Preview only available when sending through an Ethereal account
                    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                    res.send({
                        message: "Success"
                    })
                });


            }


        })

    },

}
