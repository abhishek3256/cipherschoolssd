import { useEffect, useMemo, useState } from 'react'
import { Sandpack } from '@codesandbox/sandpack-react'

const starter = [
  { path: '/package.json', content: JSON.stringify({ name: 'app', dependencies: { react: '18.3.1', 'react-dom': '18.3.1' }, main: 'index.js' }, null, 2) },
  { path: '/index.js', content: "import React from 'react';import { createRoot } from 'react-dom/client';import App from './src/App';createRoot(document.getElementById('root')).render(React.createElement(App));" },
  { path: '/public/index.html', content: '<div id="root"></div>' },
  { path: '/src/App.js', content: "export default function App(){return <div style={{padding:20}}>Hello CipherStudio</div>}" }
]

export default function App(){
  const [projectId,setProjectId]=useState('')
  const [files,setFiles]=useState(starter)
  const [active,setActive]=useState(starter[3].path)

  useEffect(()=>{
    const params=new URLSearchParams(window.location.search)
    const id=params.get('id')||import.meta.env.VITE_DEFAULT_PROJECT_ID||'demo'
    setProjectId(id)
    fetch(`/api/projects/${id}`).then(r=>r.json()).then(d=>{
      if(d&&d.files&&d.files.length){
        setFiles(d.files)
        setActive(d.files[0].path)
      }
    }).catch(()=>{})
  },[])

  const sandFiles=useMemo(()=>{
    const m={}
    files.forEach(f=>m[f.path]=f.content)
    return m
  },[files])

  function addFile(){
    const p=prompt('File path','/src/New.js')||''
    if(!p) return
    setFiles(v=>[...v,{path:p,content:''}])
    setActive(p)
  }

  function removeFile(p){
    setFiles(v=>v.filter(f=>f.path!==p))
    if(active===p&&files.length>1) setActive(files[0].path)
  }

  function save(){
    const body={projectId,name:projectId,files}
    fetch('/api/projects',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})
  }

  function update(content){
    setFiles(v=>v.map(f=>f.path===active?{...f,content}:f))
  }

  return (
    <div className="container">
      <div className="header">
        <div className="row"><div className="title">CipherStudio</div><div className="muted">Project {projectId}</div></div>
        <div className="row">
          <input placeholder="project id" value={projectId} onChange={e=>setProjectId(e.target.value)} />
          <button onClick={save}>Save</button>
          <button onClick={addFile}>Add File</button>
        </div>
      </div>
      <div className="main">
        <div className="panel files">
          {files.map(f=> (
            <div key={f.path} className={"file "+(f.path===active?'active':'')} onClick={()=>setActive(f.path)}>
              <div className="row" style={{justifyContent:'space-between'}}>
                <span>{f.path}</span>
                <button onClick={(e)=>{e.stopPropagation();removeFile(f.path)}}>X</button>
              </div>
            </div>
          ))}
        </div>
        <div className="panel" style={{padding:8}}>
          <textarea value={files.find(f=>f.path===active)?.content||''} onChange={e=>update(e.target.value)} style={{width:'100%',height:'100%',border:'0',outline:'none',background:'transparent',color:'inherit',fontFamily:'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas'}} />
        </div>
        <div className="panel">
          <Sandpack template="react" files={sandFiles} options={{ autorun:true, recompileMode:'delayed' }} />
        </div>
      </div>
    </div>
  )
}


