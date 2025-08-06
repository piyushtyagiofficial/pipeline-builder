import { DraggableNode } from './draggableNode';
import { HiCog, HiLightBulb } from 'react-icons/hi';
import { FaTools } from 'react-icons/fa';

export const PipelineToolbar = () => {
    return (
        <div className="bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                            <FaTools className="text-white text-sm" />
                        </div>
                        Component Library
                    </h2>
                    <p className="text-slate-600 mt-1">Drag components below to build your pipeline</p>
                </div>
                <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-blue-700 text-sm font-medium">Ready to build</span>
                </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <DraggableNode type='customInput' label='Input Node' />
                <DraggableNode type='llm' label='LLM Node' />
                <DraggableNode type='customOutput' label='Output Node' />
                <DraggableNode type='text' label='Text Node' />
                {/* Additional nodes */}
                <DraggableNode type='apiCall' label='API Call Node' />
                <DraggableNode type='delay' label='Delay Node' />
                <DraggableNode type='log' label='Log Node' />
                <DraggableNode type='conditional' label='Conditional Node' />
                <DraggableNode type='math' label='Math Node' />
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-blue-700 text-sm flex items-center gap-2">
                    <HiLightBulb className="w-4 h-4" />
                    <strong>Tip:</strong> Click and drag any component onto the canvas to add it to your pipeline
                </p>
            </div>
        </div>
    );
};
