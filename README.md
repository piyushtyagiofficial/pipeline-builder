# VectorShift Pipeline Builder

<div align="center">

![VectorShift Logo](https://img.shields.io/badge/VectorShift-Pipeline%20Builder-blue?style=for-the-badge)

A professional, drag-and-drop visual pipeline builder for creating AI workflows with ease.

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Latest-009688?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com/)
[![ReactFlow](https://img.shields.io/badge/ReactFlow-11.8.3-FF6B6B?style=flat-square)](https://reactflow.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-Latest-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

</div>

## Features

### **Professional UI/UX**
- Modern glass-morphism design with Tailwind CSS
- Responsive layout that works on all devices
- Professional iconography using React Icons
- Smooth animations and hover effects
- Real-time status indicators

### **Drag & Drop Pipeline Builder**
- Intuitive drag-and-drop interface powered by ReactFlow
- Visual connection system with animated edges
- Real-time canvas with zoom, pan, and minimap
- Professional node library with consistent styling

### **Smart Node System**
- **BaseNode Abstraction**: Reusable component architecture for rapid development
- **Dynamic Text Node**: Auto-resizing with variable detection (`{{variableName}}`)
- **Extensible Architecture**: Easy to add new node types
- **Type Safety**: Proper validation and error handling

### **Advanced Node Types**
- **Input/Output Nodes**: Data ingestion and export
- **LLM Node**: Large Language Model integration
- **Text Node**: Dynamic text processing with variable substitution
- **Math Node**: Mathematical operations (Add, Subtract, Multiply, Divide)
- **API Call Node**: HTTP request integration
- **Conditional Node**: Branching logic with true/false outputs
- **Delay Node**: Time-based processing delays
- **Log Node**: Data logging and debugging

### **Performance & Scalability**
- Optimized React components with useMemo/useCallback
- Efficient state management with Zustand
- FastAPI backend for high-performance processing
- Real-time pipeline execution and validation

## 🛠 Tech Stack

### Frontend
- **React 18.2.0** - Modern UI library with hooks
- **ReactFlow 11.8.3** - Powerful flow/graph library
- **Tailwind CSS** - Utility-first CSS framework
- **React Icons** - Professional icon library
- **Zustand** - Lightweight state management
- **Axios** - HTTP client for API communication

### Backend
- **FastAPI** - Modern Python web framework
- **Pydantic** - Data validation and serialization
- **CORS Middleware** - Cross-origin resource sharing
- **Python 3.8+** - Runtime environment

### Development Tools
- **Create React App** - React project setup
- **ES6+ JavaScript** - Modern JavaScript features
- **CSS3** - Advanced styling capabilities

## Architecture

```
folder/
├── frontend/                 # React application
│   ├── public/              # Static assets
│   └── src/
│       ├── components/      # Reusable UI components
│       ├── nodes/          # Node type definitions
│       │   ├── BaseNode.jsx    # Shared node abstraction
│       │   ├── TextNode.js     # Dynamic text processing
│       │   ├── MathNode.jsx    # Mathematical operations
│       │   ├── APICallNode.jsx # HTTP requests
│       │   └── ...         # Additional node types
│       ├── store.js        # State management
│       ├── ui.js           # Main canvas component
│       ├── toolbar.js      # Component library
│       └── submit.js       # Pipeline execution
├── backend/                 # FastAPI server
│   └── main.py             # API routes and logic
└── README.md               # Project documentation
```

##  Installation

### Prerequisites
- **Node.js** (v16.0.0 or higher)
- **npm** or **yarn**
- **Python** (3.8 or higher)
- **pip** (Python package manager)

### 1. Clone the Repository
```bash
git clone https://github.com/piyushtyagiofficial/pipeline-builder.git

```

### 2. Frontend Setup
```bash
cd frontend
npm install
```

### 3. Backend Setup
```bash
cd ../backend
pip install fastapi uvicorn python-multipart

```

### 4. Start Development Servers

**Terminal 1 - Frontend:**
```bash
cd frontend
npm start
```
The frontend will be available at `http://localhost:3000`

**Terminal 2 - Backend:**
```bash
cd backend
venv\Scripts\activate (For Windows)
uvicorn main:app --reload
```
The Backend will be available at `http://127.0.0.1:8000/`

## Usage

### Creating Your First Pipeline

1. **Open the Application**
   - Navigate to `http://localhost:3000`
   - You'll see the VectorShift Pipeline Builder interface

2. **Add Nodes**
   - Drag nodes from the Component Library onto the canvas
   - Each node type has a specific purpose and styling

3. **Connect Nodes**
   - Click and drag from output handles (right side) to input handles (left side)
   - Connections are validated automatically

4. **Configure Nodes**
   - Click on any node to configure its properties
   - Text nodes support variable detection with `{{variableName}}` syntax

5. **Execute Pipeline**
   - Click the "Execute Pipeline" button.
   - View No. of Nodes, edges and it also check whether the nodes and edges in the pipeline form a directed acyclic graph (DAG). 


### Adding New Node Types

Thanks to the BaseNode abstraction, adding new nodes is simple:

```javascript
// NewNode.jsx
import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

export const NewNode = ({ id, data }) => {
  const [value, setValue] = useState(data?.value || '');

  return (
    <BaseNode
      id={id}
      title="New Node"
      data={{ value }}
      onChange={{ value: setValue }}
      fields={[
        { label: 'Value', key: 'value', type: 'text' },
      ]}
      handles={[
        { type: 'target', position: Position.Left, id: 'input' },
        { type: 'source', position: Position.Right, id: 'output' },
      ]}
    />
  );
};
```

## API Documentation

### Pipeline Execution

**POST** `/pipelines/parse`

Execute a pipeline with the provided configuration.

**Request Body:**
```json
{
  "nodes": [...],
  "edges": [...]
}
```

**Response:**
```json
{
  "num_nodes": 5,
  "num_edges": 4,
  "is_dag": true
}
```

### API Features
- Pipeline validation
- DAG (Directed Acyclic Graph) detection
- Node and edge counting
- Error handling and validation

## Development

### Project Structure

The project follows a clean architecture pattern:

- **Components**: Reusable UI components
- **Nodes**: Individual node type implementations
- **Store**: Centralized state management
- **API**: Backend integration layer

### Code Quality

- **ESLint**: Code linting and formatting
- **Consistent Styling**: Tailwind CSS utility classes
- **Type Safety**: PropTypes validation
- **Performance**: Optimized React patterns

### Adding Features

1. **New Node Types**: Extend BaseNode for consistent behavior
2. **UI Components**: Follow existing design patterns
3. **API Endpoints**: Add to FastAPI backend
4. **State Management**: Use Zustand store

## Contributing

We welcome contributions! Please follow these steps:

1. **Fork the Repository**
2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit Changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to Branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow existing code patterns
- Add tests for new features
- Update documentation as needed
- Ensure responsive design
- Maintain accessibility standards

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">


*Transform your data processing workflows with the power of visual programming*

</div>
