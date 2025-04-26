import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog"
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { Input } from "../ui/input";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postRequestWithToken } from "../../services/apiConnector";
import { setUser, setNotifications } from "../../slices/profileSlice";
import { profileEndpoints } from "../../services/apis";
  

const  EditProfileModel = () => {
    const {user} = useSelector((state) => state.profile);
    const [formData, setFormData] = useState({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        contactNumber: user?.contactNumber || "",
        address: user?.address || "",
        lastPeriodDate: user?.lastPeriodDate || "",
    })

    const [error, setError] = useState("");

    useEffect(() => {
        setFormData({
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            contactNumber: user?.contactNumber || "",
            address: user?.address || "",
            lastPeriodDate: user?.lastPeriodDate || "",
        })
    }, [user])

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validate = () => {
        if(formData.firstName === "" || formData.lastName === ""){
            setError("Please enter your first name and last name");
            return false;
        }
        if(formData.contactNumber === ""){
            setError("Please enter your contact number");
            return false;
        }
        if(formData.lastPeriodDate && formData.lastPeriodDate < 1 || formData.lastPeriodDate > 31){
            setError("Please enter a valid last period date");
            return false;
        }
        return true;  
    }

    const handleSubmit = async(e) => {
        try {
            e.preventDefault();
            if(!validate()){
                toast.error(error);
                return;
            }
            
            const response = await postRequestWithToken(profileEndpoints.UPDATE_PROFILE_API, formData);
            console.log(response);
            dispatch(setUser(response.data.user));
            dispatch(setNotifications(response.data.notifications));
            toast.success("Profile updated successfully");
        } catch (error) {
            console.log(error);
            let message = error?.response?.data?.message || "Something went wrong";
            toast.error(message);
        }
    }
    return (
        <Dialog>
            <DialogTrigger className="border border-blue-500 text-blue-500 px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white transition-all duration-300">Edit Profile</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle> 
                </DialogHeader>
                <DialogDescription>
            </DialogDescription>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            <label>First Name</label>
                            <Input type="text" className="border border-gray-500 rounded-md" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label>Last Name</label>
                            <Input type="text" className="border border-gray-500 rounded-md" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label>Mobile Number</label>
                            <Input type="text" disabled className="border border-gray-500 rounded-md" value={formData.contactNumber} onChange={(e) => setFormData({...formData, contactNumber: e.target.value})} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label>Address</label>
                            <Input type="text" className="border border-gray-500 rounded-md" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label>Set Your Last Period Date</label>
                            <Input type="number" className="border border-gray-500 rounded-md" value={formData.lastPeriodDate} onChange={(e) => setFormData({...formData, lastPeriodDate: e.target.value})} />
                        </div>
                        

                        <div className="flex justify-end gap-2">
                            <DialogClose asChild>
                                <button className="border border-red-500 text-red-500 px-4 py-2 rounded-md">Cancel</button>
                            </DialogClose>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-md" type="submit">Save</button>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default EditProfileModel;
