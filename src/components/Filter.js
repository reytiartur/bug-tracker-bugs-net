import React, { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { AdjustmentsVerticalIcon } from '@heroicons/react/24/outline'


const Filter = () => {
  return (
    <Popover className="self-center flex">
        <Popover.Button><AdjustmentsVerticalIcon className='w-8 m-3 self-center ' /></Popover.Button>

        <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-x-1"
            enterTo="opacity-100 translate-x-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-x-0"
            leaveTo="opacity-0 translate-x-1"
        >      
            <Popover.Panel className="absolute z-10 right-8 -bottom-6 transform">
                <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    
                </div>
            </Popover.Panel>
        </Transition>
    </Popover>
  )
}

export default Filter