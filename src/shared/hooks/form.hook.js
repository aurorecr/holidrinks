import { useCallback, useReducer } from 'react';

const formReducer = (state, action) => {
    switch (action.type) {
      case 'INPUT_CHANGE':
        let formIsValid = true;
        for (const inputId in state.inputs) {
          //thoses state are input property, so here I go through all the input stored there using for in loop as it's an object
          if(!state.inputs[inputId]){
            continue;
            //continue
          }
          if (inputId === action.inputId) {
            formIsValid = formIsValid && action.isValid;
            //formIsValid is the previous value that I combine with the new validity "action.isValid"
          } else {
            formIsValid = formIsValid && state.inputs[inputId].isValid;
          }
        }
        return {
          ...state,
          inputs: {
            ...state.inputs,
            [action.inputId]: { value: action.value, isValid: action.isValid }
            // this update one of the field in the input "state.inputs"
          },
          isValid: formIsValid
        };
        case 'SET_DATA':
      return {
        inputs: action.inputs,
        isValid: action.formIsValid
      };
      default:
        return state;
    }
  };

  
export const useForm = (initialInputs, initialFormValidity) => {
    //so it's set form outside when I use this Hook
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity
    // added here so it's not hard coded
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: 'INPUT_CHANGE',
      value: value,
      isValid: isValid,
      inputId: id
    });
  }, []);

  const setFormData = useCallback((inputData, formValidity) => {
    dispatch({
      type: 'SET_DATA',
      inputs: inputData,
      formIsValid: formValidity
    });
  }, []);

  return [formState, inputHandler, setFormData]; 
};