import { HiPlay, HiLightningBolt } from "react-icons/hi";
import { SiReact } from "react-icons/si";
import { useStore } from "./store";
import axios from "axios";

export const SubmitButton = () => {
  const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
  });
  const { nodes, edges } = useStore(selector);

  const handleExecute = async (e) => {
    console.log(nodes, edges);
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/pipelines/parse", {
        nodes,
        edges,
      });
      const { num_nodes, num_edges, is_dag } = response.data;

      window.alert(
        `Pipeline executed successfully!\nTotal Nodes: ${num_nodes}\nTotal Edges: ${num_edges}\nIs DAG: ${is_dag ? "Yes" : "No"}`
      );
      console.log("Pipeline executed:", response.data);
    } catch (error) {
      console.error("Error executing pipeline:", error.response?.data || error.message);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl shadow-xl p-6 w-full">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold text-slate-800 mb-1">
              Ready to Execute?
            </h3>
            <p className="text-slate-600 text-sm">
              Your pipeline is ready to run. Click execute to process your workflow.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleExecute}
              className="
                group relative overflow-hidden
                bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700
                hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800
                text-white font-semibold
                px-8 py-3 rounded-xl
                shadow-lg shadow-blue-500/25
                hover:shadow-xl hover:shadow-blue-500/40
                transform hover:scale-105
                transition-all duration-200 ease-out
                flex items-center gap-3
                focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
              "
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1000ms]"></div>

              <HiPlay className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              <span className="relative">Execute Pipeline</span>
            </button>
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="text-slate-500 text-xs flex items-center justify-center gap-2">
          <HiLightningBolt className="w-3 h-3" />
          Powered by VectorShift
          <span className="mx-1">•</span>
          Built with
          <SiReact className="w-3 h-3 text-blue-500" />
          React Flow
        </p>
      </div>
    </div>
  );
};
