import React from 'react';

type StatusType = 'active' | 'inactive' | 'new' | 'interviewing' | 'hired' | 'rejected';

interface StatusBadgeProps {
  status: StatusType;
  size?: 'sm' | 'md';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const statusStyles: Record<StatusType, { bg: string; text: string }> = {
    active: { bg: 'bg-green-100', text: 'text-green-800' },
    inactive: { bg: 'bg-gray-100', text: 'text-gray-800' },
    new: { bg: 'bg-blue-100', text: 'text-blue-800' },
    interviewing: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
    hired: { bg: 'bg-green-100', text: 'text-green-800' },
    rejected: { bg: 'bg-red-100', text: 'text-red-800' },
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
  };

  const { bg, text } = statusStyles[status];

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${bg} ${text} ${sizeStyles[size]}`}>
      <span className={`w-1.5 h-1.5 mr-1.5 rounded-full ${text.replace('text', 'bg')}`}></span>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default StatusBadge;