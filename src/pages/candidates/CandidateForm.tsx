import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import PageHeader from '../../components/shared/PageHeader';
import Button from '../../components/shared/Button';
import Card from '../../components/shared/Card';
import { useNotification } from '../../components/shared/NotificationContext';
import { Candidate } from '../../types';
import { getCandidateById, createCandidate, updateCandidate } from '../../services/dataService';

const CandidateForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState<Partial<Candidate>>({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: 0,
    status: 'new',
    skills: [],
  });

  const [skillInput, setSkillInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isEditMode && id) {
      const candidate = getCandidateById(id);
      if (candidate) {
        setFormData(candidate);
      } else {
        showNotification('error', 'Candidate not found');
        navigate('/candidates');
      }
    }
  }, [id, isEditMode, navigate, showNotification]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name?.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone?.trim()) {
      newErrors.phone = 'Phone is required';
    }
    
    if (!formData.position?.trim()) {
      newErrors.position = 'Position is required';
    }
    
    if (formData.experience === undefined || formData.experience < 0) {
      newErrors.experience = 'Experience must be a positive number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    // Handle experience as a number
    if (name === 'experience') {
      setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAddSkill = () => {
    if (skillInput.trim()) {
      setFormData(prev => ({
        ...prev,
        skills: [...(prev.skills || []), skillInput.trim()],
      }));
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (index: number) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills?.filter((_, i) => i !== index) || [],
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      if (isEditMode && id) {
        // Update existing candidate
        const updatedCandidate = updateCandidate(id, formData);
        if (updatedCandidate) {
          showNotification('success', 'Candidate updated successfully');
          navigate('/candidates');
        } else {
          showNotification('error', 'Failed to update candidate');
        }
      } else {
        // Create new candidate
        const newCandidate = createCandidate(formData as Omit<Candidate, 'id' | 'createdAt'>);
        showNotification('success', 'Candidate created successfully');
        navigate('/candidates');
      }
    } catch (error) {
      showNotification('error', 'An error occurred');
    }
  };

  return (
    <Layout>
      <PageHeader
        title={isEditMode ? 'Edit Candidate' : 'Add New Candidate'}
        subtitle={isEditMode ? 'Update candidate details' : 'Create a new candidate profile'}
      />

      <Card>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
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

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email || ''}
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded-md border ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm`}
              />
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone || ''}
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded-md border ${
                  errors.phone ? 'border-red-300' : 'border-gray-300'
                } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm`}
              />
              {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
            </div>

            {/* Position */}
            <div>
              <label htmlFor="position" className="block text-sm font-medium text-gray-700">
                Position
              </label>
              <input
                type="text"
                id="position"
                name="position"
                value={formData.position || ''}
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded-md border ${
                  errors.position ? 'border-red-300' : 'border-gray-300'
                } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm`}
              />
              {errors.position && <p className="mt-1 text-xs text-red-600">{errors.position}</p>}
            </div>

            {/* Experience */}
            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                Experience (years)
              </label>
              <input
                type="number"
                id="experience"
                name="experience"
                min="0"
                value={formData.experience || 0}
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded-md border ${
                  errors.experience ? 'border-red-300' : 'border-gray-300'
                } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm`}
              />
              {errors.experience && <p className="mt-1 text-xs text-red-600">{errors.experience}</p>}
            </div>

            {/* Status */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status || 'new'}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              >
                <option value="new">New</option>
                <option value="interviewing">Interviewing</option>
                <option value="hired">Hired</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {/* Skills */}
            <div className="md:col-span-2">
              <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
                Skills
              </label>
              <div className="mt-1 flex">
                <input
                  type="text"
                  id="skills"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Add a skill and press Enter"
                  className="flex-1 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="ml-2 inline-flex items-center rounded-md border border-transparent bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Add Skill
                </button>
              </div>

              {/* Skills list */}
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.skills?.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(index)}
                      className="ml-1.5 text-blue-600 hover:text-blue-800 focus:outline-none"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form actions */}
          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
            <Button
              variant="secondary"
              onClick={() => navigate('/candidates')}
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

export default CandidateForm;