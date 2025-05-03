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
import { AlertCircle, Calendar, Loader2, MessageSquare, PlusCircleIcon, Users } from "lucide-react";
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

    const getNextPeriodDate = (lastPeriodDate) => {
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();

        // Assuming lastPeriodDate is the day of the month (e.g., 24, 28)
        const lastPeriodDateObj = new Date(currentYear, currentMonth, lastPeriodDate);

        // If the last period date is in the future (next month or in future days), don't add anything
        if (lastPeriodDateObj >= today) {
            return lastPeriodDateObj.toLocaleDateString('en-GB'); // Last period date is in the future, return it as is
        }

        // Otherwise, calculate the next expected period by adding 28 days
        const nextPeriodDate = new Date(lastPeriodDateObj);
        nextPeriodDate.setDate(nextPeriodDate.getDate() + 28);
        return nextPeriodDate.toLocaleDateString('en-GB');
    };

    const getDaysToNextPeriod = (lastPeriodDate) => {
        const today = new Date();  // This will be a Date object, not a string

        // Get the next period date as a string
        const nextPeriodString = getNextPeriodDate(lastPeriodDate);

        // Parse the string to create a Date object
        const nextPeriodDate = new Date(nextPeriodString.split('/').reverse().join('-'));

        // Calculate the difference in days
        const timeDiff = nextPeriodDate - today;
        const daysToNextPeriod = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

        return daysToNextPeriod;
    };


    const { user } = useSelector((state) => state.profile);

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 mt-12">
            {/* Background Image */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10" />
                <img
                    src={Women || "/placeholder.svg"}
                    className="w-full h-full object-cover opacity-15 mix-blend-overlay"
                    alt="Background"
                />
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                {loading ? (
                    <div className="flex justify-center items-center h-[80vh]">
                        <div className="flex flex-col items-center gap-4">
                            <Loader2 className="w-12 h-12 animate-spin text-purple-600" />
                            <p className="text-purple-700 font-medium">Loading your profile...</p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-8 pt-6 mx-4">
                        {/* Page Title */}
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-purple-800">Your Wellness Dashboard</h1>
                            <p className="text-purple-600 mt-2">Track, manage, and improve your health journey</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Profile Card - Takes full width on mobile, 1/3 on desktop */}
                            <Card className="lg:col-span-1 bg-white border-none shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300">
                                <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 pb-8 pt-6">
                                    <CardTitle className="text-white text-xl">User Profile</CardTitle>
                                </CardHeader>
                                <CardContent className="px-6 -mt-6">
                                    <div className="flex flex-col items-center">
                                        <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-lg -mt-12 bg-white">
                                            <img src={user?.img || file} alt="Profile" className="w-full h-full object-cover" />
                                        </div>
                                        <h3 className="text-xl font-bold mt-4 text-gray-800">
                                            {user?.firstName || "Jane"} {user?.lastName || "Doe"}
                                        </h3>

                                        <div className="w-full mt-6 space-y-4">
                                            <div className="bg-purple-50 p-3 rounded-lg">
                                                <p className="text-sm font-medium text-purple-700">Contact</p>
                                                <p className="text-gray-700">{user?.contactNumber || "Not provided"}</p>
                                            </div>
                                            <div className="bg-pink-50 p-3 rounded-lg">
                                                <p className="text-sm font-medium text-pink-700">Address</p>
                                                <p className="text-gray-700">{user?.address || "Not provided"}</p>
                                            </div>
                                            <div className="bg-purple-50 p-3 rounded-lg">
                                                <p className="text-sm font-medium text-purple-700">Last Period Date</p>
                                                <p className="text-gray-700">{user?.lastPeriodDate || "Not provided"}</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-center pb-6">
                                    {EditProfileModel ? (
                                        <EditProfileModel />
                                    ) : (
                                        <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                                            <Edit className="w-4 h-4 mr-2" /> Edit Profile
                                        </Button>
                                    )}
                                </CardFooter>
                            </Card>

                            {/* Feature Cards Grid - Takes full width on mobile, 2/3 on desktop */}
                            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Card 1 - Menstrual Cycle */}
                                <Card className="bg-white border-none shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group">
                                    <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 p-5">
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-white text-lg flex items-center">
                                                <Calendar className="w-5 h-5 mr-2 opacity-80" />
                                                Menstrual Cycle
                                            </CardTitle>
                                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                                                <Calendar
                                                    className="w-4 h-4 text-white cursor-pointer"
                                                    onClick={() => {
                                                        const dateString = getNextPeriodDate(user?.lastPeriodDate); // This returns a string in 'en-GB' format (DD/MM/YYYY)

                                                        // Convert the string to a Date object (DD/MM/YYYY -> MM/DD/YYYY)
                                                        const [day, month, year] = dateString.split('/'); // Split into day, month, year
                                                        const date = new Date(Date.UTC(year, month - 1, day)); // Create Date object in UTC, remember months are 0-indexed

                                                        if (date) {
                                                            // Start date at 00:00:00 (midnight) in UTC
                                                            const startDate = new Date(date);
                                                            startDate.setUTCHours(0, 0, 0, 0);

                                                            // End date at 23:59:59.999 (end of the day) in UTC
                                                            const endDate = new Date(date);
                                                            endDate.setUTCHours(23, 59, 59, 999);

                                                            // Helper function to format the date for Google Calendar
                                                            const formatDateForGoogleCalendar = (date) => {
                                                                return date.toISOString().replace(/-|:|\.\d+/g, '').slice(0, 15);  // Format to "YYYYMMDDTHHMMSSZ"
                                                            };

                                                            const formattedStartDate = formatDateForGoogleCalendar(startDate);
                                                            const formattedEndDate = formatDateForGoogleCalendar(endDate);

                                                            // Create the Google Calendar URL
                                                            const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Menstrual+Cycle+${user?.firstName}+Reminder&dates=${formattedStartDate}/${formattedEndDate}`;

                                                            // Open the Google Calendar URL in a new tab
                                                            window.open(googleCalendarUrl, '_blank');
                                                        } else {
                                                            console.log('Invalid or empty date returned from getNextPeriodDate');
                                                        }
                                                    }}

                                                />
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-5">
                                        {user?.lastPeriodDate ? (
                                            <div className="space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <p className="text-gray-600 text-sm">Last Period</p>
                                                    <p className="font-medium text-purple-700">
                                                        {getDaysToNextPeriod(user.lastPeriodDate)} days to go
                                                    </p>
                                                </div>
                                                <div className="h-2 bg-purple-100 rounded-full overflow-hidden">
                                                    <div className="h-2 bg-purple-100 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300"
                                                            style={{
                                                                width: `${Math.max(0, Math.min(100, ((28 - getDaysToNextPeriod(user.lastPeriodDate)) / 28) * 100))}%`
                                                            }}
                                                        ></div>
                                                    </div>
                                                </div>

                                                <p className="text-sm text-gray-600">
                                                    Next period expected on{" "}
                                                    <span className="font-medium text-purple-700">{getNextPeriodDate(user.lastPeriodDate)} (approx.)</span>
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center py-4">
                                                <p className="text-gray-500 mb-3">No period data available</p>
                                                <Button variant="outline" className="text-purple-600 border-purple-200 hover:bg-purple-50">
                                                    Add Period Data
                                                </Button>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>

                                {/* Card 2 - Register Complaint */}
                                <Card className="bg-white border-none shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group">
                                    <CardHeader className="bg-gradient-to-r from-pink-500 to-pink-600 p-5">
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-white text-lg flex items-center">
                                                <AlertCircle className="w-5 h-5 mr-2 opacity-80" />
                                                Register Complaint
                                            </CardTitle>
                                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                                                <AlertCircle className="w-4 h-4 text-white" />
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-5">
                                        <p className="text-gray-600 mb-4">
                                            If you have any concerns or issues, please feel free to register them here.
                                        </p>
                                        <button 
                                        onClick={() => {
                                            navigate("/complaints");
                                        }}
                                        className="w-full rounded-lg py-2 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700">
                                            Submit a Complaint
                                        </button>
                                    </CardContent>
                                </Card>

                                {/* Card 3 - AI Chatbot */}
                                <Card className="bg-white border-none shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group">
                                    <CardHeader className="bg-gradient-to-r from-purple-400 to-purple-500 p-5">
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-white text-lg flex items-center">
                                                <MessageSquare className="w-5 h-5 mr-2 opacity-80" />
                                                AI Chatbot
                                            </CardTitle>
                                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                                                <MessageSquare className="w-4 h-4 text-white" />
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-5">
                                        <div className="flex items-center space-x-3 mb-4">
                                            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                                                <MessageSquare className="w-4 h-4 text-purple-500" />
                                            </div>
                                            <div className="bg-purple-50 rounded-lg p-2 px-3">
                                                <p className="text-sm text-gray-700">How can I help you today?</p>
                                            </div>
                                        </div>
                                        <button className="w-full bg-gradient-to-r from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600 rounded-lg py-2"
                                            onClick={() => {
                                                navigate("/chatbot");
                                            }}
                                        >
                                            Chat with AI Assistant
                                        </button>
                                        {/* comming soon text  */}
                                        {/* <p className="text-gray-500 text-lg text-center my-4">Coming soon ...</p> */}
                                    </CardContent>
                                </Card>

                                {/* Card 4 - Discussion Forum */}
                                <Card className="bg-white border-none shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group">
                                    <CardHeader className="bg-gradient-to-r from-pink-400 to-pink-500 p-5">
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-white text-lg flex items-center">
                                                <Users className="w-5 h-5 mr-2 opacity-80" />
                                                Discussion Forum
                                            </CardTitle>
                                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                                                <Users className="w-4 h-4 text-white" />
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-5">
                                        <div className="space-y-3 mb-4">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-xs font-medium text-purple-600">
                                                    M
                                                </div>
                                                <p className="text-sm text-gray-700">
                                                    Active users: <span className="font-medium">24</span>
                                                </p>
                                            </div>
                                        </div>
                                        <button className="w-full bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 rounded-lg py-2">
                                            Join Discussion
                                        </button>
                                        {/* comming soon text  */}
                                        <p className="text-gray-500 text-lg text-center my-4">Coming soon ...</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Dashboard;