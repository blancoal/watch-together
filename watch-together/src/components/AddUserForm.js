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
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
      <Input 
        placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required 
        className="flex-grow border-cool-600 focus:border-cool-400 focus:ring-cool-400 bg-cool-700 text-cool-100"
      />
      <Button type="submit" className="w-full sm:w-auto bg-gradient-to-r from-cool-600 to-lavender-700 hover:from-cool-700 hover:to-lavender-800 text-white">
        <Plus className="mr-2 h-4 w-4" /> Add User
      </Button>
    </form>
  );
};

export default AddUserForm;
