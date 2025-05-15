import React from 'react';
import { StatsCard as StatsCardType } from '../../types';
import Card from './Card';
import * as LucideIcons from 'lucide-react';

interface StatsCardProps {
  stat: StatsCardType;
}

const StatsCard: React.FC<StatsCardProps> = ({ stat }) => {
  // Dynamically get the icon from Lucide React
  const Icon = (LucideIcons as any)[stat.icon] || LucideIcons.BarChart;

  return (
    <Card className="transition-all duration-300 hover:shadow-md">
      <div className="flex items-center">
        <div className={`flex-shrink-0 p-3 rounded-md ${stat.color}`}>
          <Icon size={24} className="text-white" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-500">{stat.title}</p>
          <p className="text-2xl font-semibold text-gray-900">{stat.value.toLocaleString()}</p>
        </div>
      </div>
    </Card>
  );
};

export default StatsCard;