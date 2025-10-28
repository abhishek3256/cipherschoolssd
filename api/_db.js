import mongoose from 'mongoose'

const uri = process.env.MONGODB_URI || ''

let cached = global._mongoose
if(!cached){
  cached = { conn: null, promise: null }
  global._mongoose = cached
}

export async function connectDb(){
  if(cached.conn) return cached.conn
  if(!cached.promise){
    cached.promise = mongoose.connect(uri).then(m=>m)
  }
  cached.conn = await cached.promise
  return cached.conn
}

const FileSchema = new mongoose.Schema({ path: String, content: String })
const ProjectSchema = new mongoose.Schema({ projectId: { type:String, unique:true }, name: String, files: [FileSchema], updatedAt: { type: Date, default: Date.now } })

export const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema)


