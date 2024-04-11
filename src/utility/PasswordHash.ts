import bcrypt from 'bcrypt'

 const PwdHash = async (password : string) => {
  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(password, salt)

  return hashPassword
}

const PwdCompare = async (password : string, hash : string) : Promise<boolean> =>{
       const match = await bcrypt.compare(password, hash)
       return match
}

export {PwdHash,PwdCompare}