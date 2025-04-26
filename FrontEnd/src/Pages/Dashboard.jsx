import React, { useEffect, useState } from "react";
import Women from "./../assets/Image/Women.jpg";
import file from "./../assets/Logo/file.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../Components/ui/card"
import EditProfileModel from "../Components/Common/EditProfileModel";
import { getRequestWithToken } from "../services/apiConnector";
import { profileEndpoints } from "../services/apis";
import { setUser, setNotifications } from "../slices/profileSlice";
import { Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";

const Dashboard = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    // take token from local storage
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }
        getProfile();
    }, [])

    // get profile
    const getProfile = async () => {
        setLoading(true);
        try {
            const response = await getRequestWithToken(profileEndpoints.GET_PROFILE_API);
            console.log(response);
            dispatch(setUser(response.data.user));
            dispatch(setNotifications(response.data.notifications));
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const { user } = useSelector((state) => state.profile);

    return (
        <div className="mt-24 left-0 right-0">
            {/* Main Section */}
            <div className="w-screen h-screen object-fill">
                <div className="absolute w-screen h-screen object-fill -z-10">
                    <img src={Women} className="opacity-40 w-screen h-screen object-fill"></img>
                </div>
                {
                    loading ? (
                        <div className="flex justify-center items-center h-screen">
                            <Loader2 className="w-10 h-10 animate-spin" />
                        </div>
                    ) : (
                        <Card className="w-[600px] mx-auto mt-8 bg-blue-100">
                            <CardHeader>
                                <CardTitle className="text-2xl font-semibold text-black">User Profile</CardTitle>
                                <CardDescription className="text-black">Your personal information</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <img
                                        src={user?.img || file}
                                        alt="Profile"
                                        className="w-20 h-20 rounded-full object-cover"
                                    />
                                    <div>
                                        <h3 className="text-xl font-semibold text-black">
                                            {user?.firstName} {user?.lastName}
                                        </h3>
                                        <p className="text-black">{user?.email}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="font-semibold text-black">Contact</p>
                                        <p className="text-black">{user?.contactNumber || "Not provided"}</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-black">Address</p>
                                        <p className="text-black">{user?.address || "Not provided"}</p>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-end">
                                <EditProfileModel />
                            </CardFooter>
                        </Card>
                    )
                }
            </div>


        </div>
    )
}

export default Dashboard;