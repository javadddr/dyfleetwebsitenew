import React, { useEffect, useState } from "react";
import {Button} from "@nextui-org/react";


export default function HomeTop() {

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);
  return (
  
   
       <div className={`relative isolate px-6 pt-14 lg:px-8 ${isLoaded ? 'animate-fadeIn' : 'opacity-0'}`}>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 "
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-10">
         
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Manage and monitor every aspect of your fleet.
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
            DynamoFleet is the ideal fleet management software, providing comprehensive solutions to manage both your vehicles and drivers. Enhance cost efficiency, and assume full control over your fleet management.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button
              color="primary"
              variant="flat"
              className="shadow-2xl border border-indigo-600"
              as="a"
              href="https://www.app.dynamofleet.com/register"
              target="_blank" // optional, to open in a new tab
              rel="noopener noreferrer" // optional, for security reasons
            >
              Sign Up here
            </Button>

            
            <a href="https://www.app.dynamofleet.com/demo" className="text-sm font-semibold leading-6 text-gray-900">
              Live Demo <span aria-hidden="true">→</span>
            </a>

            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>
  
  )
}