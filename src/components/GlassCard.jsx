import { motion } from 'framer-motion'

const GlassCard = ({ children, className = '', ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`
        backdrop-blur-md bg-white/10 
        border border-white/20 
        rounded-2xl shadow-xl 
        hover:bg-white/15 
        transition-all duration-300 
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default GlassCard