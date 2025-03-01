const express = require('express');
const router = express.Router();
const Referral = require('../models/referral');


router.post('/', async (req, res) => {
  try {
    const { address, ref_code, is_manager_code } = req.body;

    const existingReferral = await Referral.findOne({ 
      address,
      is_manager_code: false 
    });
    
    if (existingReferral) {
      return res.status(204).json({ message: 'This address already has a referral code' });
    }

    const existingCode = await Referral.findOne({ ref_code });
    if (existingCode) {
      return res.status(204).json({ message: 'This referral code already exists' });
    }

    const newReferral = new Referral({
      address,
      ref_code,
      is_manager_code: is_manager_code || false
    });

    await newReferral.save();
    res.status(201).json(newReferral);
  } catch (error) {
    console.error('Error creating referral:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/address/:address', async (req, res) => {
  try {
    const { address } = req.params;
    
    const referral = await Referral.findOne({ 
      address: address.toLowerCase(),
      is_manager_code: false
    });

    if (!referral) {
      return res.status(404).json({ message: 'Referral not found' });
    }

    res.status(200).json(referral);
  } catch (error) {
    console.error('Error fetching referral:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


router.get('/code/:code', async (req, res) => {
  try {
    const { code } = req.params;
    
    const referral = await Referral.findOne({ 
      ref_code: code,
      is_manager_code: false
    });

    if (!referral) {
      return res.status(404).json({ message: 'Referral not found' });
    }

    // Increment referral count if it's below 10
    if (referral.referral_count < 10) {
      referral.referral_count += 1;
      await referral.save();
    }

    res.status(200).json(referral);
  } catch (error) {
    console.error('Error fetching referral:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;