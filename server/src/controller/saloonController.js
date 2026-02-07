const saloonModel = require('../models/saloonModel');

exports.getAllSaloons = async (req, res) => {
    try {
        saloonModel.getAllSaloons((err, saloons) => {
            if (err) {
                res.status(500).json({ message: err.message });
            } else {
                res.status(200).json(saloons);
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getSaloonsById = async (req, res) => {
    try {
        saloonModel.getSaloonsById(req.params.id,(err, saloon) => {
            if (err) {
                res.status(500).json({ message: err.message });
            } else {
                res.status(200).json({status: 'success', saloon});
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createSaloon = async (req, res) => {
    try {
        saloonModel.createSaloon(req.body,(err, result) => {
            if (err) {
                res.status(500).json({ message: err.message });
            } else {
                res.status(201).json({status: 'success', result, message: 'Saloon created successfully'});
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateSaloon = async (req, res) => {
    try {
        saloonModel.updateSaloon(req.params.id, req.body,(err, saloon) => {
            if (err) {
                res.status(500).json({ message: err.message });
            } else {
                res.status(200).json({status: 'success', saloon});
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteSaloon = async (req, res) => {
    try {
        saloonModel.deleteSaloon(req.params.id,(err, saloon) => {
            if (err) {
                res.status(500).json({ message: err.message });
            } else {
                res.status(200).json({status: 'success', saloon});
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
