'use client'
import React, { useEffect, useState } from 'react'
import Header from '../Header'
import BookingsComp from '../BookingsComp'
import { auth } from '../../utils/firebase';
import { db } from '../../utils/firebase';
import { collection, query, getDocs, where } from 'firebase/firestore';


const getBookings = async (email) => {
    const collectionRef = collection(db, 'bookings');
    const q = query(collectionRef, where('userEmail', '==', email));
    const bookingData = await getDocs(q);
    const allBookings = [];
    bookingData.forEach((doc) => {
        allBookings.push({ id: doc.id, ...doc.data() })
    })
    return allBookings;
}
function page() {
    const [UserEmail, setUserEmail] = useState('')
    const [isLoading, setisLoading] = useState(false)
    const [bookingData, setBookingData] = useState([]);
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUserEmail(user.email);
            } else {
                console.log('User is signed out');
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        setisLoading(true)
        const fetchBookingData = async () => {
            const bookings = await getBookings('sujood@gmail.com');
            setBookingData(bookings);
        };

        fetchBookingData();
        setisLoading(false)
    }, [UserEmail]);
    return (
        <>
            <Header />
            <div className=''>
                <div className="text-center my-10 bg-[#fff1e7] py-10">
                    <h1 className="text-4xl text-[#2d2d2d] font-bold">Your Bookings</h1>
                </div>
                {  isLoading?  <div className='h-[60vh] justify-center items-center flex w-full'> <p>Loading Please wait 🙌🙌 </p></div>:
                bookingData.length == 0 ? <div className='h-[60vh] justify-center items-center flex w-full'> <p>Oops You Have No Bookings 😔😔 </p> </div>:
                    <div className='flex flex-wrap mb-10'>
                        {bookingData.map((bookings) => {
                            return (<BookingsComp UserName={bookings.userName} UserEmail={bookings.userEmail} ParkingId={bookings.parkingId} TotalRent={bookings.totalRent} LicenseNo={bookings.licenseNo} ArrivalData={bookings.arrival} DepartureData={bookings.departure} TotalHours={bookings.totalHours} VehicleNo={bookings.vehicleNo} BookingId={bookings.Id} />)
                        })
                        }
                    </div>
                }
            </div>
        </>
    )
}

export default page
