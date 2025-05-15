import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import PageHeader from '../../components/shared/PageHeader';
import Button from '../../components/shared/Button';
import Card from '../../components/shared/Card';
import { useNotification } from '../../components/shared/NotificationContext';
import { Company } from '../../types';
import { getCompanyById, createCompany, updateCompany } from '../../services/dataService';

const CompanyForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState<Partial<Company>>({
    name: '',
    industry: '',
    size: '',
    location: '',
    website: '',
    contactName: '',
    contactEmail: '',
    status: 'active',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isEditMode && id) {
      const company = getCompanyById(id);
      if (company) {
        setFormData(company);
      } else {
        showNotification('error', 'Company not found');
        navigate('/companies');
      }
    }
  }, [id, isEditMode, navigate, showNotification]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name?.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.industry?.trim()) {
      newErrors.industry = 'Industry is required';
    }
    
    if (!formData.location?.trim()) {
      newErrors.location = 'Location is required';
    }
    
    if (!formData.size?.trim()) {
      newErrors.size = 'Size is required';
    }
    
    if (!formData.contactName?.trim()) {
      newErrors.contactName = 'Contact name is required';
    }
    
    if (!formData.contactEmail?.trim()) {
      newErrors.contactEmail = 'Contact email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Contact email is invalid';
    }
    
    if (formData.website && !formData.website.startsWith('http')) {
      newErrors.website = 'Website must start with http:// or https://';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      if (isEditMode && id) {
        // Update existing company
        const updatedCompany = updateCompany(id, formData);
        if (updatedCompany) {
          showNotification('success', 'Company updated successfully');
          navigate('/companies');
        } else {
          showNotification('error', 'Failed to update company');
        }
      } else {
        // Create new company
        const newCompany = createCompany(formData as Omit<Company, 'id' | 'createdAt'>);
        showNotification('success', 'Company created successfully');
        navigate('/companies');
      }
    } catch (error) {
      showNotification('error', 'An error occurred');
    }
  };

  return (
    <Layout>
      <PageHeader
        title={isEditMode ? 'Edit Company' : 'Add New Company'}
        subtitle={isEditMode ? 'Update company details' : 'Create a new company profile'}
      />

      <Card>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Company Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name || ''}
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded-md border ${
                  errors.name ? 'border-red-300' : 'border-gray-300'
                } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm`}
              />
              {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
            </div>

            {/* Industry */}
            <div>
              <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
                Industry
              </label>
              <input
                type="text"
                id="industry"
                name="industry"
                value={formData.industry || ''}
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded-md border ${
                  errors.industry ? 'border-red-300' : 'border-gray-300'
                } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm`}
              />
              {errors.industry && <p className="mt-1 text-xs text-red-600">{errors.industry}</p>}
            </div>

            {/* Size */}
            <div>
              <label htmlFor="size" className="block text-sm font-medium text-gray-700">
                Company Size
              </label>
              <select
                id="size"
                name="size"
                value={formData.size || ''}
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded-md border ${
                  errors.size ? 'border-red-300' : 'border-gray-300'
                } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm`}
              >
                <option value="">Select size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="501-1000">501-1000 employees</option>
                <option value="1000+">1000+ employees</option>
              </select>
              {errors.size && <p className="mt-1 text-xs text-red-600">{errors.size}</p>}
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location || ''}
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded-md border ${
                  errors.location ? 'border-red-300' : 'border-gray-300'
                } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm`}
              />
              {errors.location && <p className="mt-1 text-xs text-red-600">{errors.location}</p>}
            </div>

            {/* Website */}
            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                Website
              </label>
              <input
                type="url"
                id="website"
                name="website"
                value={formData.website || ''}
                onChange={handleInputChange}
                placeholder="https://example.com"
                className={`mt-1 block w-full rounded-md border ${
                  errors.website ? 'border-red-300' : 'border-gray-300'
                } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm`}
              />
              {errors.website && <p className="mt-1 text-xs text-red-600">{errors.website}</p>}
            </div>

            {/* Status */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <div className="mt-2 space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="active"
                    checked={formData.status === 'active'}
                    onChange={handleInputChange}
                    className="form-radio h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Active</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="inactive"
                    checked={formData.status === 'inactive'}
                    onChange={handleInputChange}
                    className="form-radio h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Inactive</span>
                </label>
              </div>
            </div>

            {/* Contact Name */}
            <div>
              <label htmlFor="contactName" className="block text-sm font-medium text-gray-700">
                Contact Name
              </label>
              <input
                type="text"
                id="contactName"
                name="contactName"
                value={formData.contactName || ''}
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded-md border ${
                  errors.contactName ? 'border-red-300' : 'border-gray-300'
                } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm`}
              />
              {errors.contactName && <p className="mt-1 text-xs text-red-600">{errors.contactName}</p>}
            </div>

            {/* Contact Email */}
            <div>
              <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">
                Contact Email
              </label>
              <input
                type="email"
                id="contactEmail"
                name="contactEmail"
                value={formData.contactEmail || ''}
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded-md border ${
                  errors.contactEmail ? 'border-red-300' : 'border-gray-300'
                } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm`}
              />
              {errors.contactEmail && <p className="mt-1 text-xs text-red-600">{errors.contactEmail}</p>}
            </div>
          </div>

          {/* Form actions */}
          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
            <Button
              variant="secondary"
              onClick={() => navigate('/companies')}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
            >
              {isEditMode ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Card>
    </Layout>
  );
};

export default CompanyForm;