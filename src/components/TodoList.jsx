import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Edit2, Trash2 } from 'lucide-react';

const TodoList = ({ 
  todos, 
  onToggleTodo, 
  onDeleteTodo, 
  onEditTodo, 
  editingId, 
  editText, 
  setEditText, 
  onSaveEdit, 
  onCancelEdit 
}) => {
  const handleEditSubmit = (e, id) => {
    e.preventDefault();
    onSaveEdit(id);
  };

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {todos.map((todo) => (
          <motion.div
            key={todo.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="group relative"
          >
            <div 
              className="relative backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-white/15"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
              }}
            >
              {editingId === todo.id ? (
                <form onSubmit={(e) => handleEditSubmit(e, todo.id)} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-transparent"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') {
                        onCancelEdit();
                      }
                    }}
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    type="submit"
                    className="p-2 bg-green-500/20 hover:bg-green-500/30 rounded-lg transition-colors duration-200 text-green-300 hover:text-green-200"
                  >
                    <Check size={16} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    onClick={onCancelEdit}
                    className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors duration-200 text-red-300 hover:text-red-200"
                  >
                    <X size={16} />
                  </motion.button>
                </form>
              ) : (
                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onToggleTodo(todo.id)}
                    className={`flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                      todo.completed
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-purple-400 shadow-lg shadow-purple-500/30'
                        : 'border-white/40 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/20'
                    }`}
                  >
                    <AnimatePresence>
                      {todo.completed && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Check size={12} className="text-white" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>

                  <span 
                    className={`flex-1 transition-all duration-300 ${
                      todo.completed 
                        ? 'text-white/60 line-through' 
                        : 'text-white/90'
                    }`}
                  >
                    {todo.text}
                  </span>

                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onEditTodo(todo.id, todo.text)}
                      className="p-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-colors duration-200 text-blue-300 hover:text-blue-200"
                    >
                      <Edit2 size={14} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onDeleteTodo(todo.id)}
                      className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors duration-200 text-red-300 hover:text-red-200"
                    >
                      <Trash2 size={14} />
                    </motion.button>
                  </div>
                </div>
              )}
            </div>

            {/* Glassmorphism glow effect */}
            <div 
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
              style={{
                background: 'linear-gradient(135deg, rgba(139, 69, 255, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
                filter: 'blur(10px)',
                transform: 'scale(1.02)',
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {todos.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-12"
        >
          <div 
            className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8 mx-auto max-w-md"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center">
              <Check size={32} className="text-white/40" />
            </div>
            <h3 className="text-white/70 text-lg font-medium mb-2">No todos yet</h3>
            <p className="text-white/50 text-sm">Add your first todo to get started!</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TodoList;