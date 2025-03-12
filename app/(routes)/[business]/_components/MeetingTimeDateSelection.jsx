import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { format } from 'date-fns'
import { CalendarCheck, Clock, Link2, MapPin, Timer } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import TimeDateSelection from './TimeDateSelection'
import UserFormInfo from './UserFormInfo'
import { collection, doc, getDocs, getFirestore, query, setDoc, where } from 'firebase/firestore'
import { toast } from 'sonner'
import { app } from '@/config/FirebaseConfig'
import Plunk from '@plunk/node'
import { render } from "@react-email/components";
import Email from '@/emails'
import { renderToString } from 'react-dom/server';
import { useRouter } from 'next/navigation';

function MeetingTimeDateSelection({eventInfo, businessInfo}) {
  const [date, setDate]=useState(new Date);
  const [timeSlots, setTimeSlots]=useState(); 
  const [enableTimeSlot, setEnabledTimeSlot]=useState(false);
  const [selectedTime, setSelectedTime]=useState();
  const [userName, setUserName]=useState();
  const [userEmail, setUserEmail]=useState(); 
  const [userNote, setUserNote]=useState(); 
  const db = getFirestore(app);
  const [prevBooking, setPrevBooking]=useState([]); 
  const plunk = new Plunk(process.env.NEXT_PUBLIC_PLUNK_API_KEY);
  console.log("PLUNK API KEY:", process.env.NEXT_PUBLIC_PLUNK_API_KEY);
  const router = useRouter();

  const [step, setStep]=useState(1); 



  useEffect(()=>{
    eventInfo?.duration&&createTimeSlot(eventInfo?.duration)


  }, [eventInfo])
  const {user}=useKindeBrowserClient();


  const createTimeSlot = (interval) => {
    const startTime = 8 * 60; // 8 AM in minutes
    const endTime = 22 * 60; // 10 PM in minutes
    const totalSlots = (endTime - startTime) / interval;
    const slots = Array.from({ length: totalSlots }, (_, i) => {
        const totalMinutes = startTime + i * interval;
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        const formattedHours = hours > 12 ? hours - 12 : hours; // Convert to 12-hour format
        const period = hours >= 12 ? 'PM' : 'AM';
        return `${String(formattedHours).padStart(2,'0')}:${String(minutes).padStart(2, '0')} ${period}`; 

    }); 


    

    console.log(slots)
    setTimeSlots(slots)
  }

    const handleDateChange = (date) => {
      setDate(date);
      const day = format(date, 'EEEE');
      if (businessInfo.daysAvailable?.[day]) {
        getPrevEventBooking(date)
        setEnabledTimeSlot(true)
      }

      else {
        
        setEnabledTimeSlot(false)
      }

    }


    const handleScheduleEvent=async()=>{

      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if(regex.test(userEmail)==false)
      {
          toast('Enter valid email address')
          return ;
      }
  const docId=Date.now().toString();
      //setLoading(true)
  await setDoc(doc(db,'ScheduledMeetings',docId),{
      businessName:businessInfo.businessName,
      businessEmail:businessInfo.email,
      selectedTime:selectedTime,
      selectedDate:date,
      formatedDate:format(date,'PPP'),
      formatedTimeStamp:format(date,'t'),
      duration:eventInfo.duration,
      locationUrl:eventInfo.locationUrl,
      eventId:eventInfo.id,
      id:docId,
      userName:userName,
      userEmail:userEmail,
      userNote:userNote || '', 
  }).then(resp=>{
      toast('Meeting Scheduled successfully!');
      console.log("User Email:", userEmail);
      sendEmail(userName);
      
  })
}

const sendEmail=(user)=>{
  const emailHtml = renderToString(
    <Email
      businessName={businessInfo?.businessName || "Default Business"}
      date={format(date, 'PPP').toString() || "Default Date"}
      duration={eventInfo?.duration || "Default Duration"}
      meetingTime={selectedTime || "Default Time"}
      meetingUrl={eventInfo?.locationUrl || "Default URL"}
      userFirstName={user || "Guest"}
    />
  );
  
  console.log("Generated Email HTML:", emailHtml); // Add this log
  
  
    plunk.emails.send({
      to: userEmail,
      subject: "New Meeting Scheduled Details",
      body: emailHtml,
}).then(resp=>{
  console.log(resp); 
  console.log("Email Sent Successfully:", resp); // Add this log
  router.replace('/confirmation')
})
.catch(err => {
  console.error("Email Sending Error:", err); // Add error handling
  toast('Failed to send email. Please try again.');
});

}


const getPrevEventBooking=async(date_)=>{
  const q=query(collection(db,'ScheduledMeetings'),
  where('selectedDate','==',date_),
  where('eventId','==',eventInfo.id));

  const querySnapshot=await getDocs(q);

  querySnapshot.forEach((doc)=>{
    console.log("--",doc.data());
    setPrevBooking(prev=>[...prev,doc.data()])
  })
}


  return (
    <div className='p-5 py-10 shadow-lg m-5 border-t-8
    
    '
    style={{borderTopColor:eventInfo?.themeColor}}> 
      <Image src={'/mcdonald-s-15-logo-svgrepo-com.svg'} alt="logo"
        height={150} width={150}
      />

      <div className='grid grid-cols-1 md:grid-cols-3 mt-5'>
        {/*Meeting Info*/}
        <div className='p-4 border-r'>
            <h2>{user?.given_name + " " +  user?.family_name || "Guest"}</h2>
            <h2
            className='font-bold text-2xl'
            >{eventInfo?.eventName?eventInfo?.eventName:'Meeting Name'}</h2>
            <div className='mt-5 flex-col gap-4'>
              <h2 className='flex gap-2 mt-3'><Clock/>{eventInfo?.duration} Min</h2>
              <h2 className='flex gap-2 mt-3'><MapPin/>{eventInfo?.locationType} Meeting</h2>
              
              <h2 className='flex gap-2 mt-3'><CalendarCheck/>{format(date, 'PPP')}</h2>
              <h2 className='flex gap-2 mt-3'><Timer/>{selectedTime} </h2>

              {eventInfo?.locationUrl && (
                <Link href={eventInfo.locationUrl} className='flex gap-2 mt-3'><Link2/>{eventInfo.locationUrl}</Link>
              )}
            </div>
        </div>
        {/*Time and Date Selection Info*/}
        {step==1?
        <TimeDateSelection
          date={date}
          enableTimeSlot={enableTimeSlot}
          handleDateChange={handleDateChange}
          setSelectedTime={setSelectedTime}
          timeSlots={timeSlots}
          selectedTime={selectedTime}
          prevBooking={prevBooking}
        />:
        <UserFormInfo
          setUserName={setUserName}
          setUserEmail={setUserEmail}
          setUserNote={setUserNote}
        />}

      </div>

      <div className='flex gap-3 justify-end'>
          {step==2&&<Button variant="outline"
          onClick={()=>setStep(1)}>Back</Button>}
          {step==1? <Button className="mt-10 float-right"
            disabled={!selectedTime||!date}
            onClick={()=>setStep(step+1)}
            >Next</Button>:

            <Button disabled={!userEmail||!userName}
            onClick={handleScheduleEvent}


            >Schedule</Button>

          }


        
      </div>

      

    </div>
  )
}


export default MeetingTimeDateSelection
