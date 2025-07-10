import React, { useEffect, useRef, useState } from 'react';
import { useProcess } from '../../contexts/ProcessContext';
import { 
  Save, 
  Download, 
  Upload, 
  Undo, 
  Redo, 
  ZoomIn, 
  ZoomOut, 
  Maximize,
  Settings,
  Play,
  Eye,
  Edit3,
  Trash2,
  Copy,
  Paste
} from 'lucide-react';

const BPMNEditor = () => {
  const canvasRef = useRef(null);
  const { currentProcess, setCurrentProcess, addToHistory, undo, redo } = useProcess();
  const [selectedElement, setSelectedElement] = useState(null);
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showPalette, setShowPalette] = useState(true);
  const [showProperties, setShowProperties] = useState(true);

  // BPMN Elements Palette
  const bpmnElements = [
    {
      type: 'start-event',
      label: 'Start Event',
      icon: '⭕',
      category: 'Events'
    },
    {
      type: 'end-event',
      label: 'End Event',
      icon: '⭕',
      category: 'Events'
    },
    {
      type: 'task',
      label: 'Task',
      icon: '📋',
      category: 'Activities'
    },
    {
      type: 'gateway',
      label: 'Gateway',
      icon: '🔀',
      category: 'Gateways'
    },
    {
      type: 'pool',
      label: 'Pool',
      icon: '🏊',
      category: 'Swimlanes'
    },
    {
      type: 'lane',
      label: 'Lane',
      icon: '🏊',
      category: 'Swimlanes'
    },
    {
      type: 'data-object',
      label: 'Data Object',
      icon: '📄',
      category: 'Data'
    },
    {
      type: 'annotation',
      label: 'Annotation',
      icon: '📝',
      category: 'Artifacts'
    }
  ];

  const handleDragStart = (e, elementType) => {
    e.dataTransfer.setData('application/json', JSON.stringify({ type: elementType }));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData('application/json'));
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Create new element
    const newElement = {
      id: `element-${Date.now()}`,
      type: data.type,
      x: x,
      y: y,
      label: `New ${data.type}`,
      properties: {}
    };

    // Add to process
    const updatedProcess = {
      ...currentProcess,
      elements: [...(currentProcess?.elements || []), newElement]
    };

    setCurrentProcess(updatedProcess);
    addToHistory(updatedProcess);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleElementClick = (element) => {
    setSelectedElement(element);
  };

  const handleElementDelete = () => {
    if (!selectedElement) return;

    const updatedProcess = {
      ...currentProcess,
      elements: currentProcess.elements.filter(el => el.id !== selectedElement.id)
    };

    setCurrentProcess(updatedProcess);
    addToHistory(updatedProcess);
    setSelectedElement(null);
  };

  const handleElementUpdate = (updates) => {
    if (!selectedElement) return;

    const updatedProcess = {
      ...currentProcess,
      elements: currentProcess.elements.map(el => 
        el.id === selectedElement.id ? { ...el, ...updates } : el
      )
    };

    setCurrentProcess(updatedProcess);
    addToHistory(updatedProcess);
    setSelectedElement({ ...selectedElement, ...updates });
  };

  const handleSave = () => {
    // Save process logic
    console.log('Saving process:', currentProcess);
  };

  const handleExport = (format) => {
    // Export logic
    console.log(`Exporting as ${format}`);
  };

  const handleImport = () => {
    // Import logic
    console.log('Importing BPMN file');
  };

  const handleZoom = (direction) => {
    const newZoom = direction === 'in' ? Math.min(zoom + 10, 200) : Math.max(zoom - 10, 25);
    setZoom(newZoom);
  };

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`flex h-full ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Toolbar */}
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={handleSave}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            title="Save"
          >
            <Save className="h-5 w-5" />
          </button>
          <button
            onClick={() => handleExport('png')}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            title="Export as PNG"
          >
            <Download className="h-5 w-5" />
          </button>
          <button
            onClick={handleImport}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            title="Import"
          >
            <Upload className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={undo}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            title="Undo"
          >
            <Undo className="h-5 w-5" />
          </button>
          <button
            onClick={redo}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            title="Redo"
          >
            <Redo className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleZoom('out')}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="h-5 w-5" />
          </button>
          <span className="text-sm text-gray-600 min-w-[60px] text-center">{zoom}%</span>
          <button
            onClick={() => handleZoom('in')}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="h-5 w-5" />
          </button>
          <button
            onClick={handleFullscreen}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            title="Fullscreen"
          >
            <Maximize className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 flex">
        {/* Elements Palette */}
        {showPalette && (
          <div className="w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Elements</h3>
            <div className="space-y-4">
              {bpmnElements.map((element) => (
                <div key={element.type} className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-700">{element.category}</h4>
                  <div
                    draggable
                    onDragStart={(e) => handleDragStart(e, element.type)}
                    className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg cursor-move hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-2xl">{element.icon}</span>
                    <span className="text-sm text-gray-700">{element.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Canvas */}
        <div className="flex-1 relative">
          <div
            ref={canvasRef}
            className="w-full h-full bg-gray-50 relative overflow-auto"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            style={{ transform: `scale(${zoom / 100})` }}
          >
            {/* Grid Background */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

            {/* BPMN Elements */}
            {currentProcess?.elements?.map((element) => (
              <div
                key={element.id}
                onClick={() => handleElementClick(element)}
                className={`absolute cursor-pointer border-2 ${
                  selectedElement?.id === element.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 bg-white'
                } rounded-lg p-2 min-w-[120px] min-h-[60px] flex items-center justify-center`}
                style={{
                  left: element.x,
                  top: element.y,
                }}
              >
                <div className="text-center">
                  <div className="text-2xl mb-1">
                    {bpmnElements.find(el => el.type === element.type)?.icon}
                  </div>
                  <div className="text-xs text-gray-700 font-medium">{element.label}</div>
                </div>
              </div>
            ))}

            {/* Connection Lines */}
            {/* This would be implemented for connecting elements */}
          </div>
        </div>

        {/* Properties Panel */}
        {showProperties && selectedElement && (
          <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Properties</h3>
              <button
                onClick={handleElementDelete}
                className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded"
                title="Delete Element"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Label
                </label>
                <input
                  type="text"
                  value={selectedElement.label}
                  onChange={(e) => handleElementUpdate({ label: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <div className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-md">
                  {selectedElement.type}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-gray-500">X</label>
                    <input
                      type="number"
                      value={Math.round(selectedElement.x)}
                      onChange={(e) => handleElementUpdate({ x: parseInt(e.target.value) })}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500">Y</label>
                    <input
                      type="number"
                      value={Math.round(selectedElement.y)}
                      onChange={(e) => handleElementUpdate({ y: parseInt(e.target.value) })}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Properties based on element type */}
              {selectedElement.type === 'task' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Task Type
                  </label>
                  <select
                    value={selectedElement.properties?.taskType || 'manual'}
                    onChange={(e) => handleElementUpdate({ 
                      properties: { ...selectedElement.properties, taskType: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="manual">Manual</option>
                    <option value="service">Service</option>
                    <option value="user">User</option>
                    <option value="script">Script</option>
                  </select>
                </div>
              )}

              {selectedElement.type === 'gateway' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gateway Type
                  </label>
                  <select
                    value={selectedElement.properties?.gatewayType || 'exclusive'}
                    onChange={(e) => handleElementUpdate({ 
                      properties: { ...selectedElement.properties, gatewayType: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="exclusive">Exclusive</option>
                    <option value="parallel">Parallel</option>
                    <option value="inclusive">Inclusive</option>
                    <option value="event-based">Event-based</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Toggle Buttons */}
      <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
        <button
          onClick={() => setShowPalette(!showPalette)}
          className="p-3 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          title={showPalette ? 'Hide Palette' : 'Show Palette'}
        >
          <Edit3 className="h-5 w-5 text-gray-600" />
        </button>
        <button
          onClick={() => setShowProperties(!showProperties)}
          className="p-3 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          title={showProperties ? 'Hide Properties' : 'Show Properties'}
        >
          <Settings className="h-5 w-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default BPMNEditor; 