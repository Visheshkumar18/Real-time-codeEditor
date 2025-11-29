import React, { useEffect } from 'react'
import Codemirror from "codemirror"
import 'codemirror/lib/codemirror.css'
import "codemirror/theme/monokai.css";
import 'codemirror/mode/javascript/javascript'
import "codemirror/mode/clike/clike"; //for c++,c,java   
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/edit/closebrackets'    

const CodeEditor = () => {
    useEffect(()=>{
        async function init(){
            Codemirror.fromTextArea(document.getElementById('realtimeEditor'),{
                mode:{name:'javascript',json:true},
                theme: "monokai",
                autoCloseTags:true,
                autoCloseBrackets:true,
                lineNumbers:true,
                viewportMargin:Infinity,
            })
        }
        init();
    },[])
  return (
    <div className='w-full h-screen'>
      <textarea id='realtimeEditor'>

    </textarea>
    </div>
  )
}

export default CodeEditor