import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { SiVectorworks } from 'react-icons/si';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-6 space-y-6">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <SiVectorworks className="text-white text-2xl" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            VectorShift Pipeline Builder
          </h1>
          <p className="text-slate-600 text-lg">
            Create powerful AI workflows with our intuitive drag-and-drop interface
          </p>
        </header>
        
        <PipelineToolbar />
        <PipelineUI />
        <SubmitButton />
      </div>
    </div>
  );
}

export default App;
