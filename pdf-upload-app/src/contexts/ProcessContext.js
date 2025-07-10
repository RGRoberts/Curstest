import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { produce } from 'immer';
import toast from 'react-hot-toast';

const ProcessContext = createContext();

const initialState = {
  processes: [],
  currentProcess: null,
  selectedElement: null,
  history: [],
  historyIndex: -1,
  isLoading: false,
  error: null,
};

const processReducer = (state, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case 'SET_LOADING':
        draft.isLoading = action.payload;
        break;
      
      case 'SET_ERROR':
        draft.error = action.payload;
        break;
      
      case 'SET_PROCESSES':
        draft.processes = action.payload;
        break;
      
      case 'SET_CURRENT_PROCESS':
        draft.currentProcess = action.payload;
        break;
      
      case 'UPDATE_PROCESS':
        const processIndex = draft.processes.findIndex(p => p.id === action.payload.id);
        if (processIndex !== -1) {
          draft.processes[processIndex] = { ...draft.processes[processIndex], ...action.payload };
        }
        if (draft.currentProcess?.id === action.payload.id) {
          draft.currentProcess = { ...draft.currentProcess, ...action.payload };
        }
        break;
      
      case 'ADD_PROCESS':
        draft.processes.push(action.payload);
        break;
      
      case 'DELETE_PROCESS':
        draft.processes = draft.processes.filter(p => p.id !== action.payload);
        if (draft.currentProcess?.id === action.payload) {
          draft.currentProcess = null;
        }
        break;
      
      case 'SET_SELECTED_ELEMENT':
        draft.selectedElement = action.payload;
        break;
      
      case 'ADD_TO_HISTORY':
        // Remove any history after current index
        draft.history = draft.history.slice(0, draft.historyIndex + 1);
        draft.history.push(action.payload);
        draft.historyIndex = draft.history.length - 1;
        break;
      
      case 'UNDO':
        if (draft.historyIndex > 0) {
          draft.historyIndex--;
          draft.currentProcess = draft.history[draft.historyIndex];
        }
        break;
      
      case 'REDO':
        if (draft.historyIndex < draft.history.length - 1) {
          draft.historyIndex++;
          draft.currentProcess = draft.history[draft.historyIndex];
        }
        break;
      
      case 'CLEAR_HISTORY':
        draft.history = [];
        draft.historyIndex = -1;
        break;
      
      default:
        break;
    }
  });
};

export const ProcessProvider = ({ children }) => {
  const [state, dispatch] = useReducer(processReducer, initialState);

  const setLoading = useCallback((loading) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  }, []);

  const setError = useCallback((error) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  }, []);

  const loadProcesses = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/processes', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (response.ok) {
        const processes = await response.json();
        dispatch({ type: 'SET_PROCESSES', payload: processes });
      } else {
        throw new Error('Failed to load processes');
      }
    } catch (error) {
      setError(error.message);
      toast.error('Failed to load processes');
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError]);

  const createProcess = useCallback(async (processData) => {
    setLoading(true);
    try {
      const response = await fetch('/api/processes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(processData),
      });
      
      if (response.ok) {
        const newProcess = await response.json();
        dispatch({ type: 'ADD_PROCESS', payload: newProcess });
        toast.success('Process created successfully');
        return newProcess;
      } else {
        throw new Error('Failed to create process');
      }
    } catch (error) {
      setError(error.message);
      toast.error('Failed to create process');
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError]);

  const updateProcess = useCallback(async (processId, updates) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/processes/${processId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(updates),
      });
      
      if (response.ok) {
        const updatedProcess = await response.json();
        dispatch({ type: 'UPDATE_PROCESS', payload: updatedProcess });
        toast.success('Process updated successfully');
        return updatedProcess;
      } else {
        throw new Error('Failed to update process');
      }
    } catch (error) {
      setError(error.message);
      toast.error('Failed to update process');
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError]);

  const deleteProcess = useCallback(async (processId) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/processes/${processId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (response.ok) {
        dispatch({ type: 'DELETE_PROCESS', payload: processId });
        toast.success('Process deleted successfully');
      } else {
        throw new Error('Failed to delete process');
      }
    } catch (error) {
      setError(error.message);
      toast.error('Failed to delete process');
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError]);

  const setCurrentProcess = useCallback((process) => {
    dispatch({ type: 'SET_CURRENT_PROCESS', payload: process });
  }, []);

  const setSelectedElement = useCallback((element) => {
    dispatch({ type: 'SET_SELECTED_ELEMENT', payload: element });
  }, []);

  const addToHistory = useCallback((processState) => {
    dispatch({ type: 'ADD_TO_HISTORY', payload: processState });
  }, []);

  const undo = useCallback(() => {
    dispatch({ type: 'UNDO' });
  }, []);

  const redo = useCallback(() => {
    dispatch({ type: 'REDO' });
  }, []);

  const clearHistory = useCallback(() => {
    dispatch({ type: 'CLEAR_HISTORY' });
  }, []);

  const value = {
    ...state,
    loadProcesses,
    createProcess,
    updateProcess,
    deleteProcess,
    setCurrentProcess,
    setSelectedElement,
    addToHistory,
    undo,
    redo,
    clearHistory,
  };

  return (
    <ProcessContext.Provider value={value}>
      {children}
    </ProcessContext.Provider>
  );
};

export const useProcess = () => {
  const context = useContext(ProcessContext);
  if (!context) {
    throw new Error('useProcess must be used within a ProcessProvider');
  }
  return context;
}; 