import express from'express';

import {Person} from '../models/Person';

let router = express.Router();

router.get('/', function (req, res) {
    Person.find({}, function (err, persons) {
        if (err) {
            res.status(500).json(err);
        }

        res.json(persons);
    });
});

router.get('/regular', function (req, res) {
    Person.find({'regular': true}, function (err, persons) {
        if (err) {
            res.status(500).json(err);
        }

        res.json(persons);
    });
});

router.post('/', function (req, res) {
    if (!req.body.name) {
        res.status(400).send('Name not set');
        return;
    }

    const person = new Person({
        name: req.body.name,
        regular: req.body.regular
    });

    person.save(function (error) {
        if (error) {
            res.status(500).json(error)
        }
    });

    res.json(person);
});


router.post('/import', function (req, res) {
    if (!req.body.dump) {
        res.status(400).send('Dump not set');
        return;
    }

    const dump = req.body.dump;
    const persons = [];

    for (let i = 0; i < dump.length; i++) {
        if (!dump[i].name) {
            res.status(400).send('Name not set');
            return;
        }

        const person = new Person({
            name: dump[i].name,
            regular: dump[i].regular
        });

        person.save(function (error) {
            if (error) {
                res.status(500).json(error)
            }
        });

        persons.push(person);
    }

    res.json(persons);
});

router.get('/:id', function (req, res) {
    Person.findById(req.params.id, function (err, person) {
        if (err) {
            res.status(404).send('Person not found');
        }

        res.json(person);
    });
});

router.put('/:id', function (req, res) {
    Person.findById(req.params.id, function (err, person) {
        if (err) {
            res.status(404).send('Person not found');
        }

        if (req.body.name) {
            person.name = req.body.name;
        }

        if (req.body.regular !== null) {
            person.regular = req.body.regular;
        }

        person.save();

        res.json(person);
    });
});

router.delete('/:id', function (req, res) {
    Person.findByIdAndRemove(req.params.id, function (err, person) {
        res.json(person);
    });
});

module.exports = router;