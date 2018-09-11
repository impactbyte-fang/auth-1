const models = require("./../models")

module.exports = {
    // ---------------------------------------------------------------------------
    // GET /departments
    get: (req, res) => {
        models.departments.findAll({
            limit: 100
        }).then(departments => {
            if (departments === null) {
                return res.send({
                    message: "data not fund"
                })
            }

            res.send({
                data: departments
            })
        })
    },
    // ---------------------------------------------------------------------------
    // GET /departments/:dept_no
    getById: (req, res) => {
        models.departments.findOne({
            where: {
                dept_no: req.params.dept_no
            }
        }).then(department => {
            if (department === null) {
                return res.send({
                    message: "data not fund"
                })
            }

            res.send({
                data: department
            })
        })
    },
    // ---------------------------------------------------------------------------
    // GET /departments/:dept_no/employees
    getEmployeeByDepartment: (req, res) => {
        models.dept_emp.findAll({
            where: {
                dept_no: req.params.dept_no
            },
            include: [{model :models.employees},{model :models.departments}],
            limit: 15
        }).then(result => {
            if (result === null) {
                return res.send({
                    message: "data not fund"
                })
            }

            res.send({
                data: result
            })
        })
    },
    // ---------------------------------------------------------------------------
    // POST /employees
    post: (req, res) => {
        models.employees.create(req.body).then(employee => {
            res.send({
                message: "insert data success",
                data: employee
            })
        }).catch(err => res.send({
            message: "error",
            error: err
        }))
    }
}