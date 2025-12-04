import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';

export const Settings: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500">Manage your account and application preferences.</p>
      </div>

      <Card title="Profile Information" description="Update your account's public information.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Full Name" defaultValue="John Doe" />
          <Input label="Email Address" defaultValue="john.doe@example.com" />
          <div className="md:col-span-2">
            <Input label="Role" defaultValue="Administrator" disabled className="bg-slate-50" />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <Button>Save Changes</Button>
        </div>
      </Card>

      <Card title="Application Preferences" description="Customize your dashboard experience.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select 
            label="Currency" 
            options={[{label: 'USD ($)', value: 'USD'}, {label: 'EUR (€)', value: 'EUR'}, {label: 'GBP (£)', value: 'GBP'}]} 
          />
          <Select 
            label="Language" 
            options={[{label: 'English (US)', value: 'en-US'}, {label: 'Spanish', value: 'es'}, {label: 'French', value: 'fr'}]} 
          />
          <div className="flex items-center space-x-2 md:col-span-2 mt-2">
            <input type="checkbox" id="notifications" className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" defaultChecked />
            <label htmlFor="notifications" className="text-sm text-slate-700">Receive email notifications for weekly reports</label>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <Button variant="outline">Reset Defaults</Button>
        </div>
      </Card>
    </div>
  );
};
