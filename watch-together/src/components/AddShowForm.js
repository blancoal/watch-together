import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const AddShowForm = ({ onAddShow }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('movie');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddShow({ id: Date.now(), title, type });
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <Input placeholder="Show title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <select 
        value={type} 
        onChange={(e) => setType(e.target.value)}
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <option value="movie">Movie</option>
        <option value="tv">TV Show</option>
      </select>
      <Button type="submit"><Plus className="mr-2 h-4 w-4" /> Add Show</Button>
    </form>
  );
};

export default AddShowForm;
