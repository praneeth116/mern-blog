import React from 'react'
import {Button, TextInput, Label, Textarea} from 'flowbite-react'

function Home() {
  return (
    <>
    <div className='px-4 flex bg-blue-50 py-3 
    border-t-8 border-cyan-800 rounded-lg shadow
     hover:bg-blue-200 justify-between mt-2 mb-2 dark:bg-slate-500 '>
      <div className='self-center'><span className='px-2 bg-gradient-to-r from-blue-500 via-green-400  to-gray-100 rounded-lg'>Hello</span>World</div>
      <div className=''>This is Home</div>
      <Button className='bg-red-500 w-12 h-10 hover:bg-red-600 dark:bg-red-500'>Hey</Button>
    </div>
    <div className='shadow bg-cyan-50 py-4 px-2 mb-2 rounded-lg dark:bg-slate-500 flex justify-between max-w-5xl mx-auto'>
      <div className='flex-1 text-center self-center'>Hello World</div>
      <div className='flex-1'>
        <form>
          <Label className=''>Name</Label>
          <TextInput placeholder='your name'></TextInput>
          <Label className=''>Password</Label>
          <TextInput placeholder='your password'></TextInput>
          <Label className=''>Check Password</Label>
          <TextInput placeholder='enter your password again'></TextInput>
        </form>
      </div>
    </div>
      <div class="flex gap-4">
      <div class="flex-1 bg-blue-500 text-white p-4 text-center">Box 1</div>
      <div class="flex-1 bg-red-500 text-white p-4 text-center">Box 2</div>
      <div class="flex-1 bg-green-500 text-white p-4 text-center">Box 3</div>
    </div>
    <div>
      <Textarea className='mt-2 mb-2 max-w-3xl mx-auto' placeholder='comment ...'></Textarea>
    </div>
    </>
  )
}

export default Home