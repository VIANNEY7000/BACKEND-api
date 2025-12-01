import corhortFoure from '../model/user.js'
import bcrypt, { truncates } from 'bcryptjs'
import  jwt  from 'jsonwebtoken'




// REGISTER USER
export const creatStudents = async (req, res) => {
    const {name, email, phoneNumber, password, country, state } = req.body

  try {
      // check if email exists
    const exist = await corhortFoure.findOne({email})
    if (exist) return res.status(400).json ({message:"Email already exist"})

        // HASH PASSWORD
        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(password, salt)
   
    // creat user
         const students = await corhortFoure.create({
            name,
            email,
            phoneNumber,
            password: hashpassword,
            country,
            state,
    })
    return res.status(201).json({
        message:"Registeration successful", students
    })
}catch (error) {
    console.error(error)
    res.status(500).json({message:"server Error", error})
}
    }




// GET ALL USERS
export const getAllStudents = async(req, res) => {
    try {
        let students = await corhortFoure.find().select('-password')
        res.status(200).json(students)

    } catch (error) {
        res.status(500).json({message:"server Error", error})
    }
}




// LOG IN
export const loginUser = async (req, res) =>{
    // Creat payload
    const {email, password} = req.body

    try {
        // check if email exist
        const user = await corhortFoure.findOne({email})
        if (!user) return res.status(404).json({message:"Emal Not Registered"})

        //compare password
        const isMatch = await bcrypt.compare(password,user.password)
        if (!isMatch) return res.status(400).json({message:"Passward Already Exist"}) 

       const token = jwt.sign({id:user._id}, process.env.SECREAT_KEY, {expiresIn:'1hr'})
       res.status(200).json({message:"Login Successful", token,
        user:{
            id:user._id,
            name:user.name,
            email:user.email,
            phoneNumber:user.phoneNumber
        }
           })   

    } catch (error) {
        res.status(500).json({message:error.message})
    }
}




// GET USER BY ID
export const getUserById = async (req, res) => {
    const userId = req.params.id 

    try {
        const user = await corhortFoure.findById(userId).select('-password')
        if(!user) return res.status(404).json({message:"User Not Found"})
            res.status(200).json(user)

    } catch (error) {
        res.status(500).json({message:error.message})
    }
}



// UPDATE USER

export const updateUser = async (req, res) => {
    let userId= req.params.id
    const { name, email, phoneNumber, password, country, state } = res.body

    try {
        let user = corhortFoure.findById(userId)
        if(!user) return res.status(404).json({message:"User Not Found"})

        // update only provided fileds
        user.name = name || user.name
        user.email = email || user.email
        user.phoneNumber = phoneNumber || user.phoneNumber
        user.password = password || user.password
        user.country = country || user.country
        user.state = state || user.state
        await user.save()

        // succes message
        res.status(200).json({message:"user successfilly updated", user:{
            id: user._id,
            names : user.name,
            email : user.email,
            phoneNumber : user.phoneNumber,
            password : user.password,
            country : user.country,
            state : user.state
        }
    })

    } catch (error) {
        res.status(500).json({message:error.message})
    }
}


// DELET USER

export const deleteUser = async (req, res) => {
    const userId = req.params.id
    try {

        const user = await corhortFoure.findById(userId)
        if (!user) return res.status(404).json({message:"User Dosenot Exist"})
        await user.deleteOne()
        res.status(200).json({message:"User Deleted Successfilly"})

    } catch (error) {
        res.status(500).json({message:error.message})
    }

}