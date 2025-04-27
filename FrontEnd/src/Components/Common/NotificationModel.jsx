import { postRequestWithToken } from "../../services/apiConnector";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../ui/dialog";
import { setNotifications } from "../../slices/profileSlice";
import { useDispatch } from "react-redux";
import { profileEndpoints } from "../../services/apis";

const NotificationModel = ({notification}) => {
    const dispatch = useDispatch();

    const markAsRead = async () => {
        try {
            const res = await postRequestWithToken(profileEndpoints.MARK_AS_READ_API, {notificationId: notification._id});
            console.log(res);
            dispatch(setNotifications(res.data.notifications));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Dialog>
            <DialogTrigger className="w-full text-left p-2 hover:bg-blue-50 rounded-lg transition-all duration-300 flex items-center gap-3 border-b border-gray-200">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-blue-900 font-medium">{notification?.title}</span>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className="space-y-4">
                    <DialogTitle className="text-xl font-semibold text-blue-900 flex justify-between items-center">
                        {notification?.title}
                        <span className="text-gray-600 text-sm mr-5">
                            Days: {notification?.daysRemaining}
                        </span>
                    </DialogTitle>
                    <DialogDescription className="text-gray-600 leading-relaxed">
                        {notification?.description}
                    </DialogDescription>
                </DialogHeader>
                <div dangerouslySetInnerHTML={{ __html: notification?.content }} />
                <DialogFooter className="mt-6">
                    <button onClick={markAsRead} className="bg-blue-500 text-white px-6 py-2.5 rounded-lg hover:bg-blue-600 transition-all duration-300 font-medium shadow-sm hover:shadow-md">
                        Mark as read
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default NotificationModel;
