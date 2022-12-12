import React from 'react'

const PlainHorizontal = ({title, date}) => {
  return (
    <div className='w-full min-h-fit grid grid-cols-3 items-center justify-center gap-4 p-2 shadow-md rounded-md'>
          {/* title */}
          <h6 className='truncate text-sm font-bold leading-tight text-slate-700'>{title}</h6>
          {/* date */}
          <p className='text-sm text-slate-700'>{date}</p>
          {/* view details */}
          <p className='text-center text-slate-700 text-md   font-bold underline underline-offset-2 cursor-pointer hover:text-slate-400 transition-colors duration-300'> View Details</p>
    </div>
  )
}

const CheckboxHorizontal = ({title, date, id}) => {

  return (
    <div className='flex flex-row justify-center items-center w-full gap-2'>
      <input type="checkbox" name="document" id={id} className='w-5 h-5 cursor-pointer'/>
      <div className='w-full min-h-fit grid grid-cols-3 items-center justify-center gap-4 p-2 shadow-md rounded-md'>
            {/* title */}
            <h6 className='truncate text-sm font-bold leading-tight text-slate-700'>{title}</h6>
            {/* date */}
            <p className='text-sm text-slate-700'>{date}</p>
            {/* view details */}
            <p className='text-center text-slate-700 text-md font-bold underline underline-offset-2 cursor-pointer hover:text-slate-400 transition-colors duration-300'> View Details</p>
      </div>
    </div>

  )
}

function DocumentCardHorizontal({ title, date, id, multipleActions }) {

  return multipleActions ? <CheckboxHorizontal title={title} date={date} id={id} /> : <PlainHorizontal title={title} date={date} />
}

export default DocumentCardHorizontal