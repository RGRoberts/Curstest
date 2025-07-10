import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { produce } from 'immer';
import toast from 'react-hot-toast';

const PolicyContext = createContext();

const initialState = {
  policies: [],
  rules: [],
  currentPolicy: null,
  currentRule: null,
  complianceMatrix: [],
  wasteAnalysis: [],
  isLoading: false,
  error: null,
};

const policyReducer = (state, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case 'SET_LOADING':
        draft.isLoading = action.payload;
        break;
      
      case 'SET_ERROR':
        draft.error = action.payload;
        break;
      
      case 'SET_POLICIES':
        draft.policies = action.payload;
        break;
      
      case 'SET_RULES':
        draft.rules = action.payload;
        break;
      
      case 'SET_CURRENT_POLICY':
        draft.currentPolicy = action.payload;
        break;
      
      case 'SET_CURRENT_RULE':
        draft.currentRule = action.payload;
        break;
      
      case 'ADD_POLICY':
        draft.policies.push(action.payload);
        break;
      
      case 'UPDATE_POLICY':
        const policyIndex = draft.policies.findIndex(p => p.id === action.payload.id);
        if (policyIndex !== -1) {
          draft.policies[policyIndex] = { ...draft.policies[policyIndex], ...action.payload };
        }
        if (draft.currentPolicy?.id === action.payload.id) {
          draft.currentPolicy = { ...draft.currentPolicy, ...action.payload };
        }
        break;
      
      case 'DELETE_POLICY':
        draft.policies = draft.policies.filter(p => p.id !== action.payload);
        if (draft.currentPolicy?.id === action.payload) {
          draft.currentPolicy = null;
        }
        break;
      
      case 'ADD_RULE':
        draft.rules.push(action.payload);
        break;
      
      case 'UPDATE_RULE':
        const ruleIndex = draft.rules.findIndex(r => r.id === action.payload.id);
        if (ruleIndex !== -1) {
          draft.rules[ruleIndex] = { ...draft.rules[ruleIndex], ...action.payload };
        }
        if (draft.currentRule?.id === action.payload.id) {
          draft.currentRule = { ...draft.currentRule, ...action.payload };
        }
        break;
      
      case 'DELETE_RULE':
        draft.rules = draft.rules.filter(r => r.id !== action.payload);
        if (draft.currentRule?.id === action.payload) {
          draft.currentRule = null;
        }
        break;
      
      case 'SET_COMPLIANCE_MATRIX':
        draft.complianceMatrix = action.payload;
        break;
      
      case 'SET_WASTE_ANALYSIS':
        draft.wasteAnalysis = action.payload;
        break;
      
      case 'UPDATE_COMPLIANCE_MATRIX':
        const matrixIndex = draft.complianceMatrix.findIndex(m => m.id === action.payload.id);
        if (matrixIndex !== -1) {
          draft.complianceMatrix[matrixIndex] = { ...draft.complianceMatrix[matrixIndex], ...action.payload };
        }
        break;
      
      case 'UPDATE_WASTE_ANALYSIS':
        const wasteIndex = draft.wasteAnalysis.findIndex(w => w.id === action.payload.id);
        if (wasteIndex !== -1) {
          draft.wasteAnalysis[wasteIndex] = { ...draft.wasteAnalysis[wasteIndex], ...action.payload };
        }
        break;
      
      default:
        break;
    }
  });
};

export const PolicyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(policyReducer, initialState);

  const setLoading = useCallback((loading) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  }, []);

  const setError = useCallback((error) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  }, []);

  const loadPolicies = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/policies', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (response.ok) {
        const policies = await response.json();
        dispatch({ type: 'SET_POLICIES', payload: policies });
      } else {
        throw new Error('Failed to load policies');
      }
    } catch (error) {
      setError(error.message);
      toast.error('Failed to load policies');
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError]);

  const loadRules = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/rules', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (response.ok) {
        const rules = await response.json();
        dispatch({ type: 'SET_RULES', payload: rules });
      } else {
        throw new Error('Failed to load rules');
      }
    } catch (error) {
      setError(error.message);
      toast.error('Failed to load rules');
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError]);

  const createPolicy = useCallback(async (policyData) => {
    setLoading(true);
    try {
      const response = await fetch('/api/policies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(policyData),
      });
      
      if (response.ok) {
        const newPolicy = await response.json();
        dispatch({ type: 'ADD_POLICY', payload: newPolicy });
        toast.success('Policy created successfully');
        return newPolicy;
      } else {
        throw new Error('Failed to create policy');
      }
    } catch (error) {
      setError(error.message);
      toast.error('Failed to create policy');
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError]);

  const updatePolicy = useCallback(async (policyId, updates) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/policies/${policyId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(updates),
      });
      
      if (response.ok) {
        const updatedPolicy = await response.json();
        dispatch({ type: 'UPDATE_POLICY', payload: updatedPolicy });
        toast.success('Policy updated successfully');
        return updatedPolicy;
      } else {
        throw new Error('Failed to update policy');
      }
    } catch (error) {
      setError(error.message);
      toast.error('Failed to update policy');
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError]);

  const deletePolicy = useCallback(async (policyId) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/policies/${policyId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (response.ok) {
        dispatch({ type: 'DELETE_POLICY', payload: policyId });
        toast.success('Policy deleted successfully');
      } else {
        throw new Error('Failed to delete policy');
      }
    } catch (error) {
      setError(error.message);
      toast.error('Failed to delete policy');
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError]);

  const createRule = useCallback(async (ruleData) => {
    setLoading(true);
    try {
      const response = await fetch('/api/rules', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(ruleData),
      });
      
      if (response.ok) {
        const newRule = await response.json();
        dispatch({ type: 'ADD_RULE', payload: newRule });
        toast.success('Rule created successfully');
        return newRule;
      } else {
        throw new Error('Failed to create rule');
      }
    } catch (error) {
      setError(error.message);
      toast.error('Failed to create rule');
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError]);

  const updateRule = useCallback(async (ruleId, updates) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/rules/${ruleId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(updates),
      });
      
      if (response.ok) {
        const updatedRule = await response.json();
        dispatch({ type: 'UPDATE_RULE', payload: updatedRule });
        toast.success('Rule updated successfully');
        return updatedRule;
      } else {
        throw new Error('Failed to update rule');
      }
    } catch (error) {
      setError(error.message);
      toast.error('Failed to update rule');
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError]);

  const deleteRule = useCallback(async (ruleId) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/rules/${ruleId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (response.ok) {
        dispatch({ type: 'DELETE_RULE', payload: ruleId });
        toast.success('Rule deleted successfully');
      } else {
        throw new Error('Failed to delete rule');
      }
    } catch (error) {
      setError(error.message);
      toast.error('Failed to delete rule');
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError]);

  const analyzeCompliance = useCallback(async (processId, policyIds) => {
    setLoading(true);
    try {
      const response = await fetch('/api/compliance/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ processId, policyIds }),
      });
      
      if (response.ok) {
        const analysis = await response.json();
        dispatch({ type: 'SET_COMPLIANCE_MATRIX', payload: analysis.complianceMatrix });
        dispatch({ type: 'SET_WASTE_ANALYSIS', payload: analysis.wasteAnalysis });
        toast.success('Compliance analysis completed');
        return analysis;
      } else {
        throw new Error('Failed to analyze compliance');
      }
    } catch (error) {
      setError(error.message);
      toast.error('Failed to analyze compliance');
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError]);

  const setCurrentPolicy = useCallback((policy) => {
    dispatch({ type: 'SET_CURRENT_POLICY', payload: policy });
  }, []);

  const setCurrentRule = useCallback((rule) => {
    dispatch({ type: 'SET_CURRENT_RULE', payload: rule });
  }, []);

  const value = {
    ...state,
    loadPolicies,
    loadRules,
    createPolicy,
    updatePolicy,
    deletePolicy,
    createRule,
    updateRule,
    deleteRule,
    analyzeCompliance,
    setCurrentPolicy,
    setCurrentRule,
  };

  return (
    <PolicyContext.Provider value={value}>
      {children}
    </PolicyContext.Provider>
  );
};

export const usePolicy = () => {
  const context = useContext(PolicyContext);
  if (!context) {
    throw new Error('usePolicy must be used within a PolicyProvider');
  }
  return context;
}; 