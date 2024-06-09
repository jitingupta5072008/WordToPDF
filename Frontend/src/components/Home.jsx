import React, { useState } from 'react'
import {FaFileWord} from "react-icons/fa6"
import axios from "axios"
const Home = () => {
     const [selectedFile, setSelectedFile] = useState(null)
     const [convert, setConvert] = useState('')
     const [downloadError , setDownloadError] = useState("")
     const handleFileChange = (e) =>{
          setSelectedFile(e.target.files[0])
     }
     const handleSubmit = async(e) =>{
          e.preventDefault();
          if(!selectedFile){
               setConvert('Please Select a File')
               return;
          }
          const formData = new FormData()
          formData.append("file",selectedFile)
          try {
              const response = await axios.post('http://localhost:3000/convertfile',formData,{
                    responseType: 'blob',  
               })
               const url = window.URL.createObjectURL(new Blob([response.data]))
       
               const link = document.createElement("a")

               link.href=url;
       
               link.setAttribute('download',selectedFile.name.replace(/\.[^/.]+$/,"")+".pdf")
      
               document.body.appendChild(link)
      
               link.click();
               link.parentNode.removeChild(link)
               setSelectedFile(null)
               setDownloadError("")
               setConvert('File Converted SuccessFully..')

          } catch (error) {
               if (error.response && error.response.status==400) {    
                    setDownloadError("File occured; ",error.response.data.message)
               }else{
               setConvert("")
               }
          }
     }
  return (
    <>
          <div className='max-w-screen-2xl mt-48 mx-auto container px-6 py-3 md:px-40'>
               <div className='flex h-scree items-center justify-center'>
                    <div className='border-2 border-dashed  px-4 py-4 md:px-8 md:px-6 border-indigo-500 rounded-lg shadow-lg'>
                         <h1 className='text-3xl font-bold text-center mb-4'>Convert Word To PDF Online</h1>
                         <p className='text-sm text-center mb-5'>Easily convert word document to PDF Formate</p>
                    <div className='flex flex-col items-center space-y-4'>
                         <input onChange={handleFileChange} type="file" className='hidden' id='fileinput' accept='.doc,.docx' />
                         <label htmlFor='fileinput' className='w-full flex items-center justify-center px-4 py-6 bg-gray-100 text-gray-700 rounded-lg shadow-lg cursor-pointer border-blue-300 hover:bg-blue-700 duration-300 hover:text-white'>
                              <FaFileWord className='mr-3 text-2xl' />
                              <span className='text-2xl mr-2 ml-2 hover:text-white'>{
                                   selectedFile ? selectedFile.name : 'Choose File'
                                   }</span>
                         </label>
                         <button disabled={!selectedFile} className='disabled:bg-gray-400 disabled:pointer-events-none text-white bg-blue-500 hover:bg-blue-700 duration-300 font-bold px-4 py-2 rounded-lg' onClick={handleSubmit} >Convert</button>

                         {convert && (<div className='text-green-500 text-center'>{convert}</div>)}
                         {downloadError && (<div className='text-red-500 text-center'>{downloadError}</div>)}
                    </div>
                    </div>
               </div>
          </div>
     </>
  )
}

export default Home