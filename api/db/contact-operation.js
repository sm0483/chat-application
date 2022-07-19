const contactModel=require('../models/contact');

const createContactDb=async(data)=>{
    const newContact=await contactModel.create(data);
    return newContact;

}

const deleteContactDbByUserId=async(data)=>{
    const {userId}=data;
    const deletedContact=await contactModel.findOneAndDelete({contact:{$in:userId}});
    console.log(deletedContact);
    return deletedContact;
}

const getContactDbByUserId=async(userId)=>{
    const getContact=await contactModel.find({contact:{$in:userId}});
    return getContact

}

const getContactDbByContactId=async(contactId)=>{
    const getContact=await contactModel.findOne({_id:contactId});
    return getContact;

}

module.exports={
    createContactDb,
    deleteContactDbByUserId,
    getContactDbByUserId,
    getContactDbByContactId
}

