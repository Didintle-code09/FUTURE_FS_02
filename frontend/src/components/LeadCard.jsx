import React, { useState } from 'react';
import '../styles/lead-card.css';

function LeadCard({
  lead,
  onStatusChange,
  onAddNote,
  onDelete,
  onEdit,
}) {
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [addingNote, setAddingNote] = useState(false);
  const [isNotesExpanded, setIsNotesExpanded] = useState(false);

  const notes = Array.isArray(lead.notes) ? lead.notes : [];

  const handleAddNote = async () => {
    if (!noteText.trim()) return;

    setAddingNote(true);
    try {
      await onAddNote(noteText);
      setNoteText('');
      setShowNoteInput(false);
    } finally {
      setAddingNote(false);
    }
  };

  const statusOptions = ['new', 'contacted', 'interested', 'converted', 'lost'];

  const getStatusColor = (status) => {
    const colors = {
      new: '#3498db',
      contacted: '#f39c12',
      interested: '#2ecc71',
      converted: '#27ae60',
      lost: '#e74c3c',
    };
    return colors[status] || '#95a5a6';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="lead-card">
      <div className="lead-header">
        <div className="lead-title">
          <h4>{lead.name}</h4>
          <span
            className="status-badge"
            style={{ backgroundColor: getStatusColor(lead.status) }}
          >
            {lead.status}
          </span>
        </div>
        <div className="lead-actions">
          <button
            className="btn-icon edit-btn"
            onClick={onEdit}
            title="Edit lead"
          >
            ✏️
          </button>
          <button
            className="btn-icon delete-btn"
            onClick={onDelete}
            title="Delete lead"
          >
            🗑️
          </button>
        </div>
      </div>

      <div className="lead-info">
        <div className="info-row">
          <span className="label">Email:</span>
          <a href={`mailto:${lead.email}`}>{lead.email}</a>
        </div>

        {lead.phoneNumber && (
          <div className="info-row">
            <span className="label">Phone:</span>
            <a href={`tel:${lead.phoneNumber}`}>{lead.phoneNumber}</a>
          </div>
        )}

        {lead.company && (
          <div className="info-row">
            <span className="label">Company:</span>
            <span>{lead.company}</span>
          </div>
        )}

        <div className="info-row">
          <span className="label">Source:</span>
          <span className="source-tag">{lead.source}</span>
        </div>

        <div className="info-row">
          <span className="label">Created:</span>
          <span>{formatDate(lead.createdAt)}</span>
        </div>

        {lead.lastContacted && (
          <div className="info-row">
            <span className="label">Last Contacted:</span>
            <span>{formatDate(lead.lastContacted)}</span>
          </div>
        )}
      </div>

      <div className="lead-status-controls">
        <label htmlFor={`status-${lead._id}`}>Update Status:</label>
        <select
          id={`status-${lead._id}`}
          value={lead.status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="status-select"
        >
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="notes-section">
        <div className="notes-header">
          <h5>Notes ({notes.length})</h5>
          <button
            className="notes-toggle-btn"
            type="button"
            onClick={() => setIsNotesExpanded((prev) => !prev)}
            aria-expanded={isNotesExpanded}
            aria-controls={`notes-content-${lead._id}`}
          >
            {isNotesExpanded ? 'Collapse' : 'Expand'}
          </button>
        </div>

        {isNotesExpanded && (
          <div id={`notes-content-${lead._id}`}>
            {notes.length > 0 && (
              <div className="notes-list">
                {notes
                  .slice()
                  .reverse()
                  .map((note, index) => (
                    <div key={index} className="note-item">
                      <p className="note-text">{note.text}</p>
                      <span className="note-date">
                        {formatDate(note.createdAt)}
                      </span>
                    </div>
                  ))}
              </div>
            )}

            {!showNoteInput ? (
              <button
                className="add-note-btn"
                onClick={() => setShowNoteInput(true)}
              >
                + Add Note
              </button>
            ) : (
              <div className="note-input-group">
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Enter your note..."
                  rows="3"
                />
                <div className="note-actions">
                  <button
                    className="btn-save"
                    onClick={handleAddNote}
                    disabled={addingNote || !noteText.trim()}
                  >
                    {addingNote ? 'Adding...' : 'Save Note'}
                  </button>
                  <button
                    className="btn-cancel"
                    onClick={() => {
                      setShowNoteInput(false);
                      setNoteText('');
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default LeadCard;
