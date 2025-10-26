// STATS CARD COMPONENT
// Purpose: Display individual statistics
// Props: icon, label, value, subtitle, isPrimary (for styling)

export default function ExpenseStats({ icon, label, value, subtitle, isPrimary = false }) {
  return (
    <div className={`stat-card ${isPrimary ? 'primary' : ''}`}>
      <div className="stat-header">
        <div 
          className="stat-icon" 
          style={isPrimary ? 
            { background: 'rgba(255,255,255,0.2)' } : 
            { background: '#FFE5D9', color: '#FF6B35' }
          }
        >
          {icon}
        </div>
        <span className="stat-label">{label}</span>
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-subtitle">{subtitle}</div>
    </div>
  );
}