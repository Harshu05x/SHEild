import React from 'react';
import { useComplaint } from '../contextApi/complaintContextApi.jsx';
import { useParams } from 'react-router-dom';

function ComplaintDescriptionPage() {
    const {complaints , setComplaints} = useComplaint()
    const {id} = useParams()
    // console.log(id);
    const complaint = complaints.find((comp) => comp._id === id);
    console.log(complaints);
    
    
    return (
        <div className='w-full min-h-screen m-2 py-0'> 
            <h1 className=" font-bold mb-4 mt-0">Complaint Details</h1> 
            <div className='w-full'> 
                <div className='p-2 border text-left  border-gray-300'>
                    <span className='font-bold text-xl'>Title</span>
                    {/* <span>{complaint.Title}</span> */}
                </div>
                <div className='p-2 border text-left  border-gray-300'>
                    <span className='font-bold text-xl'>Location</span>
                    <br></br>
                    <span>{complaint.location}</span>
                </div>
                <div className='p-2 border text-left  border-gray-300'>
                    <span className='font-bold text-xl'>Complaint Description</span>
                    <br></br>
                    <span>{complaint.Reason}</span>
                </div>
                <div className='p-2 border text-left  border-gray-300'>
                    <span className='font-bold text-xl'>Proof</span>
                    <img src={complaint.proof} className="w-32 h-auto" alt="Proof" /> 
                </div>
                <div className='p-2 border text-left  border-gray-300'>
                    <span className='font-bold text-xl'>Date</span>
                    <br></br>
                    <span>{complaint.Date}</span>
                </div>
                <div className='p-2 border text-left  border-gray-300'>
                    <span className='font-bold text-xl'>Status</span>
                    <br></br>
                    <span>{complaint.status}</span>
                </div>
            </div>
        </div>
    );
}


export default ComplaintDescriptionPage;
