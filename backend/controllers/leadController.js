const Lead = require('../models/Lead');

// @desc    Get all leads
// @route   GET /api/leads
// @access  Private
exports.getAllLeads = async (req, res) => {
  try {
    const leads = await Lead.find();
    res.status(200).json({
      success: true,
      count: leads.length,
      data: leads,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single lead
// @route   GET /api/leads/:id
// @access  Private
exports.getLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
    }

    res.status(200).json({
      success: true,
      data: lead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Create a new lead
// @route   POST /api/leads
// @access  Private
exports.createLead = async (req, res) => {
  try {
    const { name, email, phoneNumber, source, company } = req.body;

    // Validation
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required',
      });
    }

    // Check if lead with this email already exists
    const existingLead = await Lead.findOne({ email });
    if (existingLead) {
      return res.status(409).json({
        success: false,
        message: 'Lead with this email already exists',
      });
    }

    const lead = new Lead({
      name,
      email,
      phoneNumber,
      source: source || 'website',
      company,
    });

    await lead.save();

    res.status(201).json({
      success: true,
      data: lead,
      message: 'Lead created successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update lead status
// @route   PUT /api/leads/:id/status
// @access  Private
exports.updateLeadStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required',
      });
    }

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      {
        status,
        lastContacted: new Date(),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
    }

    res.status(200).json({
      success: true,
      data: lead,
      message: 'Lead status updated successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Add a note to a lead
// @route   PUT /api/leads/:id/notes
// @access  Private
exports.addNote = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        success: false,
        message: 'Note text is required',
      });
    }

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          notes: {
            text,
            createdAt: new Date(),
          },
        },
      },
      {
        new: true,
      }
    );

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
    }

    res.status(200).json({
      success: true,
      data: lead,
      message: 'Note added successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete a lead
// @route   DELETE /api/leads/:id
// @access  Private
exports.deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
    }

    res.status(200).json({
      success: true,
      data: {},
      message: 'Lead deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update lead details
// @route   PUT /api/leads/:id
// @access  Private
exports.updateLead = async (req, res) => {
  try {
    const { name, email, phoneNumber, company, source } = req.body;

    let lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
    }

    // Update fields
    if (name) lead.name = name;
    if (email) lead.email = email;
    if (phoneNumber) lead.phoneNumber = phoneNumber;
    if (company) lead.company = company;
    if (source) lead.source = source;

    await lead.save();

    res.status(200).json({
      success: true,
      data: lead,
      message: 'Lead updated successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
