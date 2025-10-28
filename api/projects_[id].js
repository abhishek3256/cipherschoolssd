import { connectDb, Project } from './_db.js'

export default async function handler(req,res){
  if(req.method==='GET'){
    await connectDb()
    const { id } = req.query
    const doc = await Project.findOne({ projectId:id })
    if(!doc){
      res.status(200).json({ projectId:id, name:id, files: [] })
      return
    }
    res.status(200).json({ projectId:doc.projectId, name:doc.name, files:doc.files })
    return
  }
  res.status(405).end()
}


