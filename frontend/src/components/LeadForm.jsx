import React, { useState, useEffect } from 'react';
import '../styles/forms.css';

function LeadForm({ onSubmit, initialData, isEditing }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    company: '',
    source: 'website',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        email: initialData.email,
        phoneNumber: initialData.phoneNumber || '',
        company: initialData.company || '',
        source: initialData.source || 'website',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email) {
      setError('Name and email are required');
      return;
    }

    setLoading(true);

    try {
      await onSubmit(formData);
      if (!isEditing) {
        setFormData({
          name: '',
          email: '',
          phoneNumber: '',
          company: '',
          source: 'website',
        });
      }
    } catch (err) {
      setError(err.message || 'Failed to save lead');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="lead-form" onSubmit={handleSubmit}>
      <h3>{isEditing ? 'Edit Lead' : 'Add New Lead'}</h3>

      {error && <div className="error-message">{error}</div>}

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email@example.com"
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            id="phoneNumber"
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="+1 (555) 000-0000"
          />
        </div>

        <div className="form-group">
          <label htmlFor="company">Company</label>
          <input
            id="company"
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Company name"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="source">Source</label>
        <select
          id="source"
          name="source"
          value={formData.source}
          onChange={handleChange}
        >
          <option value="website">Website</option>
          <option value="referral">Referral</option>
          <option value="social-media">Social Media</option>
          <option value="email">Email</option>
          <option value="other">Other</option>
        </select>
      </div>

      <button
        type="submit"
        className="submit-btn"
        disabled={loading}
      >
        {loading ? 'Saving...' : isEditing ? 'Update Lead' : 'Add Lead'}
      </button>
    </form>
  );
}

export default LeadForm;
