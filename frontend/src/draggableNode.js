import { HiDownload, HiUpload, HiDocumentText, HiClock, HiCode, HiCog } from 'react-icons/hi';
import { FaBrain, FaCalculator, FaDatabase, FaQuestion } from 'react-icons/fa';
import { MdApi } from 'react-icons/md';

const nodeTypeStyles = {
  customInput: {
    bg: 'bg-gradient-to-r from-emerald-500 to-green-600',
    icon: HiDownload,
    border: 'border-emerald-200',
    shadow: 'shadow-emerald-200/50'
  },
  llm: {
    bg: 'bg-gradient-to-r from-purple-500 to-violet-600',
    icon: FaBrain,
    border: 'border-purple-200',
    shadow: 'shadow-purple-200/50'
  },
  customOutput: {
    bg: 'bg-gradient-to-r from-orange-500 to-amber-600',
    icon: HiUpload,
    border: 'border-orange-200',
    shadow: 'shadow-orange-200/50'
  },
  text: {
    bg: 'bg-gradient-to-r from-cyan-500 to-blue-600',
    icon: HiDocumentText,
    border: 'border-cyan-200',
    shadow: 'shadow-cyan-200/50'
  },
  math: {
    bg: 'bg-gradient-to-r from-pink-500 to-rose-600',
    icon: FaCalculator,
    border: 'border-pink-200',
    shadow: 'shadow-pink-200/50'
  },
  apiCall: {
    bg: 'bg-gradient-to-r from-indigo-500 to-blue-600',
    icon: MdApi,
    border: 'border-indigo-200',
    shadow: 'shadow-indigo-200/50'
  },
  conditional: {
    bg: 'bg-gradient-to-r from-yellow-500 to-orange-600',
    icon: FaQuestion,
    border: 'border-yellow-200',
    shadow: 'shadow-yellow-200/50'
  },
  delay: {
    bg: 'bg-gradient-to-r from-teal-500 to-cyan-600',
    icon: HiClock,
    border: 'border-teal-200',
    shadow: 'shadow-teal-200/50'
  },
  log: {
    bg: 'bg-gradient-to-r from-slate-500 to-gray-600',
    icon: FaDatabase,
    border: 'border-slate-200',
    shadow: 'shadow-slate-200/50'
  }
};

export const DraggableNode = ({ type, label, className }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType };
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };

    const styles = nodeTypeStyles[type] || nodeTypeStyles.text;
    const IconComponent = styles.icon;
  
    return (
      <div
        className={`
          cursor-grab active:cursor-grabbing
          min-w-[120px] h-[80px]
          flex items-center justify-center
          rounded-xl border-2 ${styles.border}
          ${styles.bg}
          text-white font-semibold text-sm
          shadow-lg ${styles.shadow}
          hover:scale-105 hover:shadow-xl
          transition-all duration-200 ease-in-out
          group
          ${className || ''}
        `}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        draggable
      >
        <div className="flex flex-col items-center gap-2">
          <IconComponent className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
          <span className="text-white font-medium">{label}</span>
        </div>
      </div>
    );
};  