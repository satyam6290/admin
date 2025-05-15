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
import { Company } from '../../types';
import { getCompanies, deleteCompany } from '../../services/dataService';

const CompanyList: React.FC = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [companies, setCompanies] = useState<Company[]>(getCompanies());
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const columns = [
    {
      header: 'Name',
      accessor: 'name',
      sortable: true,
    },
    {
      header: 'Industry',
      accessor: 'industry',
      sortable: true,
    },
    {
      header: 'Location',
      accessor: 'location',
      sortable: true,
    },
    {
      header: 'Size',
      accessor: 'size',
      sortable: true,
    },
    {
      header: 'Status',
      accessor: 'status',
      sortable: true,
      render: (company: Company) => <StatusBadge status={company.status} />,
    },
  ];

  const handleAddCompany = () => {
    navigate('/companies/add');
  };

  const handleViewCompany = (company: Company) => {
    navigate(`/companies/${company.id}`);
  };

  const handleEditCompany = (company: Company) => {
    navigate(`/companies/${company.id}/edit`);
  };

  const handleDeleteClick = (company: Company) => {
    setSelectedCompany(company);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedCompany) {
      const success = deleteCompany(selectedCompany.id);
      if (success) {
        setCompanies(getCompanies());
        showNotification('success', `Company ${selectedCompany.name} has been deleted.`);
      } else {
        showNotification('error', 'Failed to delete company.');
      }
      setSelectedCompany(null);
    }
  };

  return (
    <Layout>
      <PageHeader
        title="Company Management"
        subtitle="View and manage company profiles"
        actions={
          <Button
            variant="primary"
            icon={<PlusCircle size={16} />}
            onClick={handleAddCompany}
          >
            Add Company
          </Button>
        }
      />

      <DataTable<Company>
        data={companies}
        columns={columns}
        keyField="id"
        onView={handleViewCompany}
        onEdit={handleEditCompany}
        onDelete={handleDeleteClick}
      />

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Company"
        message={`Are you sure you want to delete ${selectedCompany?.name}? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="danger"
      />
    </Layout>
  );

      };
export default CompanyList;
