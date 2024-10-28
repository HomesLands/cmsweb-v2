import React from "react";

interface TimelineItem {
  user: string;
  role: string;
  status: string;
  content: string;
  createdAt: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

const Timeline: React.FC<TimelineProps> = ({ items }) => {
  return (
    <div className="timeline">
      {items.map((item, index) => (
        <div key={index} className="timeline-item">
          <div className="timeline-content">
            <h4>
              {item.user} - {item.role}
            </h4>
            <p>{item.content}</p>
            <span>
              {item.status} - {item.createdAt}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
