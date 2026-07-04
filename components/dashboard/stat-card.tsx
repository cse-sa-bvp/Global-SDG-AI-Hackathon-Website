import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColor?: string;
  valueColor?: string;
}

export function StatCard({ title, value, icon: Icon, iconColor, valueColor }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${iconColor || 'text-neutral-600'}`} />
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${valueColor || ''}`}>{value}</div>
      </CardContent>
    </Card>
  );
}
