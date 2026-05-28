import React, { useState, useEffect } from "react";
import moment from "moment-timezone"; // Use moment-timezone to handle timezone logic
import logo from "../src/assets/logo5.png"
import { Button,Input, Modal } from 'antd';


const Schedul = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [timeZones, setTimeZones] = useState([]);
  const [showTimeSlots, setShowTimeSlots] = useState(false);
  const [email, setEmail] = useState('');
  const [messagei, setMessagei] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [googleMeetLink, setGoogleMeetLink] = useState(false);
  const [beschte, setBeschte] = useState(false);
  
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const today = new Date();

  // Available slots in UTC
  const availableSlots = {
    "2024-11-20": ["10:00 AM", "12:00 PM", "5:00 PM"],
    "2024-11-21": ["10:00 AM", "1:00 PM", "6:00 PM"],
    "2024-11-22": ["9:00 AM", "2:00 PM", "7:00 PM"],
    "2024-11-27": ["9:00 AM", "3:00 PM", "8:00 PM"],
  };

  // Function to get all time zones and their current time
  useEffect(() => {
    // Using moment-timezone to get all time zones
    const timezones = moment.tz.names();
    setTimeZones(timezones);
  }, []);

  // Convert time slots to selected timezone
  const convertToTimezone = (date, time) => {
    const [hours, minutes] = time.split(/[: ]/).map(Number);
    const isPM = time.includes("PM") && hours !== 12 ? 12 : 0;
    const dateObj = new Date(date);
    dateObj.setUTCHours(hours + isPM, minutes);

    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    
    });

    return formatter.format(dateObj);
  };

  const getTimeSlotsForDate = (formattedDate) =>
    availableSlots[formattedDate]?.map((time) => convertToTimezone(formattedDate, time)) || [];

  const generateCalendarDays = (year, month) => {
    const startOfMonth = new Date(year, month, 1);
    const endOfMonth = new Date(year, month + 1, 0);
    const startDay = startOfMonth.getDay(); // Day of the week (0-6)
    const totalDays = endOfMonth.getDate();
    
    const days = [];
    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(year, month, i);
      const formattedDate = date.toLocaleDateString("en-CA"); // Use local date format (YYYY-MM-DD)
      days.push({
        date,
        isAvailable: !!availableSlots[formattedDate], // Match with `availableSlots`
      });
    }
    
    // Add padding days before the 1st of the month
    for (let i = 0; i < startDay; i++) {
      days.unshift(null);
    }
    
    return days;
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const calendarDays = generateCalendarDays(year, month);

  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString("en-CA") // This will return a string like "2024-11-20"
    : null;
console.log(formattedDate)
  // Get current time for each timezone
  const getCurrentTimeInTimezone = (timezone) => {
    const currentTime = moment.tz(timezone).format("HH:mm");
    return currentTime;
  };
  useEffect(() => {
    if (formattedDate) {
      setShowTimeSlots(true); // Show time slots when formattedDate is available
    }
  }, [formattedDate]);



  const handleScheduleMeeting = async () => {
    const formattedStartTime = `${formattedDate}T${moment(selectedTime, ["h:mm A"]).format("HH:mm:ss")}`;
    const formattedEndTime = moment(formattedStartTime)
      .add(1, "hours") // Assuming a 1-hour meeting duration
      .format("YYYY-MM-DDTHH:mm:ss");
  
    const eventDetails = {
     
      summary: "Demo",
      description: `Email: ${email}\nMessage: ${messagei}`, // Dynamically include email and message
      location: "Online",
      startTime: formattedStartTime,
      endTime: formattedEndTime,
      timezone,
      conferenceData: {
        createRequest: {
          requestId: `random-unique-id-${new Date().getTime()}`,
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
    };
  
    try {
      const response = await fetch("http://localhost:5000/api/google/calendar/create-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventDetails),
      });
  
      const result = await response.json();
      console.log(response);
      if (response.ok) {
        setMessagei(
          `Meeting scheduled successfully! Join the Google Meet: ${result.hangoutLink}`
        );
        console.log("Google Meet Link:", result.hangoutLink);
        setGoogleMeetLink(result.hangoutLink)
        setBeschte(true)
      } else {
        setMessagei(`Error: ${result.message}`);
      }
    } catch (error) {
      setMessagei(`Failed to schedule meeting: ${error.message}`);
    }
  };
  



  const [responseMessage, setResponseMessage] = useState('');
  const handleConfirm = async () => {
    // Schedule meeting
    await handleScheduleMeeting();
    setIsModalOpen(false)
    const subject="Thank you for scheduling a meeting with us"
  const message=`We appreciate you scheduling a meeting with us. We're excited to connect with you and ensure a productive discussion. You can use the link below to join the meeting ${googleMeetLink}`
    try {

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/email/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, subject, message }),
      });

      const data = await response.json();
      setResponseMessage(data.message);
      handleConfirm2()
    } catch (error) {
      setResponseMessage('Failed to send email.');
    }

  };
  const handleConfirm2 = async () => {
  

 
    const subject="New meeting diger"
  const message=`one customer send email`
  const email="dynamochartug@gmail.com"
    try {

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/email/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, subject, message }),
      });

      const data = await response.json();

    } catch (error) {
    
    }
  };
  
  

  return (
    <div className="min-h-screen bg-gray-100 w-full flex items-center justify-center p-4">
   

      {/* Right Section */}
      <div className={`${formattedDate?"w-[1200px]":"w-[900px]"} h-[700px] bg-white rounded-lg shadow-lg p-6 flex `}>
       
      <div className="w-[1300px] bg-white flex flex-col  items-start rounded-lg  p-2">
        <img src={logo} alt="Logo" className="w-20 h-20 mb-4" />
        <h1 className="text-xl font-semibold text-gray-800 text-center mb-2">Schedule a Demo Or Meeting</h1>
        <p className="text-sm text-gray-600 text-center mb-6">
          Select a date and time for your meeting.
        </p>
        {/* <ul className="text-gray-700 space-y-2">
          <li><strong>Title:</strong> Product Demo</li>
          <li><strong>Duration:</strong> 30 minutes</li>
          <li><strong>Host:</strong>DynamoFleet</li>
        </ul> */}

        <div className="mb-4 mt-60">
              <label htmlFor="timezone" className="block text-sm text-gray-600 mb-2">Select Timezone</label>
              <select
                id="timezone"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
              >
                {timeZones.map((tz, index) => {
                  const currentTime = getCurrentTimeInTimezone(tz);
                  return (
                    <option key={index} value={tz}>
                      {tz} ({currentTime})
                    </option>
                  );
                })}
              </select>
            </div>
      </div>
      
      
        <div className="flex gap-6">
          {/* Calendar */}
          <div>
          <div className="flex flex-col w-[500px] h-[300px] p-6">
            <div className="flex items-center justify-between mb-4">
              <button className="text-gray-500 hover:text-gray-800" onClick={handlePreviousMonth}>
                &larr; Previous
              </button>
              <h2 className="text-lg font-medium text-gray-800">
                {currentMonth.toLocaleString("default", { month: "long" })} {currentMonth.getFullYear()}
              </h2>
              <button className="text-gray-500 hover:text-gray-800" onClick={handleNextMonth}>
                Next &rarr;
              </button>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center mt-10">
              {/* Weekday Headers */}
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
                <div key={index} className="font-medium text-gray-600">{day}</div>
              ))}
              {/* Calendar Days */}
              {calendarDays.map((day, index) => (
                <button
                  key={index}
                  className={`size-10 flex items-center justify-center ${
                    day && day.isAvailable
                      ? selectedDate && day.date.toLocaleDateString("en-CA") === selectedDate.toLocaleDateString("en-CA")
                        ? "bg-blue-500 text-white"
                        : "hover:bg-blue-200 text-gray-700"
                      : "bg-white text-gray-300 border-none cursor-not-allowed"
                  } ${!day ? "invisible" : ""} border border-blue-900 rounded-full text-xl m-2 focus:outline-none`}
                  onClick={() => day && day.isAvailable && setSelectedDate(day.date)}
                  disabled={!day || !day.isAvailable}
                >
                  {day ? day.date.getDate() : ""}
                </button>
              ))}
            </div>
          </div>
        
          </div>
       
        </div>
   {/* Time Slots */}
   {formattedDate && (
  <div
    className={`w-full pl-10 transition-transform duration-500 ease-out transform ${
      showTimeSlots ? 'translate-x-0' : 'translate-x-[-60px]'
    }`}
  >
    {/* Title */}
    <h2 className="text-lg font-medium text-gray-800 mb-4">Select a Time</h2>

    {/* Content */}
    {availableSlots[formattedDate] ? (
      <div className="flex flex-col gap-2">
        {getTimeSlotsForDate(formattedDate).map((time, index) => (
          <button
            key={index}
            className={`px-4 py-2 border border-gray-300 rounded-lg text-sm ${
              selectedTime === time
                ? 'bg-blue-500 text-white'
                : 'text-gray-700 hover:bg-blue-500 hover:text-white'
            } transition duration-200`}
            onClick={() => {
              setSelectedTime(time);
              showModal();
            }}
          >
            {time}
          </button>
          
        ))}
       
      </div>
    ) : (
      <p className="text-sm text-gray-500">
        {formattedDate
          ? 'No time slots available for this date.'
          : 'Please select a date first.'}
      </p>
    )}
  </div>
)}


 
      </div>
 

   
      <Modal
  style={{ top: '30%' }}
  title="Confirm Your Appointment"
  open={isModalOpen}
  onCancel={handleCancel}
  footer={[
    <Button key="back" onClick={handleCancel}>Cancel</Button>,
    <Button key="submit" type="primary" onClick={handleConfirm}>Confirm</Button>,
  ]}
>
  {selectedDate && selectedTime && (
    <div className="mt-6 ">
      <p className="text-sm text-gray-900 font-bold">
        Meeting Time: <br /> {formattedDate} at {selectedTime} ({timezone}).
      </p>

      {/* Email input field */}
      <div className="mt-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-3">
          Email
        </label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </div>

      {/* Message textarea */}
      <div className="mt-4">
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-3">
          Message
        </label>
        <Input.TextArea
          id="message"
          value={messagei}
          onChange={(e) => setMessagei(e.target.value)}
          placeholder="Enter your message"
          rows={4}
        />
      </div>
    </div>
  )}
</Modal>

  
    </div>
  );
};

export default Schedul;
