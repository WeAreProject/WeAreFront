interface PurchaseStatusProps {
    status: "pending" | "completed" | "canceled";
  }
  
  const statusConfig = {
    pending: {
      color: "bg-status-pending",
      text: "Pending",
    },
    completed: {
      color: "bg-status-completed",
      text: "Completed",
    },
    canceled: {
      color: "bg-status-canceled",
      text: "Canceled",
    },
  };
  
  export function PurchaseStatus({ status }: PurchaseStatusProps) {
    const config = statusConfig[status];
  
    return (
      <div className="flex items-center gap-2">
        <div className={`h-2 w-2 rounded-full animate-pulse ${config.color}`} />
        <span className="text-sm font-medium text-gray-700">
          {config.text}
        </span>
      </div>
    );
  }
  