import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const AddUserForm = ({ onAddUser }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddUser(name);
    setName('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <Button type="submit"><Plus className="mr-2 h-4 w-4" /> Add User</Button>
    </form>
  );
};

export default AddUserForm;
