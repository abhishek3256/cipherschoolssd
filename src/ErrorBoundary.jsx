import React from 'react'

export default class ErrorBoundary extends React.Component{
  constructor(props){
    super(props)
    this.state={hasError:false,error:null}
  }
  static getDerivedStateFromError(error){
    return {hasError:true,error}
  }
  componentDidCatch(error,info){
    console.error('App error',error,info)
  }
  render(){
    if(this.state.hasError){
      return <div style={{padding:16,color:'#fff'}}>Error: {String(this.state.error)}</div>
    }
    return this.props.children
  }
}


