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
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
      <Input 
        placeholder="Show title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        required 
        className="flex-grow border-cool-600 focus:border-cool-400 focus:ring-cool-400 bg-cool-700 text-cool-100"
      />
      <select 
        value={type} 
        onChange={(e) => setType(e.target.value)}
        className="w-full sm:w-auto px-3 py-2 border border-cool-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cool-400 focus:border-cool-400 bg-cool-700 text-cool-100"
      >
        <option value="movie">Movie</option>
        <option value="tv">TV Show</option>
      </select>
      <Button type="submit" className="w-full sm:w-auto bg-gradient-to-r from-cool-600 to-lavender-700 hover:from-cool-700 hover:to-lavender-800 text-white">
        <Plus className="mr-2 h-4 w-4" /> Add Show
      </Button>
    </form>
  );
};

export default AddShowForm;
