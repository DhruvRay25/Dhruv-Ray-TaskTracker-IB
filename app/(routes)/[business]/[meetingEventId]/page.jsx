'use client'
import React, { useEffect, use, useState } from 'react'
import MeetingTimeDateSelection from '../_components/MeetingTimeDateSelection'
import { collection, doc, getDoc, getDocs, getFirestore, query, where } from 'firebase/firestore'
import { app } from '@/config/FirebaseConfig'

function SharedMeetingEvent({ params }) {
  // Unwrap the params Promise
  const unwrappedParams = use(params);
  const db = getFirestore(app)

  const [businessInfo, setBusinessInfo] = useState();
  const [eventInfo, setEventInfo] = useState();
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    if (unwrappedParams) {
      getMeetingBusinessAndEventDetails();
    }
  }, [unwrappedParams])

  const getMeetingBusinessAndEventDetails = async () => {
    setLoading(true); 
    try {
      // Get business information
      const businessQuery = query(
        collection(db, "Business"), 
        where('businessName', '==', unwrappedParams.business)
      );
      
      const businessSnapshot = await getDocs(businessQuery);
      
      if (!businessSnapshot.empty) {
        businessSnapshot.forEach((doc) => {
          setBusinessInfo(doc.data());
          console.log("Business info:", doc.data());
        });
      } else {
        console.log("No business found with that name");
      }

      // Get meeting event information
      const eventDocRef = doc(db, "MeetingEvent", unwrappedParams.meetingEventId);
      const eventSnapshot = await getDoc(eventDocRef);
      
      if (eventSnapshot.exists()) {
        setEventInfo(eventSnapshot.data());
        console.log(eventSnapshot.data())
        setLoading(false); 
        
      } else {
        console.log("No event found with that ID");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div>
      <MeetingTimeDateSelection eventInfo={eventInfo} 
      businessInfo={businessInfo}/>
    </div>
  )
}

export default SharedMeetingEvent