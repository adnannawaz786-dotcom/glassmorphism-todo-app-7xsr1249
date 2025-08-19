import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Check, Trash2, Edit3, Calendar, Star, Filter, Search } from 'lucide-react';

const HomePage = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('glassmorphism-todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
    setIsLoading(false);
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('glassmorphism-todos', JSON.stringify(todos));
    }
  }, [todos, isLoading]);

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const todo = {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false,
        important: false,
        createdAt: new Date().toISOString(),
      };
      setTodos([todo, ...todos]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = () => {
    if (editText.trim() !== '') {
      setTodos(todos.map(todo =>
        todo.id === editingId ? { ...todo, text: editText.trim() } : todo
      ));
    }
    setEditingId(null);
    setEditText('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const toggleImportant = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, important: !todo.important } : todo
    ));
  };

  const filteredTodos = todos.filter(todo => {
    const matchesSearch = todo.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = 
      filter === 'all' ? true :
      filter === 'active' ? !todo.completed :
      filter === 'completed' ? todo.completed :
      filter === 'important' ? todo.important : true;
    
    return matchesSearch && matchesFilter;
  });

  const completedCount = todos.filter(todo => todo.completed).length;
  const activeCount = todos.filter(todo => !todo.completed).length;
  const importantCount = todos.filter(todo => todo.important).length;

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const handleEditKeyPress = (e) => {
    if (e.key === 'Enter') {
      saveEdit();
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-teal-500 flex items-center justify-center">
        <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 border border-white/30 shadow-2xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-teal-500 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Glass Todo
          </h1>
          <p className="text-white/80 text-lg">
            Beautiful task management with glassmorphism design
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-4 border border-white/30 text-center">
            <div className="text-2xl font-bold text-white">{todos.length}</div>
            <div className="text-white/70 text-sm">Total</div>
          </div>
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-4 border border-white/30 text-center">
            <div className="text-2xl font-bold text-white">{activeCount}</div>
            <div className="text-white/70 text-sm">Active</div>
          </div>
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-4 border border-white/30 text-center">
            <div className="text-2xl font-bold text-white">{completedCount}</div>
            <div className="text-white/70 text-sm">Completed</div>
          </div>
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-4 border border-white/30 text-center">
            <div className="text-2xl font-bold text-white">{importantCount}</div>
            <div className="text-white/70 text-sm">Important</div>
          </div>
        </motion.div>

        {/* Main Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/20 backdrop-blur-lg rounded-3xl p-6 sm:p-8 border border-white/30 shadow-2xl"
        >
          {/* Add Todo Input */}
          <div className="flex gap-3 mb-6">
            <div className="flex-1 relative">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add a new task..."
                className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={addTodo}
              className="px-6 py-3 bg-white/30 backdrop-blur-sm rounded-2xl border border-white/30 text-white hover:bg-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200"
            >
              <Plus size={20} />
            </motion.button>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" size={18} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search tasks..."
                className="w-full pl-10 pr-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              {['all', 'active', 'completed', 'important'].map((filterType) => (
                <motion.button
                  key={filterType}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilter(filterType)}
                  className={`px-4 py-2 rounded-xl border border-white/30 text-sm font-medium transition-all duration-200 capitalize ${
                    filter === filterType
                      ? 'bg-white/40 text-white'
                      : 'bg-white/20 text-white/80 hover:bg-white/30'
                  }`}
                >
                  {filterType}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Todo List */}
          <div className="space-y-3">
            <AnimatePresence>
              {filteredTodos.map((todo, index) => (
                <motion.div
                  key={todo.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: index * 0.05 }}
                  className={`bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30 transition-all duration-200 ${
                    todo.completed ? 'opacity-75' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleTodo(todo.id)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                        todo.completed
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'border-white/50 hover:border-white'
                      }`}
                    >
                      {todo.completed && <Check size={14} />}
                    </motion.button>

                    <div className="flex-1">
                      {editingId === todo.id ? (
                        <input
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          onKeyPress={handleEditKeyPress}
                          onBlur={saveEdit}
                          className="w-full bg-transparent text-white focus:outline-none"
                          autoFocus
                        />
                      ) : (
                        <span
                          className={`text-white ${
                            todo.completed ? 'line-through opacity-60' : ''
                          }`}
                        >
                          {todo.text}
                        </span>
                      )}
                      <div className="text-white/50 text-xs mt-1">
                        {new Date(todo.createdAt).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleImportant(todo.id)}
                        className={`p-2 rounded-xl transition-all duration-200 ${
                          todo.important
                            ? 'bg-yellow-500/30 text-yellow-300'
                            : 'bg-white/20 text-white/60 hover:bg-white/30'
                        }`}
                      >
                        <Star size={16} fill={todo.important ? 'currentColor' : 'none'} />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => startEditing(todo.id, todo.text)}
                        className="p-2 bg-white/20 text-white/60 rounded-xl hover:bg-white/30 transition-all duration-200"
                      >
                        <Edit3 size={16} />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => deleteTodo(todo.id)}
                        className="p-2 bg-red-500/20 text-red-300 rounded-xl hover:bg-red-500/30 transition-all duration-200"
                      >
                        <Trash2 size={16} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredTodos.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="text-white/60 text-lg mb-2">
                  {searchTerm || filter !== 'all' 
                    ? 'No tasks match your criteria' 
                    : 'No tasks yet'
                  }
                </div>
                <div className="text-white/40">
                  {!searchTerm && filter === 'all' && 'Add a task to get started!'}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;