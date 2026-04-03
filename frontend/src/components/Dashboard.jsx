import React, { useState, useEffect } from 'react';
import { leadsAPI } from '../services/api';
import LeadCard from './LeadCard.jsx';
import LeadForm from './LeadForm.jsx';
import '../styles/dashboard.css';

function Dashboard({ launchAction, onActionHandled }) {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    if (!launchAction) {
      return;
    }

    if (launchAction === 'add-lead') {
      setEditingLead(null);
      setShowForm(true);
      setError('');
      onActionHandled?.();
      return;
    }

    if (launchAction === 'export-data') {
      if (loading) {
        return;
      }

      exportLeads();
      onActionHandled?.();
    }
  }, [launchAction, loading, leads]);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const response = await leadsAPI.getAllLeads();
      setLeads(response.data.data);
      setError('');
    } catch (err) {
      setError('Failed to load leads');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const exportLeads = () => {
    if (!leads.length) {
      setError('There are no leads to export yet.');
      return;
    }

    const rows = [
      ['Name', 'Email', 'Phone Number', 'Company', 'Source', 'Status', 'Created At'],
      ...leads.map((lead) => [
        lead.name || '',
        lead.email || '',
        lead.phoneNumber || '',
        lead.company || '',
        lead.source || '',
        lead.status || '',
        lead.createdAt || '',
      ]),
    ];

    const csv = rows
      .map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(',')
      )
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const dateLabel = new Date().toISOString().slice(0, 10);

    link.href = url;
    link.download = `leadnest-leads-${dateLabel}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setError('');
  };

  const handleAddLead = async (leadData) => {
    try {
      const response = await leadsAPI.createLead(leadData);
      setLeads([...leads, response.data.data]);
      setShowForm(false);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create lead');
    }
  };

  const handleUpdateLead = async (id, leadData) => {
    try {
      const response = await leadsAPI.updateLead(id, leadData);
      setLeads(leads.map((lead) => (lead._id === id ? response.data.data : lead)));
      setEditingLead(null);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update lead');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await leadsAPI.updateLeadStatus(id, newStatus);
      setLeads(leads.map((lead) => (lead._id === id ? response.data.data : lead)));
    } catch (err) {
      setError('Failed to update status');
    }
  };

  const handleAddNote = async (id, noteText) => {
    try {
      const response = await leadsAPI.addNote(id, noteText);
      setLeads(leads.map((lead) => (lead._id === id ? response.data.data : lead)));
    } catch (err) {
      setError('Failed to add note');
    }
  };

  const handleDeleteLead = async (id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        await leadsAPI.deleteLead(id);
        setLeads(leads.filter((lead) => lead._id !== id));
      } catch (err) {
        setError('Failed to delete lead');
      }
    }
  };

  const filteredLeads =
    filterStatus === 'all'
      ? leads
      : leads.filter((lead) => lead.status === filterStatus);

  if (loading && leads.length === 0) {
    return <div className="dashboard-loading">Loading leads...</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Leads Management</h2>
        <div className="dashboard-header-actions">
          <button
            className="secondary-button compact-button"
            onClick={exportLeads}
            type="button"
          >
            Export CSV
          </button>
          <button
            className="add-lead-btn"
            onClick={() => {
              setEditingLead(null);
              setShowForm(!showForm);
            }}
          >
            {showForm ? 'Close Form' : '+ Add New Lead'}
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <div className="form-container">
          <LeadForm
            onSubmit={editingLead ? (data) => handleUpdateLead(editingLead._id, data) : handleAddLead}
            initialData={editingLead}
            isEditing={!!editingLead}
          />
        </div>
      )}

      <div className="filter-section">
        <label htmlFor="status-filter">Filter by Status:</label>
        <select
          id="status-filter"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Leads ({leads.length})</option>
          <option value="new">New ({leads.filter((l) => l.status === 'new').length})</option>
          <option value="contacted">Contacted ({leads.filter((l) => l.status === 'contacted').length})</option>
          <option value="interested">Interested ({leads.filter((l) => l.status === 'interested').length})</option>
          <option value="converted">Converted ({leads.filter((l) => l.status === 'converted').length})</option>
          <option value="lost">Lost ({leads.filter((l) => l.status === 'lost').length})</option>
        </select>
      </div>

      <div className="leads-container">
        {filteredLeads.length === 0 ? (
          <div className="no-leads">
            <p>No leads found. {filterStatus !== 'all' && 'Try a different filter.'}</p>
          </div>
        ) : (
          <div className="leads-grid">
            {filteredLeads.map((lead) => (
              <LeadCard
                key={lead._id}
                lead={lead}
                onStatusChange={(newStatus) => handleStatusChange(lead._id, newStatus)}
                onAddNote={(noteText) => handleAddNote(lead._id, noteText)}
                onDelete={() => handleDeleteLead(lead._id)}
                onEdit={() => {
                  setEditingLead(lead);
                  setShowForm(true);
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
