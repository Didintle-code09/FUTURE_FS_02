const { insert, remove, select, update } = require('../lib/supabase');

const isMissingLeadsTable = (error) =>
  error?.details?.code === 'PGRST205' ||
  error?.message?.includes("Could not find the table 'public.leads'");

const formatLead = (lead) => ({
  _id: lead.id,
  id: lead.id,
  name: lead.name,
  email: lead.email,
  phoneNumber: lead.phone_number || '',
  source: lead.source,
  status: lead.status,
  notes: Array.isArray(lead.notes) ? lead.notes : [],
  company: lead.company || '',
  lastContacted: lead.last_contacted,
  createdBy: lead.created_by,
  createdAt: lead.created_at,
  updatedAt: lead.updated_at,
});

const getScopedLead = async (leadId, userId) => {
  const leads = await select('leads', {
    id: `eq.${leadId}`,
    created_by: `eq.${userId}`,
  });

  return leads?.[0];
};

// @desc    Get all leads
// @route   GET /api/leads
// @access  Private
exports.getAllLeads = async (req, res) => {
  try {
    const leads = await select('leads', {
      created_by: `eq.${req.user.id}`,
      order: 'created_at.desc',
    });

    res.status(200).json({
      success: true,
      count: leads.length,
      data: leads.map(formatLead),
    });
  } catch (error) {
    if (isMissingLeadsTable(error)) {
      return res.status(200).json({
        success: true,
        count: 0,
        data: [],
      });
    }

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
    const lead = await getScopedLead(req.params.id, req.user.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
    }

    res.status(200).json({
      success: true,
      data: formatLead(lead),
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
    const normalizedEmail = email?.trim().toLowerCase();

    // Validation
    if (!name || !normalizedEmail) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required',
      });
    }

    // Check if lead with this email already exists for the current user
    const existingLeads = await select('leads', {
      email: `eq.${normalizedEmail}`,
      created_by: `eq.${req.user.id}`,
    });

    if (existingLeads.length) {
      return res.status(409).json({
        success: false,
        message: 'Lead with this email already exists',
      });
    }

    const createdLeads = await insert('leads', {
      name: name.trim(),
      email: normalizedEmail,
      phone_number: phoneNumber || '',
      source: source || 'website',
      status: 'new',
      notes: [],
      company: company || '',
      created_by: req.user.id,
    });
    const lead = createdLeads?.[0];

    res.status(201).json({
      success: true,
      data: formatLead(lead),
      message: 'Lead created successfully',
    });
  } catch (error) {
    if (isMissingLeadsTable(error)) {
      return res.status(400).json({
        success: false,
        message: 'Create the Supabase leads table first by running supabase/schema.sql.',
      });
    }

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

    const updatedLeads = await update(
      'leads',
      {
        id: `eq.${req.params.id}`,
        created_by: `eq.${req.user.id}`,
      },
      {
        status,
        last_contacted: new Date().toISOString(),
      }
    );
    const lead = updatedLeads?.[0];

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
    }

    res.status(200).json({
      success: true,
      data: formatLead(lead),
      message: 'Lead status updated successfully',
    });
  } catch (error) {
    if (isMissingLeadsTable(error)) {
      return res.status(400).json({
        success: false,
        message: 'Create the Supabase leads table first by running supabase/schema.sql.',
      });
    }

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

    const existingLead = await getScopedLead(req.params.id, req.user.id);

    if (!existingLead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
    }

    const updatedNotes = [
      ...(Array.isArray(existingLead.notes) ? existingLead.notes : []),
      {
        text,
        createdAt: new Date().toISOString(),
      },
    ];

    const updatedLeads = await update(
      'leads',
      {
        id: `eq.${req.params.id}`,
        created_by: `eq.${req.user.id}`,
      },
      {
        notes: updatedNotes,
      }
    );
    const lead = updatedLeads?.[0];

    res.status(200).json({
      success: true,
      data: formatLead(lead),
      message: 'Note added successfully',
    });
  } catch (error) {
    if (isMissingLeadsTable(error)) {
      return res.status(400).json({
        success: false,
        message: 'Create the Supabase leads table first by running supabase/schema.sql.',
      });
    }

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
    const deletedLeads = await remove('leads', {
      id: `eq.${req.params.id}`,
      created_by: `eq.${req.user.id}`,
    });
    const lead = deletedLeads?.[0];

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
    if (isMissingLeadsTable(error)) {
      return res.status(400).json({
        success: false,
        message: 'Create the Supabase leads table first by running supabase/schema.sql.',
      });
    }

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
    const updates = {};

    if (name) updates.name = name.trim();
    if (email) updates.email = email.trim().toLowerCase();
    if (phoneNumber !== undefined) updates.phone_number = phoneNumber;
    if (company !== undefined) updates.company = company;
    if (source) updates.source = source;

    const updatedLeads = await update(
      'leads',
      {
        id: `eq.${req.params.id}`,
        created_by: `eq.${req.user.id}`,
      },
      updates
    );
    const lead = updatedLeads?.[0];

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
    }

    res.status(200).json({
      success: true,
      data: formatLead(lead),
      message: 'Lead updated successfully',
    });
  } catch (error) {
    if (isMissingLeadsTable(error)) {
      return res.status(400).json({
        success: false,
        message: 'Create the Supabase leads table first by running supabase/schema.sql.',
      });
    }

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
