import React from 'react'
import Container from '../layouts/Container'
import Flex from '../layouts/Flex'
import AddUser from '../components/AddUser/AddUser'
import { Edit3, Users } from 'lucide-react';

const Profile = () => {
  return (
    <div className='bg-bg w-full font-secondary pt-[24px] h-screen'>
      <Container>
        <Flex className="items-start">
                <div className="w-[804px] mx-auto bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Cover Photo and Profile Section */}
        <div className="relative">
          {/* Cover Photo */}
          <div className="h-48 bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 relative">
            
            {/* Edit Button */}
            <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
              <Edit3 size={16} className="text-gray-600" />
            </button>
          </div>

          {/* Profile Picture */}
          <div className="absolute -bottom-16 left-6">
            <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-gradient-to-br from-purple-500 to-indigo-600">
              <img 
                src="/api/placeholder/128/128" 
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Profile Info Section */}
        <div className="pt-20 pb-6 px-6">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              {/* Name and Verification */}
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-2xl font-semibold text-gray-900">Mehraj H.</h1>

              </div>

              {/* Bio */}
              <p className="text-gray-700 mb-3 leading-[20px]">
                I am a tech enthusiast from the Milky Way Galaxy, within the Orion Arm, orbiting the Sol (Sun) star, living on the third orbital planet named Earth, in the continent of Asia, in the country of Bangladesh.
              </p>

              {/* Location and Contact */}
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <span>Dhaka, Bangladesh</span>
                <span>•</span>
                <button className="text-blue-600 hover:underline">Contact info</button>
              </div>

              {/* Connections */}
              <div className="flex items-center gap-1 text-blue-600 text-sm font-medium mb-6">
                <span>427 connections</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button className="bg-primary hover:bg-primary text-white px-4 py-[6px] rounded-full font-medium transition-colors">
                  Open to
                </button>
                <button className="border border-blue-600 text-primary hover:bg-blue-50 px-4 py-[6px] rounded-full font-medium transition-colors">
                  Add profile section
                </button>
                <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-[6px] rounded-full font-medium transition-colors">
                  Enhance profile
                </button>
                <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-[6px] rounded-full font-medium transition-colors">
                  Resources
                </button>
              </div>
            </div>

            {/* Right Side - Interactive Cares */}
            <div className="ml-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <Users size={16} className="text-gray-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Interactive Cares</span>
              </div>
              
              <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                <Edit3 size={14} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

          <AddUser/>
        </Flex>
      </Container>
    </div>
  )
}

export default Profile



