import { useEffect, useRef, useState } from "react";
const  isObjectEqual  = (objA, objB) => {
  return JSON.stringify(objA) === JSON.stringify(objB);
}
const useFetch = (url, options) => {
   const [shouldLoad,setShouldLoad] = useState(false)
    const [result,setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const urlRef = useRef(url);
    const optionsRef = useRef(options);
    console.log("Meu Hook Funcion");
    
       
    useEffect(() => {
      
      let change = false;
      if(!isObjectEqual(url, urlRef.current)) {
      change = true;
        urlRef.current = url;
      }
       if(!isObjectEqual(options, optionsRef.current)) {
      change = true;
        optionsRef.current = options;
      }
      if(change) {
         
        setShouldLoad((s) => !s)
      
      }
      },
     [url, options])
    useEffect(() => {

     let  wait = false;
     const controller = new AbortController();
       var signal = controller.signal;
        console.log("EFECT", new Date().toLocaleString())
        setLoading(true);
    const fetchData = async () => {
      
      try {  const response = await fetch(urlRef.current, {signal, ...optionsRef.current});
        const jsonResult = await response.json();
       if(!wait) {
        setResult(jsonResult);
        setLoading(false);
       }
      }catch(e) {
       if(!wait) {
        
        setLoading(false);
       
       }
       console.warm(e);
      }

    }
    fetchData();
    return () =>{ 
      controller.abort();
      wait = true};
    }, [shouldLoad])
    return [result,loading]
}

export const   Home = () => {
  const [postId, setPostId] = useState("");  
 const [result, loading]   =  useFetch("https://jsonplaceholder.typicode.com/posts/" + postId, {
  method: 'GET',
  headers: {
abc: 1
  }
});

const handleClick = (postId) => {
  setPostId(postId);
}
   if(loading == true) {
    return <p>Carregando ....</p>
   }
  
   if(!loading && result) {
    console.log("aaaaaaaaaaaaaaaaaaaaaaa");
    console.log(result);
    if(result.length) {
    return <div>{result.map(p => <div key={p.id} onClick={() => handleClick(p.id)}><p >{p.title}</p></div>)}</div>
    }
    else {
      return <div onClick={() => handleClick("")}><p>{result.title}</p></div>
    }
   }
    
}