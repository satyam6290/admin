import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import PageHeader from '../../components/shared/PageHeader';
import Button from '../../components/shared/Button';
import DataTable from '../../components/shared/DataTable';
import StatusBadge from '../../components/shared/StatusBadge';
import ConfirmDialog from '../../components/shared/ConfirmDialog';
import { useNotification } from '../../components/shared/NotificationContext';
import { Candidate } from '../../types';
import { getCandidates, deleteCandidate } from '../../services/dataService';

const CandidateList: React.FC = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [candidates, setCandidates] = useState<Candidate[]>(getCandidates());
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const columns = [
    {
      header: 'Name',
      accessor: 'name',
      sortable: true,
    },
    {
      header: 'Email',
      accessor: 'email',
      sortable: true,
    },
    {
      header: 'Position',
      accessor: 'position',
      sortable: true,
    },
    {
      header: 'Experience',
      accessor: 'experience',
      sortable: true,
      render: (candidate: Candidate) => `${candidate.experience} years`,
    },
    {
      header: 'Status',
      accessor: 'status',
      sortable: true,
      render: (candidate: Candidate) => <StatusBadge status={candidate.status} />,
    },
  ];

  const handleAddCandidate = () => {
    navigate('/candidates/add');
  };

  const handleViewCandidate = (candidate: Candidate) => {
    navigate(`/candidates/${candidate.id}`);
  };

  const handleEditCandidate = (candidate: Candidate) => {
    navigate(`/candidates/${candidate.id}/edit`);
  };

  const handleDeleteClick = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedCandidate) {
      const success = deleteCandidate(selectedCandidate.id);
      if (success) {
        setCandidates(getCandidates());
        showNotification('success', `Candidate ${selectedCandidate.name} has been deleted.`);
      } else {
        showNotification('error', 'Failed to delete candidate.');
      }
      setSelectedCandidate(null);
    }
  };

  return (
    <Layout>
      <PageHeader
        title="Candidate Management"
        subtitle="View and manage job candidates"
        actions={
          <Button
            variant="primary"
            icon={<PlusCircle size={16} />}
            onClick={handleAddCandidate}
          >
            Add Candidate
          </Button>
        }
      />

      <DataTable<Candidate>
        data={candidates}
        columns={columns}
        keyField="id"
        onView={handleViewCandidate}
        onEdit={handleEditCandidate}
        onDelete={handleDeleteClick}
      />

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Candidate"
        message={`Are you sure you want to delete ${selectedCandidate?.name}? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="danger"
      />
    </Layout>
  
  );
};

export default CandidateList;