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
      className="flex-grow border-cool-300 focus:border-cool-500 focus:ring-cool-500"
      />
      <Button type="submit" className="w-full sm:w-auto bg-gradient-to-r from-cool-400 to-lavender-500 hover:from-cool-500 hover:to-lavender-600 text-white">
        <Plus className="mr-2 h-4 w-4" /> Add User
      </Button>
    </form>
  );
};

export default AddUserForm;
