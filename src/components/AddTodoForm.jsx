import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Calendar, Flag, Tag } from 'lucide-react';

const AddTodoForm = ({ onAddTodo }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category: '',
    dueDate: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const newTodo = {
      id: Date.now(),
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      category: formData.category,
      dueDate: formData.dueDate,
      completed: false,
      createdAt: new Date().toISOString()
    };

    onAddTodo(newTodo);
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      category: '',
      dueDate: ''
    });
    setIsExpanded(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const priorityColors = {
    low: 'from-green-400 to-emerald-500',
    medium: 'from-yellow-400 to-orange-500',
    high: 'from-red-400 to-pink-500'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Main Input */}
        <motion.div
          className="relative backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 shadow-xl overflow-hidden"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="flex items-center p-4">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              onFocus={() => setIsExpanded(true)}
              placeholder="Add a new task..."
              className="flex-1 bg-transparent text-white placeholder-white/60 outline-none text-lg font-medium"
              autoComplete="off"
            />
            <motion.button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="ml-3 p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                animate={{ rotate: isExpanded ? 45 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <Plus className="w-5 h-5 text-white" />
              </motion.div>
            </motion.button>
          </div>

          {/* Expanded Form */}
          <motion.div
            initial={false}
            animate={{
              height: isExpanded ? "auto" : 0,
              opacity: isExpanded ? 1 : 0
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-4 border-t border-white/10">
              {/* Description */}
              <div className="mt-4">
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Add description (optional)"
                  rows={3}
                  className="w-full bg-white/5 rounded-xl p-3 text-white placeholder-white/50 outline-none border border-white/10 focus:border-white/30 transition-colors resize-none"
                />
              </div>

              {/* Form Controls Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Priority */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm text-white/80 font-medium">
                    <Flag className="w-4 h-4 mr-2" />
                    Priority
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 rounded-lg p-2.5 text-white outline-none border border-white/10 focus:border-white/30 transition-colors appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                      backgroundPosition: 'right 0.5rem center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '1.5em 1.5em',
                      paddingRight: '2.5rem'
                    }}
                  >
                    <option value="low" className="bg-gray-800">Low</option>
                    <option value="medium" className="bg-gray-800">Medium</option>
                    <option value="high" className="bg-gray-800">High</option>
                  </select>
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm text-white/80 font-medium">
                    <Tag className="w-4 h-4 mr-2" />
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    placeholder="Work, Personal..."
                    className="w-full bg-white/10 rounded-lg p-2.5 text-white placeholder-white/50 outline-none border border-white/10 focus:border-white/30 transition-colors"
                  />
                </div>

                {/* Due Date */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm text-white/80 font-medium">
                    <Calendar className="w-4 h-4 mr-2" />
                    Due Date
                  </label>
                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 rounded-lg p-2.5 text-white outline-none border border-white/10 focus:border-white/30 transition-colors"
                    style={{
                      colorScheme: 'dark'
                    }}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-2">
                <motion.button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="px-4 py-2 text-white/70 hover:text-white transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  disabled={!formData.title.trim()}
                  className={`px-6 py-2 rounded-xl font-medium transition-all ${
                    formData.title.trim()
                      ? `bg-gradient-to-r ${priorityColors[formData.priority]} text-white shadow-lg hover:shadow-xl`
                      : 'bg-white/10 text-white/50 cursor-not-allowed'
                  }`}
                  whileHover={formData.title.trim() ? { scale: 1.05 } : {}}
                  whileTap={formData.title.trim() ? { scale: 0.95 } : {}}
                >
                  Add Task
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default AddTodoForm;