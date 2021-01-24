import  { useState, useEffect, useRef } from "react";

export const useForm = (initialVal) => {
    const [formValid,setFormValid] = useState(false);
    const ref = useRef({});
  
    useEffect(()=>{
      const formArr = initialVal || [];
      ref.current = formArr.reduce(function(acc, val){
        if(!acc[val]){
          acc[val] = {hasError: true, value:''}
        }
        return acc;
      },{})
    },[])
    
    const setFormValidHandler = (val)=>{  
      const inpt = ref.current[val.id];
      if(inpt){
        ref.current[val.id]['hasError']= val['hasError']
        ref.current[val.id]['value']= val['value']
      }
  
      let valid = true;
      for(let key in ref.current){
        valid = valid && !ref.current[key]['hasError'];
      }
  
      setFormValid(prevState=>{
        if(prevState===valid){
          return prevState;
        }
        return valid;
      });
  
    }
    const getFormValues = () =>{
      return ref.current;
    }
  
    return {
      formValid,
      setFormValidHandler,
      getFormValues
    }
  }