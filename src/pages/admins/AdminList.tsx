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
import { Admin } from '../../types';
import { getAdmins, deleteAdmin } from '../../services/dataService';

const AdminList: React.FC = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [admins, setAdmins] = useState<Admin[]>(getAdmins());
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
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
      header: 'Role',
      accessor: 'role',
      sortable: true,
    },
    {
      header: 'Status',
      accessor: 'status',
      sortable: true,
      render: (admin: Admin) => <StatusBadge status={admin.status} />,
    },
    {
      header: 'Last Login',
      accessor: 'lastLogin',
      sortable: true,
      render: (admin: Admin) => {
        const date = new Date(admin.lastLogin);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
      },
    },
  ];

  const handleAddAdmin = () => {
    navigate('/admins/add');
  };

  const handleViewAdmin = (admin: Admin) => {
    navigate(`/admins/${admin.id}`);
  };

  const handleEditAdmin = (admin: Admin) => {
    navigate(`/admins/${admin.id}/edit`);
  };

  const handleDeleteClick = (admin: Admin) => {
    setSelectedAdmin(admin);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedAdmin) {
      const success = deleteAdmin(selectedAdmin.id);
      if (success) {
        setAdmins(getAdmins());
        showNotification('success', `Admin ${selectedAdmin.name} has been deleted.`);
      } else {
        showNotification('error', 'Failed to delete admin.');
      }
      setSelectedAdmin(null);
    }
  };

  return (
    <Layout>
      <PageHeader
        title="Admin Management"
        subtitle="View and manage system administrators"
        actions={
          <Button
            variant="primary"
            icon={<PlusCircle size={16} />}
            onClick={handleAddAdmin}
          >
            Add Admin
          </Button>
        }
      />

      <DataTable<Admin>
        data={admins}
        columns={columns}
        keyField="id"
        onView={handleViewAdmin}
        onEdit={handleEditAdmin}
        onDelete={handleDeleteClick}
      />

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Admin"
        message={`Are you sure you want to delete ${selectedAdmin?.name}? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="danger"
      />
    </Layout>
  
  );
};

export default AdminList;