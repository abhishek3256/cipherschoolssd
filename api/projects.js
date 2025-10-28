import { connectDb, Project } from './_db.js'

export default async function handler(req, res){
  if(req.method==='GET'){
    await connectDb()
    const items = await Project.find().select('projectId name updatedAt').sort({updatedAt:-1}).limit(50)
    res.status(200).json(items)
    return
  }
  if(req.method==='POST'){
    await connectDb()
    const body=req.body
    const doc=await Project.findOneAndUpdate({projectId:body.projectId},{ $set:{ name: body.name||body.projectId, files: body.files, updatedAt: new Date() } },{ new:true, upsert:true })
    res.status(200).json({ok:true,id:doc.projectId})
    return
  }
  res.status(405).end()
}


