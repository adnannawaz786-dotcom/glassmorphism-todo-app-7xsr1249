import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, X, Edit3, Trash2 } from 'lucide-react'

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText.trim())
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditText(todo.text)
    setIsEditing(false)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="group relative backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl p-4 hover:bg-white/15 transition-all duration-300 shadow-lg"
    >
      <div className="flex items-center gap-3">
        {/* Checkbox */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onToggle(todo.id)}
          className={`relative w-6 h-6 rounded-full border-2 transition-all duration-300 ${
            todo.completed
              ? 'bg-gradient-to-r from-emerald-400 to-cyan-400 border-emerald-400'
              : 'border-white/40 hover:border-white/60'
          }`}
        >
          {todo.completed && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Check className="w-3 h-3 text-white" />
            </motion.div>
          )}
        </motion.button>

        {/* Todo Text */}
        <div className="flex-1">
          {isEditing ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyPress}
              onBlur={handleSave}
              className="w-full bg-transparent border-none outline-none text-white placeholder-white/60 text-lg"
              autoFocus
            />
          ) : (
            <motion.span
              layout
              className={`text-lg transition-all duration-300 ${
                todo.completed
                  ? 'text-white/60 line-through'
                  : 'text-white'
              }`}
            >
              {todo.text}
            </motion.span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {isEditing ? (
            <>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSave}
                className="p-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 transition-colors duration-200"
              >
                <Check className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCancel}
                className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-colors duration-200"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </>
          ) : (
            <>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(true)}
                className="p-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 transition-colors duration-200"
                disabled={todo.completed}
              >
                <Edit3 className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onDelete(todo.id)}
                className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-colors duration-200"
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>
            </>
          )}
        </div>
      </div>

      {/* Completion Date */}
      {todo.completed && todo.completedAt && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-2 text-sm text-white/40"
        >
          Completed on {new Date(todo.completedAt).toLocaleDateString()}
        </motion.div>
      )}

      {/* Glassmorphism shine effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  )
}