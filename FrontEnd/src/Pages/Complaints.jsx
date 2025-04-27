"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { AlertCircle, Clock, FileText, Filter, Loader2, Send } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../Components/ui/card"
import { Input } from "../Components/ui/input"
import { Label } from "../Components/ui/label"
import { Textarea } from "../Components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../Components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../Components/ui/dialog"
import { Badge } from "../Components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../Components/ui/tabs"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { postRequestWithToken, getRequestWithToken } from "../services/apiConnector"
import { complaintsEndpoints } from "../services/apis"
import { toast } from "react-hot-toast"
import { setComplaints } from "../slices/profileSlice";
import { useSelector } from "react-redux";

const defaultCategories = [
    "abuse",
    "harassment",
    "discrimination",
    "stalking",
    "cyberbullying",
    "domestic_violence",
    "workplace_harassment",
    "sexual_harassment",
    "eve_teasing",
    "unsafe_environment",
    "transportation_safety",
    "online_safety",
    "other"
];

export default function RegisterComplaint() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const getComplaints = async () => {
    try {
      const response = await getRequestWithToken(complaintsEndpoints.GET_COMPLAINTS_API)
      console.log("Response -->", response)
      dispatch(setComplaints(response.data.complaints))
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    if(token){
      getComplaints()
    } else {
      navigate("/login")
    }
  }, [])

  const format = (date) => {    
    const _date = new Date(date)
    return _date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }
  // Form state
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  const [formData, setFormData] = useState({
    title: "",
    category: "other",
    priority: "medium",
    description: "",
  })
  
  const [formSuccess, setFormSuccess] = useState(false)

  // Complaints list state
  const { complaints } = useSelector((state) => state.profile)
  console.log("Complaints -->", complaints)

  // Filter state
  const [filterStatus, setFilterStatus] = useState("all")
  const filteredComplaints =
  filterStatus === "all" ? complaints : complaints.filter((complaint) => complaint.status === filterStatus)
  // Dialog state for complaint details
  const [selectedComplaint, setSelectedComplaint] = useState(null)
  const [detailsOpen, setDetailsOpen] = useState(false)


  // Handle form submission
  const onSubmit = async () => {
    try {
        if(formData.title === "" || formData.description === "" || formData.category === "" || formData.priority === ""){
            toast.error("Please fill all the fields")
            return
        }
        const newComplaint = {
            title: formData.title,
            description: formData.description,
            category: formData.category,
            priority: formData.priority,
        }
        console.log(newComplaint)
        const response = await postRequestWithToken(complaintsEndpoints.CREATE_COMPLAINT_API, newComplaint)
        setFormSuccess(true)
        console.log(response)
        dispatch(setComplaints([response.data.complaint, ...complaints]))
    } catch (error) {
        let errorMessage = error.response?.data?.message || "Failed to submit complaint"
        toast.error(errorMessage)
    }finally{
        setTimeout(() => setFormSuccess(false), 3000)
    }
  }

  // Get status badge color
  const getStatusColor = (status) => {
    // pending", "resolved", "rejected"
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
      case "resolved":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "rejected":
        return "bg-red-100 text-red-800 hover:bg-red-200"
    }
  }

  // Get priority badge color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "low":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "high":
        return "bg-red-100 text-red-800"
    }
  }

  // Get category badge color
  const getCategoryColor = (category) => {
    switch (category) {
      case "medical":
        return "bg-purple-100 text-purple-800"
      case "technical":
        return "bg-blue-100 text-blue-800"
      case "billing":
        return "bg-orange-100 text-orange-800"
      case "other":
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 py-8 mx-4">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-purple-800">Register Complaint</h1>
          <p className="text-purple-600 mt-2">Submit your concerns and track their status</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Complaint Form */}
          <div>
            <Card className="border-none shadow-lg rounded-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500">
                <CardTitle className="text-white flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Submit a New Complaint
                </CardTitle>
                <CardDescription className="text-white/80">Please provide details about your concern</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {formSuccess ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
                    <div className="bg-green-100 rounded-full p-1 mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-green-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-green-800 font-medium">Complaint Submitted Successfully</h4>
                      <p className="text-green-700 text-sm mt-1">
                        Your complaint has been registered and will be reviewed shortly.
                      </p>
                    </div>
                  </div>
                ) : (
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">
                        Complaint Title <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="title"
                        value={formData.title}
                        placeholder="Brief title of your complaint"
                        className={errors.title ? "border-red-300 focus-visible:ring-red-500" : ""}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      />
                      {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">
                          Category <span className="text-red-500">*</span>
                        </Label>
                        <Select 
                          defaultValue={formData.category}
                          onValueChange={(value) => setFormData({ ...formData, category: value })}
                        >
                          <SelectTrigger
                            id="category"
                            className={errors.category ? "border-red-300 focus-visible:ring-red-500" : ""}
                          >
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {defaultCategories.map((category) => (
                              <SelectItem key={category} value={category}>{
                                category.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
                              }</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="priority">
                          Priority <span className="text-red-500">*</span>
                        </Label>
                        <Select 
                          defaultValue={formData.priority}
                          onValueChange={(value) => setFormData({ ...formData, priority: value })}
                        >
                          <SelectTrigger
                            id="priority"
                            className={errors.priority ? "border-red-300 focus-visible:ring-red-500" : ""}
                          >
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.priority && <p className="text-red-500 text-sm">{errors.priority.message}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">
                        Description <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        placeholder="Please provide detailed information about your complaint"
                        rows={5}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className={errors.description ? "border-red-300 focus-visible:ring-red-500" : ""}
                      />
                      {errors.description && (
                        <p className="text-red-500 text-sm">{errors.description.message}</p>
                      )}
                    </div>

                    <div className="flex justify-end w-full">
                    <button
                      className="w-fit bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 flex items-center justify-center py-2 rounded-lg px-4"
                      disabled={isSubmitting}
                      onClick={handleSubmit(onSubmit)}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Submit Complaint
                        </>
                      )}
                    </button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Complaints History */}
          <div>
            <Card className="border-none shadow-lg rounded-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-400 to-purple-500">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-white flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      Your Complaints
                    </CardTitle>
                    <CardDescription className="text-white/80">
                      Track and manage your submitted complaints
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select value={filterStatus} onValueChange={(value) => setFilterStatus(value)}>
                      <SelectTrigger className="w-[130px] bg-white/10 border-0 text-white focus:ring-offset-0">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Filter" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative">
                  <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-white to-transparent pointer-events-none z-10"></div>
                  <div className="max-h-[500px] overflow-y-auto p-4">
                    {filteredComplaints.length > 0 ? (
                      <div className="space-y-4">
                        {filteredComplaints.map((complaint) => (
                          <div
                            key={complaint.id}
                            className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                            onClick={() => {
                              setSelectedComplaint(complaint)
                              setDetailsOpen(true)
                            }}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-medium text-gray-900 line-clamp-1">{complaint.title}</h3>
                              <Badge className={`${getStatusColor(complaint.status)} ml-2`}>
                                {complaint.status.replace("-", " ")}
                              </Badge>
                            </div>

                            <p className="text-gray-600 text-sm line-clamp-2 mb-3">{complaint.description}</p>

                            <div className="flex flex-wrap gap-2 mb-2">
                              <Badge variant="outline" className={getCategoryColor(complaint.category)}>
                                {complaint.category.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                              </Badge>
                              <Badge variant="outline" className={getPriorityColor(complaint.priority)}>
                                {complaint.priority} priority
                              </Badge>
                            </div>

                            <div className="flex items-center text-xs text-gray-500">
                              <Clock className="w-3 h-3 mr-1" />
                              {format(complaint.createdAt, "MMM d, yyyy")}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12">
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                          <FileText className="w-8 h-8 text-purple-500" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">No complaints found</h3>
                        <p className="text-gray-500 text-center max-w-xs">
                          {filterStatus === "all"
                            ? "You haven't submitted any complaints yet."
                            : `You don't have any ${filterStatus.replace("-", " ")} complaints.`}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 p-4 flex justify-between">
                <div className="text-sm text-gray-500">
                  Showing {filteredComplaints.length} of {complaints.length} complaints
                </div>
                <button variant="outline" size="sm" className="text-purple-600 border-purple-200 hover:bg-purple-50">
                  View All
                </button>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Complaint Details Dialog */}
        <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
          <DialogContent className="max-w-2xl">
            {selectedComplaint && (
              <>
                <DialogHeader>
                  <div className="flex justify-between items-center">
                    <DialogTitle className="text-xl">{selectedComplaint.title}</DialogTitle>
                    <Badge className={getStatusColor(selectedComplaint.status)}>
                      {selectedComplaint.status.replace("-", " ")}
                    </Badge>
                  </div>
                  <DialogDescription className="text-gray-500 flex flex-col gap-2 justify-between">
                    <span>Complaint ID: #{selectedComplaint.complaintId}</span>
                    <span>Submitted on: {format(selectedComplaint.createdAt, "MMMM d, yyyy")}</span>
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                  <div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Badge variant="outline" className={getCategoryColor(selectedComplaint.category)}>
                        {selectedComplaint.category.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                      </Badge>
                      <Badge variant="outline" className={getPriorityColor(selectedComplaint.priority)}>
                        {selectedComplaint.priority} priority
                      </Badge>
                    </div>
                  </div>

                  <Tabs defaultValue="details">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="details">Complaint Details</TabsTrigger>
                      <TabsTrigger value="response">Response & Updates</TabsTrigger>
                    </TabsList>
                    <TabsContent value="details" className="p-4 bg-gray-50 rounded-md mt-2">
                      <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                      <p className="text-gray-700 whitespace-pre-line">{selectedComplaint.description}</p>
                    </TabsContent>
                    <TabsContent value="response" className="p-4 bg-gray-50 rounded-md mt-2">
                      {selectedComplaint.response ? (
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Official Response</h4>
                          <div className="bg-white p-3 rounded border border-gray-200">
                            <p className="text-gray-700">{selectedComplaint.response}</p>
                            <div className="mt-2 pt-2 border-t border-gray-100 text-xs text-gray-500">
                              Response provided on {format(selectedComplaint.updatedAt, "MMMM d, yyyy")}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-6">
                          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-3">
                            <Clock className="w-6 h-6 text-yellow-600" />
                          </div>
                          <h4 className="font-medium text-gray-900 mb-1">Awaiting Response</h4>
                          <p className="text-gray-500 text-center text-sm">
                            We're reviewing your complaint and will respond soon.
                          </p>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
