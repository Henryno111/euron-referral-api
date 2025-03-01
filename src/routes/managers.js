const express = require('express');
const router = express.Router();
const Referral = require('../models/referral');

router.post('/', async (req, res) => {
  try {
    const { address, ref_code } = req.body;

    const existingManager = await Referral.findOne({ 
      address,
      is_manager_code: true
    });
    
    if (existingManager) {
      return res.status(204).json({ message: 'This address already has a manager code' });
    }

    const existingCode = await Referral.findOne({ ref_code });
    if (existingCode) {
      return res.status(204).json({ message: 'This manager code already exists' });
    }

    const newManager = new Referral({
      address,
      ref_code,
      is_manager_code: true
    });

    await newManager.save();
    res.status(201).json(newManager);
  } catch (error) {
    console.error('Error creating manager code:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/address/:address', async (req, res) => {
  try {
    const { address } = req.params;
    
    const manager = await Referral.findOne({ 
      address: address.toLowerCase(),
      is_manager_code: true
    });

    if (!manager) {
      return res.status(404).json({ message: 'Manager code not found' });
    }

    res.status(200).json(manager);
  } catch (error) {
    console.error('Error fetching manager code:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


router.get('/code/:code', async (req, res) => {
  try {
    const { code } = req.params;
    
    const manager = await Referral.findOne({ 
      ref_code: code,
      is_manager_code: true
    });

    if (!manager) {
      return res.status(404).json({ message: 'Manager code not found' });
    }

    if (manager.referral_count < 10) {
      manager.referral_count += 1;
      await manager.save();
    }

    res.status(200).json(manager);
  } catch (error) {
    console.error('Error fetching manager:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;