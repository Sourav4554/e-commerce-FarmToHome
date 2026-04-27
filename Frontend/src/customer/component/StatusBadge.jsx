import React from 'react'

const StatusBadge = ({status,STATUS_META}) => {

    const meta = STATUS_META[status] || STATUS_META.placed;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold  ${meta.color}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
      {meta.label}
    </span>
  );
  
}

export default StatusBadge