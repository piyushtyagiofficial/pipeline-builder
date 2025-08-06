import { Handle, Position } from 'reactflow';
import { HiDownload, HiUpload, HiDocumentText, HiCog, HiClock } from 'react-icons/hi';
import { FaBrain, FaCalculator, FaDatabase, FaQuestion } from 'react-icons/fa';
import { MdApi } from 'react-icons/md';

const nodeTypeIcons = {
    'Input': HiDownload,
    'Output': HiUpload, 
    'LLM': FaBrain,
    'Text': HiDocumentText,
    'Math': FaCalculator,
    'API Call': MdApi,
    'Condition': FaQuestion,
    'Delay': HiClock,
    'Log': FaDatabase
};

const nodeTypeColors = {
    'Input': 'from-green-300/30 to-emerald-400/30 border-green-300',
    'Output': 'from-yellow-300/30 to-orange-400/30 border-yellow-300',
    'LLM': 'from-indigo-300/30 to-purple-400/30 border-indigo-300',
    'Text': 'from-blue-300/30 to-red-400/30 border-blue-300',
    'Math': 'from-pink-300/30 to-rose-400/30 border-pink-300',
    'API Call': 'from-indigo-300/30 to-blue-400/30 border-indigo-300',
    'Condition': 'from-yellow-300/30 to-orange-400/30 border-yellow-300',
    'Delay': 'from-teal-300/30 to-cyan-400/30 border-teal-300',
    'Log': 'from-slate-300/30 to-gray-400/30 border-slate-300'
};

export const BaseNode = ({
    id,
    title,
    fields = [],
    handles = [],
    data = {},
    onChange = {},
    customInfo = null,
    dynamicSize = null, 
}) => {
    const colorClass = nodeTypeColors[title] || 'from-slate-400/20 to-gray-400/20 border-slate-200';
    const IconComponent = nodeTypeIcons[title] || HiCog;

    // Dynamic sizing logic
    const sizeStyles = dynamicSize 
        ? { width: `${dynamicSize.width}px`, minHeight: `${dynamicSize.height}px` }
        : {};
    
    const containerClass = dynamicSize 
        ? "p-6 rounded-2xl shadow-xl bg-gradient-to-br backdrop-blur-sm border-2 font-sans relative transition-all duration-300 hover:shadow-2xl hover:scale-105 group"
        : "w-[280px] p-6 rounded-2xl shadow-xl bg-gradient-to-br backdrop-blur-sm border-2 font-sans relative transition-all duration-300 hover:shadow-2xl hover:scale-105 group";

    return (
        <div 
            className={`${containerClass} ${colorClass}`}
            style={sizeStyles}
        >
            <div className="font-bold text-lg mb-4 text-slate-800 flex items-center gap-3">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200">
                    <IconComponent className="text-slate-600 text-lg" />
                </div>
                <span>{title}</span>
                <div className="ml-auto">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                </div>
            </div>

            {/* Custom info section */}
            {customInfo && (
                <div className="mb-3 p-2 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-xs text-blue-700 font-medium">
                        {customInfo}
                    </div>
                </div>
            )}

            <div className="flex flex-col gap-4">{fields.map(({ label, key, type, options }) => (
                    <div key={key} className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                            <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
                            {label}:
                        </label>
                        {type === 'select' ? (
                            <select
                                value={data[key]}
                                onChange={(e) => onChange[key]?.(e.target.value)}
                                className="
                                    w-full px-4 py-2 rounded-lg 
                                    border-2 border-slate-200 
                                    bg-white/80 backdrop-blur-sm
                                    text-sm font-medium text-slate-700
                                    focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400
                                    hover:border-slate-300 
                                    transition-all duration-200
                                "
                            >
                                {options.map((opt) => (
                                    <option key={opt} value={opt}>
                                        {opt}
                                    </option>
                                ))}
                            </select>
                        ) : type === 'textarea' ? (
                            <textarea
                                value={data[key]}
                                onChange={(e) => onChange[key]?.(e.target.value)}
                                rows={Math.max(3, Math.min(10, (data[key] || '').split('\n').length + 1))}
                                className="
                                    w-full px-4 py-2 rounded-lg 
                                    border-2 border-slate-200 
                                    bg-white/80 backdrop-blur-sm
                                    text-sm font-medium text-slate-700
                                    focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400
                                    hover:border-slate-300 
                                    transition-all duration-200
                                    resize-y
                                "
                                style={title === 'Text' ? { 
                                    minHeight: '80px',
                                    height: 'auto'
                                } : {}}
                                placeholder={title === 'Text' ? 'Enter text content. Use {{variableName}} for variables...' : `Enter ${label.toLowerCase()}...`}
                            />
                        ) : (
                            <input
                                type={type}
                                value={data[key]}
                                onChange={(e) => onChange[key]?.(e.target.value)}
                                className="
                                    w-full px-4 py-2 rounded-lg 
                                    border-2 border-slate-200 
                                    bg-white/80 backdrop-blur-sm
                                    text-sm font-medium text-slate-700
                                    focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400
                                    hover:border-slate-300 
                                    transition-all duration-200
                                "
                                placeholder={`Enter ${label.toLowerCase()}...`}
                            />
                        )}
                    </div>
                ))}
            </div>

            {handles.map(({ type, position, id: handleId, style }) => (
                <Handle
                    key={handleId}
                    type={type}
                    position={position}
                    id={`${id}-${handleId}`}
                    className="
                        w-4 h-4 border-3 border-white
                        bg-gradient-to-br from-blue-500 to-indigo-600
                        shadow-lg hover:shadow-xl
                        transition-all duration-200 hover:scale-125
                        z-10
                    "
                    style={{
                        ...style,
                    }}
                />
            ))}
        </div>
    );
};
