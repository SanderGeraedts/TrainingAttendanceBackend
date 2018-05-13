let express = require('express');
let Practice = require('../models/Practice');
let Attendance = require('../models/Attendance');
let Person = require('../models/Person');
let router = express.Router();

router.get('/', function (req, res) {
    Practice.find({})
        .populate('attendance')
        .deepPopulate('attendance.person')
        .exec(function (error, practices) {
            if (error) {
                res.status(500).json(error);
            }

            res.json(practices);
        });
});

router.post('/', function (req, res) {
    if (!req.body.date) {
        res.status(400).send('Date not set');
        return;
    }

    const practice = new Practice({
        date: req.body.date,
        attendance: []
    });

    practice.save(function (error) {
        if (error) {
            res.status(500).json(error);
        }
    });

    res.json(practice);
});


router.get('/:id', function (req, res) {
    Practice.findById(req.params.id, function (error, practice) {
        if (error) {
            res.status(500).json(error);
        }

        res.json(practice);
    });
});


router.delete('/:id', function (req, res) {
    Practice.findByIdAndRemove(req.params.id,
        function (error, practice) {
            if (error) {
                res.status(500).json(error);
            }

            res.json(practice);
        });
});

router.post('/:id/attendance', function (req, res) {
    if (!req.body.status) {
        res.status(400).send('Status not set');
        return;
    }

    if (!req.body.person) {
        res.status(400).send('Person not set');
        return;
    }

    Person.findById(req.body.person, function (error, person) {
        if (error) {
            res.status(500).json(error);
        }

        const attendance = new Attendance({
            person: person,
            status: req.body.status
        });

        attendance.save(function (error) {
            if (error) {
                res.status(500).json(error);
            }
        });

        Practice.findById(req.params.id, function (error, practice) {
            if (error) {
                res.status(500).json(error);
            }

            practice.attendance.push(attendance);

            practice.save();
        });

        res.json(attendance);
    });
});


module.exports = router;